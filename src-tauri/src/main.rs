use reqwest::blocking::get;
use reqwest::Url;
use serde::de::value;
use std::fs;
use std::fs::File;
use std::io::copy;
use std::io::Write;
use tauri::api::shell::open;
use tauri::Manager;
use tauri::Window;
use tauri::{command, AppHandle};
use tauri::{WindowBuilder, WindowUrl};

// 定义全局常量，使用 `static` 关键字
struct HackUrlLogin;
struct APPHACK;

impl APPHACK {
    fn get_js_code() -> &'static str {
        r#"
    console.log('get_js_code');
    window.open = function (url, name, specs) {
    console.log(url);
    let urls = url;
    if(url.startsWith('/')) {
            urls = window.location.origin + url;
    }
    window.__TAURI_INVOKE__('inject_js_with_delay', { value: 'HACK_URL_APP', id: 'install' })
            .then(() => console.log('Rust function called successfully!'))
            .catch((error) => console.error('Failed to call Rust function:', error));
    window.location.replace(urls);
    return null; // window.open usually returns a reference to the window, but Tauri doesn't support this.
};

        "#
    }
}

impl HackUrlLogin {
    fn get_js_code() -> &'static str {
        r#"
    window.addEventListener('load', function () {
        console.log('Page loaded');
    });
    setTimeout(() => {
        console.log(window.location.pathname);
        if (window.location.pathname !== '/profile/personal') {
            window.__TAURI_INVOKE__('inject_js_with_delay', { value: 'HACK_URL_LOGIN', id: 'login' })
                .then(() => console.log('Rust function called successfully!'))
                .catch((error) => console.error('Failed to call Rust function:', error));
        }
    }, 100);

    if (window.location.pathname === '/profile/personal') {
        setTimeout(() => {
            alert('User is on the login page');
            const url = document.querySelectorAll('.c-avatar-img')[0].getAttribute('src');
            const urlObj = new URL(url);
            // 设置新的查询参数
            urlObj.search = 'x-oss-process=image/format,png/resize,h_100';

            window.__TAURI_INVOKE__('save_image', { url: urlObj.toString() })
                .then(() => {
                    console.log('Image saved successfully!');
                    window.__TAURI_INVOKE__('post_message', {
                        title: 'ccw',
                        id: 'main',
                        content: 'reload'
                    });
                })
                .catch((error) => console.error('Failed to call Rust function:', error));
        }, 1000);
    }

    console.log('Hello from Tauri!');
        "#
    }
}

#[command]
fn save_string_to_file(app_handle: AppHandle, data: String) -> Result<(), String> {
    // 获取应用程序的数据目录
    if let Some(app_dir) = app_handle.path_resolver().app_data_dir() {
        // 确保目录存在
        if !app_dir.exists() {
            fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;
        }

        // 构建保存文件的路径
        let file_path = app_dir.join("save.json");

        // 创建并打开文件
        let mut file = fs::File::create(file_path).map_err(|e| e.to_string())?;

        // 将字符串写入文件
        file.write_all(data.as_bytes()).map_err(|e| e.to_string())?;

        Ok(())
    } else {
        Err("Could not determine the application data directory.".into())
    }
}

#[tauri::command]
fn open_in_browser(app: AppHandle, url: String) -> Result<(), String> {
    let shell_scope = app.shell_scope(); // 获取 ShellScope 的引用
    tauri::api::shell::open(&shell_scope, url, None).map_err(|err| err.to_string())
}

#[command]
fn read_string_from_file(app_handle: AppHandle) -> Result<String, String> {
    // 获取应用程序的数据目录
    if let Some(app_dir) = app_handle.path_resolver().app_data_dir() {
        // 构建保存文件的路径
        let file_path = app_dir.join("save.json");

        // 读取文件内容
        match fs::read_to_string(file_path) {
            Ok(content) => Ok(content),
            Err(err) => Err(err.to_string()),
        }
    } else {
        Err("Could not determine the application data directory.".into())
    }
}

#[command]
fn save_image(app: AppHandle, url: String) -> Result<(), String> {
    // 获取 appDataDir 路径
    let app_data_dir = app
        .path_resolver()
        .app_data_dir()
        .ok_or("Failed to get app data dir")?;

    // 确保目录存在
    std::fs::create_dir_all(&app_data_dir).map_err(|err| err.to_string())?;

    // 设置保存的文件路径
    let file_path = app_data_dir.join("headImg.png");

    // 下载图片
    let response = get(&url).map_err(|err| err.to_string())?;

    // 打开文件并写入数据
    let mut file = File::create(file_path).map_err(|err| err.to_string())?;
    copy(
        &mut response.bytes().map_err(|err| err.to_string())?.as_ref(),
        &mut file,
    )
    .map_err(|err| err.to_string())?;

    Ok(())
}

#[command]
fn delete_image(app: AppHandle) -> Result<(), String> {
    // 获取 appDataDir 路径
    let app_data_dir = app
        .path_resolver()
        .app_data_dir()
        .ok_or("Failed to get app data dir")?;

    // 设置保存的文件路径
    let file_path = app_data_dir.join("headImg.png");

    // 检查文件是否存在
    if !file_path.exists() {
        return Err("Image file does not exist".into());
    }

    // 删除文件
    fs::remove_file(file_path).map_err(|err| err.to_string())?;

    Ok(())
}

#[tauri::command]
fn close_window(app: tauri::AppHandle, id: String) {
    if let Some(window) = app.get_window(&id) {
        window.close().unwrap();
    }
}

#[tauri::command]
fn create_and_inject_js(
    app: AppHandle,
    label: String,
    url: String,
    path: String,
    name: String,
) -> Result<(), String> {
    // 创建新窗口
    let parsed_url = Url::parse(&url).map_err(|e| e.to_string())?;
    let new_window = WindowBuilder::new(
        &app,
        label.clone(), // 使用前端传递的标签
        WindowUrl::External(parsed_url),
    )
    .title(&name) // 使用标签作为窗口标题
    .maximized(true)
    .build()
    .map_err(|e| e.to_string())?;

    //dev
    let js_file_path = "../src/page/app/hack.js";
    let js_code = fs::read_to_string(js_file_path).expect("Failed to read JavaScript file");
    let js_file_paths = path;
    let js_codes = fs::read_to_string(js_file_paths).expect("Failed to read JavaScript file");
    new_window.eval(&js_codes).map_err(|e| e.to_string())?;
    //prod
    // let js_code: &str = APPHACK::get_js_code();
    // 注入 JavaScript
    // new_window.eval(&path).map_err(|e| e.to_string())?;
    new_window.eval(&js_code).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn inject_js_with_delay(window: Window, value: String, id: String) {
    tauri::async_runtime::spawn(async move {
        inject_js(window, value, id, 5).await;
    });
}

async fn inject_js(window: Window, value: String, id: String, s: u64) {
    // 等待 5 秒
    tokio::time::sleep(std::time::Duration::from_secs(s)).await;
    let ccw_window = window.get_window(&id);
    if let Some(ccw_window) = ccw_window {
        //prod
        // let js_code = match value.as_str() {
        //     "HACK_URL_LOGIN" => HackUrlLogin::get_js_code(),
        //     "HACK_URL_APP" => APPHACK::get_js_code(),
        //     _ => &value, // 如果 `value` 不匹配任何结构体，返回空字符串
        // };

        //dev
        let js_file_path = value;
        let js_code = fs::read_to_string(js_file_path).expect("Failed to read JavaScript file");

        let result = ccw_window.eval(&js_code);
        if let Err(e) = result {
            eprintln!("Failed to inject JavaScript: {:?}", e);
        }
    }
}

#[tauri::command]
fn post_message(window: Window, id: String, title: String, content: String) {
    // 获取目标窗口，若未找到则触发 panic 并显示错误信息
    let ccw_window = window
        .get_window(&id)
        .expect("Failed to find window with the given id");

    // 发送消息到目标窗口
    ccw_window.emit(&title, content).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            save_image,
            delete_image,
            save_string_to_file,
            read_string_from_file,
            create_and_inject_js,
            inject_js_with_delay,
            post_message,
            open_in_browser,
            close_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

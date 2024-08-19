use std::fs;
use std::io::Write;
use tauri::Manager;
use tauri::{command, AppHandle};

#[command]
fn save_string_to_file(app_handle: AppHandle, data: String) -> Result<(), String> {
    // 获取应用程序的数据目录
    if let Some(app_dir) = app_handle.path_resolver().app_data_dir() {
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            save_string_to_file,
            read_string_from_file
        ])
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            // 读取本地 JavaScript 文件
            let js_file_path = "../src/mainScript.js";
            let js_code = fs::read_to_string(js_file_path).expect("Failed to read JavaScript file");

            // 注入 JavaScript 代码
            window.eval(&js_code).unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use std::fs;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            // 读取本地 JavaScript 文件
            let js_file_path = "../src/main.js";
            let js_code = fs::read_to_string(js_file_path).expect("Failed to read JavaScript file");

            // 注入 JavaScript 代码
            window.eval(&js_code).unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

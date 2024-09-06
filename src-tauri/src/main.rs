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
struct HackUrlLogout;
struct HackUrlLogoutAfter;
struct HackUrlUserHome;
struct HackUrlInstall;
struct HackUrlUpdate;
struct HackUrlGame;

impl HackUrlGame {
    fn get_js_code() -> &'static str {
        r#"
let fill = 0;
let resolution = 0;
let w = 0, h = 0;
let wv = 0, hv = 0;
let div, divs, divv, divvs, news, background, Operatinginstructions, bug, discord;
let start = 0;
let cvs;
let hrefs;

let interval, tickTime = 1000;
function tick() {
    console.log("tick");
    let s = document.getElementById("WitCatBBcode启动器数据交互");
    if (s !== null && s !== undefined && s.innerText.split("ↀ").length == 3) {
        console.log(s.innerText);
        let v = s.innerText.split("ↀ");
        if (v[2] == 'return') {
            eval(`aardio.${v[0]}(${v[1]})`).then((e) => {
                s.firstChild.innerText = e;
            })
        }
        else if (v[2] == 'do') {
            eval(`aardio.${v[0]}(${v[1]})`)
            s.remove();
        }
        else {
            tickTime = v[2] > 1500 ? 1500 : (v[2] < 10 ? 10 : v[2]);
            clearInterval(interval);
            interval = setInterval(tick(), tickTime);
        }
    }
}

function fillin() {
    fill = 1;
    var mo = function (e) { e.preventDefault(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove", mo, false);//禁止页面滑动
    if (window.location.href.split("/")[2] !== "cocrea.world") {
        div = document.getElementById("root").getElementsByTagName('div')[0];
        divs = document.getElementById("root");
        hrefs = window.location.href.split("/")[3].split("?")[0];
        if (hrefs !== "scratch-player") {
            divs.removeChild(div);
        }
    }

    news = document.body.getElementsByClassName("convention-1wIbd")[0];
    if (typeof (news) !== "undefined") {
        news.style = "display:none;";
    }
    divv = document.body.getElementsByClassName("actions-2lk9z")[0];
    if (typeof (divv) !== "undefined") {
        divv.style = "display:none;";
    }
    Operatinginstructions = document.body.getElementsByClassName("showWorksDesc-1iD-M")[0];
    if (typeof (Operatinginstructions) !== "undefined") {
        Operatinginstructions.style = "display:none;";
    }
    bug = document.body.getElementsByClassName("bug-report-1CfBK")[0];
    if (typeof (bug) !== "undefined") {
        bug.style = "display:none;";
    }
    discord = document.body.getElementsByClassName("style_bugReport__gJk19 MuiBox-root css-0")[0];
    if (typeof (discord) !== "undefined") {
        discord.style = "display:none";
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    scrollTo(0, 0);

    setTimeout(fills(), 50);
}
function fills() {
    if (w !== 0 && h !== 0) {
        cvs.width = w;
        cvs.height = h;
    }
    let ws = 0, hs = 0;
    if ((cvs.width / cvs.height) >= (document.documentElement.clientWidth / document.documentElement.clientHeight)) {
        hs = (document.documentElement.clientWidth / cvs.width) * cvs.height;
        ws = document.documentElement.clientWidth;
        wv = 0;
        hv = (document.documentElement.clientHeight - hs) / 2;
    }
    else {
        hs = document.documentElement.clientHeight;
        ws = (document.documentElement.clientHeight / cvs.height) * cvs.width;
        wv = (document.documentElement.clientWidth - ws) / 2;
        hv = 0;
    }
    divvs = document.body.getElementsByClassName("arrowTop-2Fru_")[0];
    if (typeof (divvs) !== "undefined") {
        divvs.style = "display:none;";
    }
    cvs.parentNode.parentNode.parentNode.parentNode.style = "position:fixed; left:" + wv + "px; top:" + hv + "px; width:" + ws + "px; height:" + hs + "px;border-radius:0px";
    cvs.parentNode.parentNode.parentNode.style = "width:" + ws + "px; height:" + hs + "px;border-radius:0px";
    cvs.parentNode.parentNode.style = "width:100%; height:100%;border-radius:0px";
    cvs.parentNode.style = "width:100%; height:100%;border-radius:0px";
    if (isInPage(cvs.parentNode.parentNode.nextElementSibling.firstChild.firstChild)) {
        cvs.parentNode.parentNode.nextElementSibling.style = "width: 100%; height: 100%;";
        cvs.parentNode.parentNode.nextElementSibling.firstChild.style = "width: 100%; height: 100%;";
        cvs.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild.style = "width: 100%; height: 100%;";
        cvs.parentNode.parentNode.nextElementSibling.firstChild.firstChild.style = "width: 100%;";
    }
    cvs.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("div")[0].style = "width:100%; height:100%;"
    cvs.style = "width:100%; height:100%;";
    let b = document.documentElement.clientHeight / cvs.parentNode.parentNode.parentNode.parentNode.parentNode.clientHeight;
    let a = document.documentElement.clientWidth / cvs.parentNode.parentNode.parentNode.parentNode.parentNode.clientWidth;
    if (a > b) {
        a = b;
    }
    cvs.parentNode.parentNode.getElementsByTagName("div")[1].style = "transform:scale(" + a + ");transform-origin:0% 0% 0";
    background = document.getElementsByClassName("witcatbackground")[0];
    if (!background) {
        background = document.createElement("div");
        background.style = "width:" + document.documentElement.clientWidth + "px;height:" + document.documentElement.clientHeight + "px;color:black;";
        background.className = "witcatbackground";
        document.body.insertBefore(background, document.body.children[0]);
    }
    else {
        background.style = "width:" + document.documentElement.clientWidth + "px;height:" + document.documentElement.clientHeight + "px;color:black;";
    }
}
//检测div存在
function isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
}
let a = setInterval(() => {
    let s = document.getElementsByClassName("main-module_fullscreen-button_9f565")
    if (s.length !== 0) {
        s[0].click();
        clearInterval(a);
        interval = setInterval(tick(), tickTime);
    }
}, 100);
let b = setInterval(() => {
    let s = document.getElementsByClassName("main-module_menu_e828e")
    if (s.length !== 0) {
        cvs = document.getElementsByTagName("canvas")[0];
        fillin();
        const config = { attributes: true, childList: true, subtree: true, attributeFilter: ['style'] };
        const callback = function (mutationsList, observer) {
            if (fill == 1) {
                observer.disconnect();
                fills();
                observer.observe(cvs, config);
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(cvs, config);

        clearInterval(b);
    }
}, 100)
window.addEventListener('resize', () => {
    if (fill == 1) {
        fills();
    }
})
        "#
    }
}

impl HackUrlUpdate {
    fn get_js_code() -> &'static str {
        r#"
//TODO: hack网页显示导入按钮
if (window.location.pathname.includes('detail')) {

    // TODO: 编写导入作品的代码
    /**
* 读取储存的json文本并返回
*/
    const loadData = async () => {
        let data = '{}';
        data = await window.__TAURI_INVOKE__('read_string_from_file');
        console.log(data);
        if (!data)
            data = '{}';
        return data;
    }

    /**
     * 将json字符串储存到本地
     * @param {string} data 需要复写的json字符串
     */
    const saveData = async (data) => {
        try {
            await window.__TAURI_INVOKE__('save_string_to_file', { data })
                .then(() => {
                    window.__TAURI_INVOKE__('post_message', {
                        title: 'ProjectList',
                        id: 'main',
                        content: 'reload'
                    })
                        .then(() => {
                            window.__TAURI_INVOKE__('close_window', {
                                id: 'update'
                            });
                        });
                });
        } catch (error) {
            console.error("Failed to save string:", error);
        }
    }

    const getValue = (key) => {
        return new Promise((resolve) => {
            loadData().then((e) => {
                saveContent = JSON.parse(e)
                resolve(saveContent[key] || []);
            });
        });
    };

    const setValue = (key, value) => {
        loadData().then((e) => {
            saveContent = JSON.parse(e)
            saveContent[key] = value;
            saveData(JSON.stringify(saveContent));
        });
    };

    const install = (callback) => {
        if (document.getElementsByClassName('infoAvatars-3BoZM')) {
            callback();
            setTimeout(() => {
                getValue('ProjectList').then((e) => {
                    let url = window.location.href.split('?')[0].split('#')[0];
                    let json = e;
                    let tags = [];
                    document.querySelectorAll('.tag-JR_s0.btn-iEdNA.btn-small-312qh.btn-default-2IxTg.ghost-2DGBD').forEach(element => {
                        console.log(element, element.innerText);
                        tags.push(element.innerText);
                    });

                    const PorjectUrl = url.split("detail").join("player");
                    const html = document.getElementsByClassName("plusHeader-2Hshi");
                    html[html.length - 1].remove();
                    json = json.map(obj => {
                        if (obj.url === PorjectUrl) {
                            return {
                                "name": document.getElementsByClassName("title-1M2qA")[0].innerText,
                                "url": PorjectUrl,
                                "cover": document.getElementsByClassName("runWorksWrapper-3T6tc")[0].style.backgroundImage.split('"')[1].split('?')[0],
                                "tags": tags,
                                "description": document.getElementsByClassName("content-1f5De")[0].innerHTML,
                                "authorImg": document.querySelectorAll(".c-avatar-wrapper.c-avatar-wrapper-S")[0].getElementsByClassName("c-avatar-img")[0].src.split('?')[0],
                            };
                        }
                        return obj;
                    })
                    console.log(json);
                    setValue("ProjectList", json);
                    getValue('tags').then((e) => {
                        let allTags = e;
                        tags.forEach((tag) => {
                            if (!allTags.includes(tag)) {
                                allTags = [...allTags, tag];
                            }
                        })
                        setValue('tags', allTags);
                        alert('更新成功');
                    });
                })
            }, 3000);
        }
    }
    const interval = setInterval(() => {
        install(() => clearInterval(interval));
    }, 100);
}
        "#
    }
}

impl HackUrlInstall {
    fn get_js_code() -> &'static str {
        r#"
setTimeout(() => {
    console.log(window.location.href);
    window.__TAURI_INVOKE__('inject_js_with_delay', { value: 'HACK_URL_INSTALL', id: 'install' })
        .then(() => console.log('Rust function called successfully!'))
        .catch((error) => console.error('Failed to call Rust function:', error));
}, 100);

if (window.location.pathname.includes('detail')) {
    if (!document.querySelector('#witcat-import-btn')) {
        let btn = document.createElement('div');
        btn.innerHTML = `<div class="bilibili-1cpMc"><img style='width:2.875rem;height:2.875rem;' src='data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUyMy43MzUgMzE5LjI5M2gtMjA0LjhjLTE2Ljg5NiAwLTMwLjcyLTEzLjgyNC0zMC43Mi0zMC43MnMxMy44MjQtMzAuNzIgMzAuNzItMzAuNzJoMjA0LjhjMTYuODk2IDAgMzAuNzIgMTMuODI0IDMwLjcyIDMwLjcycy0xMy44MjQgMzAuNzItMzAuNzIgMzAuNzJtODEuOTIgMTMzLjEyaC0yODYuNzJjLTE2Ljg5NiAwLTMwLjcyLTEzLjgyNC0zMC43Mi0zMC43MnMxMy44MjQtMzAuNzIgMzAuNzItMzAuNzJoMjg2LjcyYzE2Ljg5NiAwIDMwLjcyIDEzLjgyNCAzMC43MiAzMC43MnMtMTMuODI0IDMwLjcyLTMwLjcyIDMwLjcyIiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTMyMy43MzggMTM4LjQyNGg0OTkuNDE1cTYyLjQyMyAwIDYyLjQyMyA2Mi40MjN2NDk5LjQxNWMwIDQxLjYxNi0yMC44MDggNjIuNDM0LTYyLjQyMyA2Mi40MzRIMzIzLjczOGMtNDEuNjE2IDAtNjIuNDIzLTIwLjgwOC02Mi40MjMtNjIuNDM0VjIwMC44NDdxLS4wMTYtNjIuNDIzIDYyLjQyMy02Mi40MjNtMCAwIiBmaWxsPSIjNDBBMEZGIi8+PHBhdGggZD0iTTIwMC44NDcgMjYxLjMwNGg0OTkuNDE1YzQxLjYxNiAwIDYyLjQzNCAyMC44MDggNjIuNDM0IDYyLjQyM3Y0OTkuNDE1YzAgNDEuNjE2LTIwLjgwOCA2Mi40MjMtNjIuNDM0IDYyLjQyM0gyMDAuODQ3cS02Mi40MjMgMC02Mi40MjMtNjIuNDIzVjMyMy43MzhjMC00MS42MjYgMjAuODA4LTYyLjQzNCA2Mi40MjMtNjIuNDM0bTAgMCIgZmlsbD0iIzM4ODlGRiIvPjxwYXRoIGQ9Ik00OTUuNjk4IDcyNi43MDJhMTcuMjg1IDE3LjI4NSAwIDAgMCAxNy4yOTUtMTcuMjk1VjU1NS4yMTNoNTcuMDU4YTIzLjA5MSAyMy4wOTEgMCAwIDAgMTQuMTEtNDEuMzI5bC0xMTIuNDk2LTg2LjUyOGEzNC41OSAzNC41OSAwIDAgMC00Mi4yIDBMMzE2Ljk3IDUxMy44ODRhMjMuMTAxIDIzLjEwMSAwIDAgMCAxNC4xMSA0MS4zMjloNTYuOTk3bC4wNjEgMTU0LjE5NGMwIDkuNTU0IDcuNzQxIDE3LjI5NSAxNy4yOTUgMTcuMjk1em0wIDAiIGZpbGw9IiNGRkYiLz48L3N2Zz4=' alt=''></img><span>导入作品</span></div>`;
        btn.className = 'bilibiliContainer-YUHjF mtop-DprmS';
        btn.id = 'witcat-import-btn';
        btn.onclick = () => {
            // TODO: 编写导入作品的代码
            /**
 * 读取储存的json文本并返回
 */
            const loadData = async () => {
                let data = '{}';
                try {
                    data = await window.__TAURI_INVOKE__('read_string_from_file');
                } catch (e) {
                    data = '{}';
                }
                return data;
            }

            /**
             * 将json字符串储存到本地
             * @param {string} data 需要复写的json字符串
             */
            const saveData = async (data) => {
                try {
                    await window.__TAURI_INVOKE__('save_string_to_file', { data })
                        .then(() => {
                            window.__TAURI_INVOKE__('post_message', {
                                title: 'ProjectList',
                                id: 'main',
                                content: 'reload'
                            })
                                .then(() => {
                                    window.__TAURI_INVOKE__('close_window', {
                                        id: 'install'
                                    });
                                });
                        });
                } catch (error) {
                    console.error("Failed to save string:", error);
                }
            }

            const getValue = (key) => {
                return new Promise((resolve, reject) => {
                    try {
                        loadData().then((e) => {
                            saveContent = JSON.parse(e)
                            resolve(saveContent[key] || []);
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            };

            const setValue = (key, value) => {
                loadData().then((e) => {
                    saveContent = JSON.parse(e)
                    saveContent[key] = value;
                    saveData(JSON.stringify(saveContent));
                });
            };

            const install = (e) => {
                let url = window.location.href.split('?')[0].split('#')[0];
                let json = e;
                let tags = [];
                document.querySelectorAll('.tag-JR_s0.btn-iEdNA.btn-small-312qh.btn-default-2IxTg.ghost-2DGBD').forEach(element => {
                    console.log(element, element.innerText);
                    tags.push(element.innerText);
                });

                const PorjectUrl = url.split("detail").join("player");
                if (!json.some(obj => obj.url === PorjectUrl)) {
                    const html = document.getElementsByClassName("plusHeader-2Hshi");
                    html[html.length - 1].remove();
                    json.push({
                        "name": document.getElementsByClassName("title-1M2qA")[0].innerText,
                        "url": PorjectUrl,
                        "cover": document.getElementsByClassName("runWorksWrapper-3T6tc")[0].style.backgroundImage.split('"')[1].split('?')[0],
                        "tags": tags,
                        "description": document.getElementsByClassName("content-1f5De")[0].innerHTML,
                        "authorImg": document.querySelectorAll(".c-avatar-wrapper.c-avatar-wrapper-S")[0].getElementsByClassName("c-avatar-img")[0].src.split('?')[0],
                    })
                    console.log(json);
                    setValue("ProjectList", json);
                    getValue('tags').then((e) => {
                        let allTags = e;
                        tags.forEach((tag) => {
                            if (!allTags.includes(tag)) {
                                allTags = [...allTags, tag];
                            }
                        })
                        setValue('tags', allTags);
                        alert('导入成功');
                    }).catch(() => {
                        let allTags = tags;
                        setValue('tags', allTags);
                        alert('导入成功');
                    });
                } else {
                    alert('该作品已存在');
                }
            }

            getValue('ProjectList').then((e) => {
                install(e);
            })
                .catch((e) => {
                    console.error("Failed to read string:", e);
                    install([]);
                })

        }
        document.querySelector('.leftOp-14zQZ').parentElement.appendChild(btn);
    }
}

        "#
    }
}

impl HackUrlUserHome {
    fn get_js_code() -> &'static str {
        r#"
console.log('注入');
const interval = setInterval(() => {
    console.log('注入');
    try {
        if (document.getElementsByClassName("c-avatar-img")[0] && document.getElementsByClassName("container-3N3ii")[0].contains(document.getElementsByClassName("c-avatar-img")[0])) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementsByClassName("item-13OiL")[0].click();
            }, 100);
        }
    } catch (e) {
        console.log(e);
    }
}, 100);
        "#
    }
}

impl HackUrlLogoutAfter {
    fn get_js_code() -> &'static str {
        r#"
setTimeout(() => {
    if (window.location.pathname === '/') {
        alert('退出成功');
        window.__TAURI_INVOKE__('delete_image')
            .then(() => {
                console.log('Image deleted successfully!');
                window.__TAURI_INVOKE__('post_message', {
                    title: 'ccw',
                    id: 'main',
                    content: 'reload'
                })
                    .then(() => {
                        window.__TAURI_INVOKE__('close_window', {
                            id: 'logout'
                        });
                    });
            })
            .catch((error) => console.error('Failed to call Rust function:', error));
    } else {
        alert('貌似退出失败了，手动退出一下吧');
        setTimeout(() => {
            window.location.replace('https://www.ccw.site');
        }, 2000);
    }
}, 1000);
        "#
    }
}

impl HackUrlLogout {
    fn get_js_code() -> &'static str {
        r#"
console.log('注入');
const interval = setInterval(() => {
    console.log('注入');
    try {
        if (document.getElementsByClassName("c-avatar-img")[0] && document.getElementsByClassName("container-3N3ii")[0].contains(document.getElementsByClassName("c-avatar-img")[0])) {
            clearInterval(interval);
            window.__TAURI_INVOKE__('inject_js_with_delay', {
                value: 'HACK_URL_LOGOUT_AFTER',
                id: 'logout'
            })
                .then(() => {
                    setTimeout(() => {
                        document.getElementsByClassName("item-13OiL")[8].click();
                    }, 1000);
                });

        }
    } catch (e) {
        console.log(e);
    }
}, 100);
        "#
    }
}
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
        alert('登录成功');
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
                })
                    .then(() => {
                        window.__TAURI_INVOKE__('close_window', {
                            id: 'login'
                        });
                    });
            })
            .catch((error) => console.error('Failed to call Rust function:', error));
    }, 1000);
}

console.log('Hello from Tauri!');
        "#
    }
}

#[tauri::command]
fn save_string_to_file(app_handle: AppHandle, data: String) -> Result<(), String> {
    // 获取应用程序的数据目录
    if let Some(app_dir) = app_handle.path_resolver().app_data_dir() {
        // 确保目录存在
        if !app_dir.exists() {
            fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;
        }

        // 构建保存文件的路径
        let file_path = app_dir.join("save.json");

        // 创建并打开文件，如果文件不存在则创建它
        let mut file = fs::OpenOptions::new()
            .create(true)
            .write(true)
            .truncate(true) // 覆盖文件内容
            .open(file_path)
            .map_err(|e| e.to_string())?;

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
async fn create_and_inject_js(
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
    // let js_file_path = "../src/page/app/hack.js";
    // let js_code = fs::read_to_string(js_file_path).expect("Failed to read JavaScript file");
    // let js_file_paths = path;
    // let js_codes = fs::read_to_string(js_file_paths).expect("Failed to read JavaScript file");
    // new_window.eval(&js_codes).map_err(|e| e.to_string())?;
    //prod
    let js_code: &str = APPHACK::get_js_code();
    // 注入 JavaScript
    let js_codes: &str = match path.as_str() {
        "HACK_URL_LOGIN" => HackUrlLogin::get_js_code(),
        "HACK_URL_APP" => APPHACK::get_js_code(),
        "HACK_URL_LOGOUT" => HackUrlLogout::get_js_code(),
        "HACK_URL_LOGOUT_AFTER" => HackUrlLogoutAfter::get_js_code(),
        "HACK_URL_USER_HOME" => HackUrlUserHome::get_js_code(),
        "HACK_URL_INSTALL" => HackUrlInstall::get_js_code(),
        "HACK_URL_UPDATE" => HackUrlUpdate::get_js_code(),
        "HACK_URL_GAME" => HackUrlGame::get_js_code(),
        _ => &path, // 如果 `value` 不匹配任何结构体，返回空字符串
    };
    new_window.eval(&js_codes).map_err(|e| e.to_string())?;
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
        let js_code = match value.as_str() {
            "HACK_URL_LOGIN" => HackUrlLogin::get_js_code(),
            "HACK_URL_APP" => APPHACK::get_js_code(),
            "HACK_URL_LOGOUT" => HackUrlLogout::get_js_code(),
            "HACK_URL_LOGOUT_AFTER" => HackUrlLogoutAfter::get_js_code(),
            "HACK_URL_USER_HOME" => HackUrlUserHome::get_js_code(),
            "HACK_URL_INSTALL" => HackUrlInstall::get_js_code(),
            "HACK_URL_UPDATE" => HackUrlUpdate::get_js_code(),
            "HACK_URL_GAME" => HackUrlGame::get_js_code(),
            _ => &value, // 如果 `value` 不匹配任何结构体，返回空字符串
        };

        //dev
        // let js_file_path = value;
        // let js_code = fs::read_to_string(js_file_path).expect("Failed to read JavaScript file");

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

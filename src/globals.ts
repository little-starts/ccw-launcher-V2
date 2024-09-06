import { invoke } from '@tauri-apps/api/tauri';
import { WebviewWindow } from '@tauri-apps/api/window';

/**
 * 将json字符串储存到本地
 * @param {string} data 需要复写的json字符串
 */
const saveData = async (data: string) => {
    try {
        await invoke('save_string_to_file', { data });
    } catch (error) {
        console.error("Failed to save string:", error);
    }
}

/**
 * 读取储存的json文本并返回
 */
const loadData = async () => {
    let data = '{}';
    try {
        data = await invoke('read_string_from_file');
    } catch (error) {
        data = '{}';
    }
    if (data === '') {
        data = '{}';
    }
    return data;
}
type ValueObject = {
    [key: string]: any;
};

let saveContent: ValueObject = {};
loadData().then((e) => { saveContent = JSON.parse(e) });


const Value = {
    setValue: (key: string, value: any) => {
        loadData().then((e) => {
            saveContent = JSON.parse(e)
            saveContent[key] = value;
            saveData(JSON.stringify(saveContent));
        });
    },
    deleteKey: (key: string) => {
        loadData().then((e) => {
            saveContent = JSON.parse(e)
            delete saveContent[key];
            saveData(JSON.stringify(saveContent));
        });
    },
    getValue: (key: string) => {
        return new Promise((resolve) => {
            loadData().then((e) => {
                saveContent = JSON.parse(e)
                resolve(saveContent[key]);
            });
        }) as Promise<any | undefined>;
    },
}


const Window = {
    createWindow: async (id: string, url: string, path: string, name: string = '共创世界启动器') => {
        invoke('create_and_inject_js', {
            label: id,
            identifier: id,
            url: url,
            path: path,
            name: name
        }).catch((error) => {
            console.error('Failed to create window:', error);
            Window.focusWindow(id);
        });
        
        // 用new WebviewWindow代替原来的实现
    //     const webview = new WebviewWindow(id, {
    //         url: url,
    //         title: name

    // })
    // // since the webview window is created asynchronously,
    // // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
    // webview.once('tauri://created', function () {
    // // webview window successfully created
    // })
    // webview.once('tauri://error', function (e) {
    // // an error occurred during webview window creation
    // })
    },
    toGandi:async () => {
        
    },
    postMessage: async (id: string, title: string, message: any) => {
        invoke('post_message', {
            title: title,
            id: id,
            content: message
        }).catch((error) => console.error('Failed to post message:', error));
    },
    focusWindow: async (id: string) => {
        const targetWindow = WebviewWindow.getByLabel(id);

        if (targetWindow) {
            // 将窗口前置
            await targetWindow.setFocus();
        } else {
            console.error(`Window with label "${id}" not found.`);
        }
    },
    closeWindow: async (id: string) => {
        invoke('close_window', {
            window_id: id
        }).catch((error) => console.error('Failed to post message:', error));
    }
}

const js_code = {
    login: {
        dev: '../src/page/login/hack.js',
        prod: 'HACK_URL_LOGIN',
    },
    logout: {
        dev: '../src/page/logout/hack.js',
        prod: 'HACK_URL_LOGOUT',
    },
    userHome: {
        dev: '../src/page/userHome/hack.js',
        prod: 'HACK_URL_USER_HOME',
    },
    install: {
        dev: '../src/page/install/hack.js',
        prod: 'HACK_URL_INSTALL',
    },
    update: {
        dev: '../src/page/update/hack.js',
        prod: 'HACK_URL_UPDATE',
    },
    game: {
        dev: '../src/page/game/hack.js',
        prod: 'HACK_URL_GAME',
    },
    null: {
        dev: '../src/null.js',
        prod: '',
    }
}

const getCode = <K extends keyof typeof js_code>(e: K) => {
    const mode = 'prod';
    return js_code[e][mode] as string;
}

export { Value, Window, getCode };


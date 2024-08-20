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
    return data;
}
type ValueObject = {
    [key: string]: any;
};

let saveContent: ValueObject = {};
loadData().then((e) => { saveContent = JSON.parse(e) });


const Value = {
    setValue: (key: string, value: string) => {
        saveContent[key] = value;
        saveData(JSON.stringify(saveContent));
    },
    deleteKey: (key: string) => {
        delete saveContent[key];
        saveData(JSON.stringify(saveContent));
    },
    getValue: (key: string) => {
        return saveContent[key];
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
    },
    postMessage: async (id: string, title: string, message: any) => {
        invoke('post_message', {
            title: title,
            id: id,
            message: message
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
    }
}
export { Value, Window };


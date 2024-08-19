import { invoke } from '@tauri-apps/api/tauri';

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


const main = {
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
export default main;
const getFile = () => {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        fs.readFile(name, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * 写入内容到储存内容（自动创建）
 * @param {string} name 文件名
 * @param {string} content 内容
 * @param {boolean} append true:追加;false:复写
 */
function setFile(name, content, append = false) {
    getFile('C:/CCW Launcher/' + name).then(function (res) {
        console.log(res)
        if (res === null) {
            createDir('C:/CCW Launcher');
            openFile('C:/CCW Launcher/' + name, 'w+');
            closeFile();
        }
        saveFile('C:/CCW Launcher/' + name, content, append);
    })
}

let Interval = setInterval(() => {
    if (` + tostring(Info.installmode) + `) {
        getFile('C:/CCW Launcher/save.json').then((e) => {
            let url = "` + Info.url + `"
            try {
                let json = JSON.parse(e);
                json.push({ "name": "` + Info.name + `", "url": url.split("detail").join("player") })
                setFile("save.json", JSON.stringify(json))
            }
            catch (e) {
                let json = [];
                json.push({ "name": "` + Info.name + `", "url": url.split("detail").join("player") })
                setFile("save.json", JSON.stringify(json))
            }
            clearInterval(Interval);
            setTimeout(() => {
                aardio.hitClose();
            }, 1000);
        })
    }
    else {
        if (document.getElementsByClassName("runWorksOuterBtn-mHIzf btn-iEdNA btn-middle-19T-1 btn-primary-QAIa5")[0] !== undefined) {
            aardio.get(document.getElementsByClassName("runWorksWrapper-3T6tc")[0].style.backgroundImage.split('"')[1].split('?')[0], document.getElementsByClassName("title-1M2qA")[0].innerText);
            getFile('C:/CCW Launcher/save.json').then((e) => {
                let url = "` + Info.url + `"
                try {
                    let json = JSON.parse(e);
                    json.push({ "name": ("` + Info.name + `" == "" ? document.getElementsByClassName("title-1M2qA")[0].innerText : "` + Info.name + `"), "url": url.split("detail").join("player") })
                    setFile("save.json", JSON.stringify(json))
                }
                catch (e) {
                    let json = [];
                    json.push({ "name": ("` + Info.name + `" == "" ? document.getElementsByClassName("title-1M2qA")[0].innerText : "` + Info.name + `"), "url": url.split("detail").join("player") })
                    setFile("save.json", JSON.stringify(json))
                }
                clearInterval(Interval);
                setTimeout(() => {
                    aardio.hitClose();
                }, 1000);
            })
        }
    }
}, 1000);
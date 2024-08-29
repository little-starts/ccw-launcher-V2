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
setTimeout(() => {
    console.log(window.location.href);
    window.__TAURI_INVOKE__('inject_js_with_delay', { value: '../src/page/install/hack.js', id: 'install' })
        .then(() => console.log('Rust function called successfully!'))
        .catch((error) => console.error('Failed to call Rust function:', error));
}, 100);

//TODO: hack网页显示导入按钮
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

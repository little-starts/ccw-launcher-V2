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

console.log('get_js_code');
window.open = function (url, name, specs) {
    console.log(url);
    let urls = url;
    if (url.startsWith('/')) {
        urls = window.location.origin + url;
    }
    window.__TAURI_INVOKE__('inject_js_with_delay', { value: '../src/page/app/hack.js', id: 'install' })
        .then(() => console.log('Rust function called successfully!'))
        .catch((error) => console.error('Failed to call Rust function:', error));
    window.location.replace(urls);
    return null; // window.open usually returns a reference to the window, but Tauri doesn't support this.
};
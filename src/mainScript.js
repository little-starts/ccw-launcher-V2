import { invoke } from '@tauri-apps/api/tauri';
if (window.location.pathname === '/profile/personal') {
    console.log('User is on the login page');

    async function saveImageFromImgTag() {
        const imgElement = document.querySelector('.c-avatar-img')[0];

        if (imgElement) {
            const imageUrl = imgElement.src;

            // 调用 Rust 函数保存图片
            try {
                await invoke('save_image', { url: imageUrl });
                console.log('Image saved successfully!');
            } catch (error) {
                console.error('Failed to save image:', error);
            }
        } else {
            console.error('Image element not found');
        }
    }
    saveImageFromImgTag();

}
import { useEffect, useState } from 'react';
import { appDataDir } from '@tauri-apps/api/path';
import { readBinaryFile, exists } from '@tauri-apps/api/fs';

const AvatarIcon = () => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const appDataDirPath = await appDataDir();
                const imgPath = `${appDataDirPath}/headImg.png`;

                // 检查文件是否存在
                const fileExists = await exists(imgPath);

                if (!fileExists) {
                    setImgSrc(undefined);
                    return;
                }

                // 读取图像文件为二进制数据
                const imgData = await readBinaryFile(imgPath);

                // 将二进制数据转换为 Base64 编码
                const base64Img = `data:image/png;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(imgData))
                )}`;
                setImgSrc(base64Img);
            } catch (error) {
                console.error('Error loading image:', error);
                setImgSrc(undefined);
            }
        };

        loadImage();
    }, []);

    if (!imgSrc) {
        return null; // 如果图像不存在，则不渲染任何内容
    }

    return <img src={imgSrc} alt="Icon" />;
};

export default AvatarIcon;

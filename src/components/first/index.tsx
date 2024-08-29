import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd'; // 如果你使用 antd UI 库

const WelcomeModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // 检查本地存储，查看用户是否已经访问过网站
        const hasVisited = localStorage.getItem('hasVisited');

        if (!hasVisited) {
            setIsModalVisible(true);
            localStorage.setItem('hasVisited', 'true'); // 标记用户已经访问过
        }
    }, []);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            title="欢迎使用共创世界启动器"
            open={isModalVisible}
            onOk={handleOk}
            footer={[
                <Button key="ok" type="primary" onClick={handleOk}>
                    确定
                </Button>,
            ]}
        >
            <p>
                在开始使用时，有几点需要注意：
                <ul>
                    <li>共创世界启动器并非官方开发，有关于启动器的问题请勿询问官方。如有需要，可以加入启动器交流群：760188536</li>
                    <br />
                    <li>启动器中使用了大量hack以保证功能的正常运行，但也导致了可能有时hack失败的问题，如果在共创世界网页中点不动按钮、看不见导入按钮等问题，属于正常情况，关闭窗口重新打开即可</li>
                    <br />
                    <li>启动器并没有获得 apple store 开发者认证，所以无法使用任何敏感权限，包括但不限于：相机、麦克风、锁定鼠标</li>
                </ul>
                点击确定代表你同意上述内容，如果不同意上述内容，可以卸载共创世界启动器
                <br />
                *此弹窗仅弹出一次
            </p>
        </Modal>
    );
};

export default WelcomeModal;

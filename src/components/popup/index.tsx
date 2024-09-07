import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd'; // 如果你使用 antd UI 库

const Popup = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ModalContent, setModalContent] = useState(false);
    const [ModalTitle, setModalTitle] = useState(false);

    useEffect(() => {
        window.addEventListener('message', (e) => {
            if (e.data[0] === 'popup') {
                setModalTitle(e.data[1]);
                setModalContent(e.data[2]);
                setIsModalVisible(true);
            }
        });
    }, []);

    const handleOk = () => {
        setIsModalVisible(false);
        window.postMessage(['popupClose'], '*');

    };

    return (
        <Modal
            title={ModalTitle}
            open={isModalVisible}
            onOk={handleOk}
            footer={[
                <Button key="ok" type="primary" onClick={handleOk}>
                    确定
                </Button>,
            ]}
        >
            {ModalContent}
        </Modal>
    );
};

export default Popup;

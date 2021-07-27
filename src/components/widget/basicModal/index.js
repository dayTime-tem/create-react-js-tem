/**
 * @Author: dayTimeAffect
 * @Date: 2021/7/15
 */
import React, {useState, useImperativeHandle} from "react";
import { Modal, Button, Spin } from "antd";
function BasicModal(props, ref) {
    const { title, children, onOk, asyncOk, onCancel, cancelText, okText, footer,
        showTxt, getContainer, keyboard = false, maskClosable = false, customOpenButton, maxHeight, width, destroyOnClose, closeCallBack } = props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [load, setLoad] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        onOk && onOk()
        if (asyncOk){
            asyncOk(startLoad, closeLoad, closeModal)
        }else{
            closeModal()
        }
    };

    const handleCancel = () => {
        onCancel && onCancel()
        closeModal()
    };
    const closeModal = () => {
        if (!load){
            setIsModalVisible(false)
            closeCallBack && closeCallBack()
        }
    }
    const startLoad = () => setLoad(true)
    const closeLoad = () => setLoad(false)
    useImperativeHandle(ref, () => {
        return{
            showModal, startLoad, closeModal, closeLoad
        }
    });
    return (
        <>
            { showTxt && <Button type="primary" onClick={showModal}>
                { showTxt }
            </Button> }
            { customOpenButton && customOpenButton(showModal, startLoad, closeLoad)}
            <Modal
                title={title || '弹窗'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={load}
                {...{cancelText, okText, footer, maskClosable, getContainer, keyboard, destroyOnClose}}
                width={width}
            >
                <Spin spinning={load}>
                    <div style={{maxHeight: maxHeight, overflowY: "auto"}}>
                        {children}
                    </div>
                </Spin>
            </Modal>
        </>
    )
}
const BasicModalRef = React.forwardRef(BasicModal)
export default BasicModalRef
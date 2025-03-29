import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { IoClose } from "react-icons/io5";

interface CustomModalProps {
  bodydarkBackground?: any;
  showpopup:boolean;
  position?:boolean;
  props?: any;
  onClose: () => any;
  children: React.ReactNode; // Content from parent
}

const CustomModal: React.FC<CustomModalProps> = ({onClose,showpopup,position,props,children }) => {
  return (
    <Modal
      isOpen={showpopup}
      centered={position||true}
      toggle={() => {
        if(onClose){
            onClose()
        }
      }}
      style={props?.modalStyle}
      fullscreen={props?.fullScreen}
    >
      <ModalHeader
        toggle={() => {
          if(onClose){
            onClose()
          }
        }}
        close={onClose}
        title={props?.popheaderTitle}
        className={` ${props?.classHeader}`}
      >
        <div className="d-flex align-items-center">
            {props?.popHeader()}
            <div  className="pointer" onClick={()=>{if(onClose){onClose()}}}>
                <IoClose size={20} color="#000"/>
            </div>
        </div>
      </ModalHeader>
      <ModalBody className={`${props?.classBody} py-0` }>{children}</ModalBody>
      <ModalFooter className={`${props?.classFooter}  `}>
        {props?.footerBody}
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;

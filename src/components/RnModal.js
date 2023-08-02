import React from 'react';
import ReactNativeModal from 'react-native-modal';

function RnModal(props) {
  return (
    <ReactNativeModal
      isVisible={props.visible}
      onBackButtonPress={props.close}
      onBackdropPress={props.close}
      hasBackdrop
      style={props.style}
      backdropOpacity={0.7}
      backdropColor="rgba(0,0,0,1)"
    >
      {props.children}
    </ReactNativeModal>
  );
}

export default RnModal;

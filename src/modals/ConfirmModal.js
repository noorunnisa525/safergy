import Button from '@components/Button';
import { useThemeAwareObject } from '@theme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '@utils';
import Dialog from '@modals/ConfirmModal';

const createStyles = theme => {
  const styles = StyleSheet.create({
    dialogStyle: {
      borderRadius: theme.borders.radius3,
    },
    iconSize: hp(2),
    divider: {
      margin: wp(1),
    },

    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp(2),
    },

    buttonStyle: { width: '50%' },
  });
  return styles;
};

const ConfirmModal = props => {
  const styles = useThemeAwareObject(createStyles);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  return (
    <Dialog style={styles.dialogStyle} visible={props.visible} close={props.onClose}>
      <View style={styles.buttonContainer}>
        <Button
          title={'No'}
          onPress={() => {
            props.onClose();
          }}
          disabled={false}
          buttonStyle={styles.buttonStyle}
        />

        <View style={styles.divider} />

        <Button
          title={'Yes'}
          onPress={() => {
            setIsCancelLoading(true);
            setTimeout(() => {
              setIsCancelLoading(false);
              props.onClose();
            }, 800);
          }}
          loading={isCancelLoading}
          disabled={false}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </Dialog>
  );
};

export default ConfirmModal;

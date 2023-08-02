import { useThemeAwareObject } from '@theme';
import { hp, wp } from '@utils';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { CameraIcon, ImageIcon } from './ImagePicker/Icons/Index';
import RnText from './Text';

const ImageInput = props => {
  const { uri, setUri = null, insert } = props;
  console.log('setUri', setUri);
  console.log('uri', uri);
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: 'Open Camera',
      icon: <CameraIcon />,
      onPress: () => {
        ImagePicker.openCamera({
          height: 500,
          width: 500,
          cropping: true,
          compressImageMaxHeight: 1000,
          compressImageMaxWidth: 1000,
        }).then(image => {
          let obj = {};

          const newImageUri =
            Platform.OS == 'android'
              ? 'file:/' + image.path.split('file:///').join('')
              : image.path;

          obj['uri'] = newImageUri;
          obj['type'] = image.mime;
          obj['name'] = newImageUri.split('/').pop();
          setUri(obj);
          setIsVisible(false);
        });
      },
    },
    {
      title: 'Choose Gallery',
      icon: <ImageIcon />,
      onPress: () =>
        ImagePicker.openPicker({
          height: 500,
          width: 500,
          compressImageMaxHeight: 1000,
          compressImageMaxWidth: 1000,
        }).then(image => {
          let obj = {};
          const newImageUri =
            Platform.OS == 'android'
              ? 'file:/' + image.path.split('file:///').join('')
              : image.path;
          console.log('first', newImageUri);

          obj['uri'] = newImageUri;
          obj['type'] = image.mime;
          obj['name'] = newImageUri.split('/').pop();
          setUri(obj);
          setIsVisible(false);
        }),
    },
  ];

  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      title: {
        alignSelf: 'center',
        fontSize: theme.size.small,
        fontFamily: theme.family.semibold,
        marginTop: hp(2),
      },
      imgContainer: {
        width: wp(35),
        height: wp(35),
        // overflow: 'hidden',
        borderRadius: wp(60),
        justifyContent: 'center',
      },
      options: {
        backgroundColor: theme.color.backgroundColor,
        flexDirection: 'row',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      },
      option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageStyle: {
        borderRadius: hp(13),
        borderColor: theme.color.primaryColor,
        borderWidth: hp(0.4),
      },
      editIconContainer: {
        borderWidth: hp(0.4),
        borderColor: theme.color.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(8),
        height: hp(4),
        backgroundColor: theme.color.backgroundColor,
        borderRadius: hp(10),
        flexDirection: 'row',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        right: 7,
        zIndex: 100,
      },
      insertProfileText: {
        marginTop: hp(1.3),
        marginHorizontal: wp(3.5),
        fontSize: theme.size.small,
        fontFamily: theme.family.semibold,
        textAlign: 'center',
        marginBottom: -hp(5),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <>
      <View>
        <ImageBackground
          // resizeMode="contain"
          style={styles.imgContainer}
          imageStyle={styles.imageStyle}
          {...props}
          source={uri}
        >
          <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.editIconContainer}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/editPencilpng.png')}
              style={{ width: wp(5), height: hp(5) }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      {insert && (
        <RnText onPress={() => setIsVisible(true)} style={styles.insertProfileText}>
          Insert Profile Picture
        </RnText>
      )}

      {/* <TouchableOpacity
        style={[styles.imgContainer, props.imgContainer]}
        onPress={() => setIsVisible(true)}
      >
        {children}
      </TouchableOpacity> */}

      <Modal
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <SafeAreaView style={styles.options}>
          {list.map((l, i) => (
            <Pressable style={styles.option} onPress={l.onPress}>
              <RnText style={styles.title}>{l.title}</RnText>
              {l.icon}
            </Pressable>
          ))}
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ImageInput;

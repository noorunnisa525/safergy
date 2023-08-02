import { Avatar } from '@rneui/base/dist/Avatar/Avatar';
import { wp } from '@utils';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icons from '../../assets/Icons';
import { useThemeAwareObject } from '../theme';

function CustomAvatar(props) {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      avatarContainer: {
        height: wp(14),
        width: wp(14),
        borderRadius: theme.borders.radius4,
      },
      accessoryBackgroundColor: {
        backgroundColor: theme.color.backgroundColor,
      },
      userBtn: {
        borderRadius: theme.borders.radius4,
        height: wp(18),
        width: wp(18),
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,

        // elevation: 1,
        // padding: wp(5),
      },
    });
    return themeStyles;
  };

  const styles = useThemeAwareObject(createStyles);
  const [loading, setLoading] = useState(true);
  return props.image == null ? (
    <TouchableOpacity
      onPress={props.onPressAvatar}
      style={styles.userBtn}
      // disabled={true}
    >
      {props.profile ? Icons.Profile(props?.customStyle) : Icons.User(props?.customStyle)}
      {/* <Avatar
        source={require("../../assets/icons/noUser.png")}
        rounded
        size={props.size}
        containerStyle={[styles.avatarContainer, props.avatarContainer]}
      >
        {props.acessory == null ? null : (
          <Avatar.Accessory size={30} style={styles.accessoryBackgroundColor} />
        )}
      </Avatar> */}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={props.onPressAvatar} disabled={props.disabled}>
      <FastImage
        onLoad={() => {
          setLoading(false);
        }}
        source={loading ? require('../../assets/icons/user.png') : { uri: props.image }}
        style={[styles.avatarContainer, props.avatarContainer]}
      >
        {props.acessory == null ? null : (
          <Avatar.Accessory size={30} style={styles.accessoryBackgroundColor} />
        )}
      </FastImage>
    </TouchableOpacity>
  );
}

export default CustomAvatar;

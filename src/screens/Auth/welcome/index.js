import Text from '@components/Text';
import { useThemeAwareObject } from '@theme';
import React from 'react';
import { Image, PanResponder, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import Icons from '../../../../assets/Icons';
import createStyles from './styles';

export default function welcome(props) {
  const styles = useThemeAwareObject(createStyles);
  const user = useSelector(state => state.user.user);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        const { dx } = gestureState;
        if (dx > 100) {
          props.navigation.replace('TabNavigator');
        }
      },
    }),
  ).current;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.innerContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.mainContainer} {...panResponder.panHandlers}>
        <View style={styles.innerView}>
          <Text style={styles.textName}>Hello, {user?.first_name}</Text>
          <Image
            resizeMode="contain"
            source={require('../../../../assets/icons/logo.png')}
            style={styles.logoStyle}
          />

          <Text style={styles.textIntro}>Worry Less, Enjoy More</Text>
        </View>
      </View>
      <View style={styles.rowView} {...panResponder.panHandlers}>
        <Text style={styles.textSwipe}>Swipe to Begin</Text>
        {Icons.RightArrow()}
      </View>
    </KeyboardAwareScrollView>
  );
}

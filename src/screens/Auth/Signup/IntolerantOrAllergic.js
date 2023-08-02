import IntoleranceSelection from '@components/IntoleranceSelection';
import Text from '@components/Text';
import { usePostApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import React, { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import Header from '../../../components/Header';
import createStyles from './styles';

export default function IntolerantOrAllergic(props) {
  const [allergyCall, allergyResponse] = usePostApiMutation();
  const styles = useThemeAwareObject(createStyles);
  const [showAllergyError, setShowAllergyError] = useState(false);
  const [allAllergies, setAllAllergies] = useState([]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.innerContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <Header
        containerStyle={styles.headerStyle}
        backgroundColor={{ backgroundColor: styles.headerStyle.color }}
        statusbar={{ backgroundColor: styles.headerStyle.color }}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../../assets/icons/splash.png')}
            style={styles.logoStyle}
          />
          <Text style={styles.infoText}>Create My Account</Text>
        </View>
        <Text style={styles.allergyText}>Please Select Your Allergies and/or Intolerances </Text>

        {allergyResponse.isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color="#E54002" />
          </View>
        ) : (
          <IntoleranceSelection
            items={props.route.params.allergies}
            multiple={true}
            setShowAllergyError={setShowAllergyError}
            onChange={value => {
              let user = {
                allergies: props.route.params.allergies,
                password: props.route.params.password,
                type: value,
              };
              props.navigation.navigate('UserProfile', { user: user });
            }}
          />
        )}
        {showAllergyError &&
          Snackbar.show({
            text: 'Allergies is required',
            duration: Snackbar.LENGTH_SHORT,
          })}
      </View>
    </KeyboardAwareScrollView>
  );
}

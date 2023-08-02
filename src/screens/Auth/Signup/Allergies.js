// import Snackbar from '@components/Snackbar';
import Text from '@components/Text';
import { getAllergies } from '@endpoints';
import { usePostApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import AllergiesSelection from '../../../components/AllergiesSelection';
import Header from '../../../components/Header';
import createStyles from './styles';

export default function Allergies(props) {
  const [allergyCall, allergyResponse] = usePostApiMutation();
  const styles = useThemeAwareObject(createStyles);
  const [showAllergyError, setShowAllergyError] = useState(false);
  const [allAllergies, setAllAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllergies();
  }, []);

  async function fetchAllergies() {
    let apiData = {
      url: getAllergies,
      method: 'GET',
    };
    try {
      let res = await allergyCall(apiData).unwrap();

      if (res.status == 200) {
        if (res.data.length > 0) {
          setAllAllergies(res.data);
        }
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.data?.message);
    }
  }
  return (
    <View style={styles.innerContainer}>
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
          <AllergiesSelection
            items={allAllergies}
            multiple={true}
            setShowAllergyError={setShowAllergyError}
            onPressBack={() => props.navigation.goBack()}
            onChange={value => {
              setSelectedAllergies(value);
              props.navigation.navigate('IntolerantOrAllergic', {
                password: props?.route?.params?.user,
                allergies: value,
              });
            }}
          />
        )}
        {showAllergyError &&
          Snackbar.show({
            text: 'Allergies are required',
            duration: Snackbar.LENGTH_SHORT,
          })}
      </View>
    </View>
  );
}

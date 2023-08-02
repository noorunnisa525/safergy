import Text from '@components/Text';
import { usePostApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import React, { cloneElement, useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header';
import createStyles from './styles';
import ImageInput from '@components/ImagePicker';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '@components/Button';
import Input from '@components/InputField';
import { setToken, setUser, showwelcome } from '@slices/userSlice';
import { completeProfile } from '@endpoints';
import Snackbar from '@components/Snackbar';
import { hp } from '@utils';
import { baseUrl } from '@constants';

export default function UserProfile(props) {
  const [allergyCall, allergyResponse] = usePostApiMutation();
  const styles = useThemeAwareObject(createStyles);
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const phoneNo = useSelector(state => state.user.phoneNumber);
  const dispatch = useDispatch();
  const [signUpCall, signupResponse] = usePostApiMutation();
  const validationSchema = yup.object().shape({
    firstName: yup.string('First name is required').required('First name is required'),
    lastName: yup.string('Last name is required').required('Last name is required'),
  });

  async function handleSignup(values) {
    // props.navigation.navigate('Login');
    // dispatch(setToken(true));

    let user = props.route.params.user;
    let form = new FormData();
    // form.append('email', user.email.toLowerCase());
    form.append('first_name', values.firstName);
    form.append('last_name', values.lastName);
    form.append('password', user.password);
    form.append('phone', phoneNo);
    user.allergies.map((item, index) => {
      form.append(`allergies[${index}][id]`, item.id);
      form.append(`allergies[${index}][type]`, user.type[item.id]);
    });

    if (imagePath) {
      form.append('profile_image', imagePath);
    }
    let apiData = {
      url: completeProfile,
      method: 'POST',
      data: form,
    };
    try {
      let res = await signUpCall(apiData).unwrap();
      console.log('res', res);
      if (res.status == 200) {
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.access_token));
        dispatch(showwelcome());
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.message);
    }
  }

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
      <View style={{ justifyContent: 'space-between' }}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../../assets/icons/splash.png')}
            style={styles.logoStyle}
          />
          <Text style={styles.infoText}>Create My Account</Text>
        </View>
        <View style={styles.imgContainer}>
          <ImageInput
            insert
            setUri={img => {
              setImage(img.uri);
              setImagePath(img);
            }}
            uri={
              image == null
                ? require('../../../components/ImagePicker/Icons/avatar-placeholder.png')
                : { url: image }
            }
          ></ImageInput>
          {/* <Text style={styles.insertProfileText}>Insert Profile Picture</Text> */}
        </View>
      </View>
      <Formik
        // innerRef={formikRef}
        initialValues={{
          firstName: '',
          lastName: '',
        }}
        onSubmit={values => {
          handleSignup(values);
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => {
          return (
            <View>
              <Text style={styles.titleText}>Please Enter Your Name</Text>
              <Input
                placeholder={'First name'}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                error={errors.firstName}
                containerStyle={styles.containerStyle}
              />
              <Input
                placeholder={'Last name'}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                error={errors.lastName}
                containerStyle={styles.containerStyle}
              />

              <Button
                title1={'Finish Creating My Account'}
                onPress={handleSubmit}
                loading={signupResponse.isLoading}
                style={[styles.nextBtn, styles.loginText]}
              />
              <Button
                title1={'Back'}
                onPress={() => {
                  props.navigation.goBack();
                }}
                style={[styles.backButton, styles.backText]}
              />
            </View>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
}

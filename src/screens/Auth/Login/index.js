import Button from '@components/Button';
import Input from '@components/InputField';
import Snackbar from '@components/Snackbar';
import Text from '@components/Text';
import { login } from '@endpoints';
import { usePostApiMutation } from '@services';
import { setPhone, setToken, setUser } from '@slices/userSlice';
import { useThemeAwareObject } from '@theme';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Image, Keyboard, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Header from '../../../components/Header';
import createStyles from './styles';
import CustomInputMask from '@components/CustomInputMask';

export default function Login(props) {
  const styles = useThemeAwareObject(createStyles);
  const dispatch = useDispatch();
  const [secureText, setsecureText] = useState(true);
  const [loginCall, loginCallResponse] = usePostApiMutation();
  const formikRef = React.createRef();

  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      // :FIXME:
      .matches(/^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/, {
        message: 'Phone format must be +#(###)###-####',
      })
      .required('Phone number is required'),
    password: yup
      .string('Password is required')
      .required('Password is required')
      .min(8, () => 'Minimum 8 characters. password must contain special characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Minimum 8 characters. password must contain special characters',
      ),
  });

  async function handleLogin(values) {
    Keyboard.dismiss();
    let form = new FormData();
    // form.append('email', values.email.toLowerCase());
    form.append('phone', values.phoneNumber);
    form.append('password', values.password);
    let apiData = {
      url: login,
      method: 'POST',
      data: form,
    };
    try {
      let res = await loginCall(apiData).unwrap();
      if (res.status == 200) {
        dispatch(setUser(res.data));
        dispatch(setPhone(res.data.phone));
        dispatch(setToken(res.data.access_token));
      } else if (res.status == 415) {
        dispatch(setPhone(res.data.phone));
        props.navigation.navigate('OtpVerification', { phoneNumber: values.phoneNumber });
        formikRef.current?.resetForm();
      } else if (res.status == 416) {
        dispatch(setPhone(res.data.phone));
        props.navigation.navigate('InputPassword');
        formikRef.current?.resetForm();
      } else if (res.status == 400) {
        Snackbar('error', res?.message);
      } else {
        Snackbar('error', res?.message);
      }
    } catch (e) {
      console.log('e', e);
      Snackbar('error', e?.error ?? e?.error);
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
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../../assets/icons/splash.png')}
            style={styles.logoStyle}
          />
          <Image
            resizeMode="contain"
            source={require('../../../../assets/icons/welcomeSafergy.png')}
            style={styles.welcomeLogo}
          />
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={{
            phoneNumber: '',
            password: '',
          }}
          onSubmit={values => {
            // dispatch(setToken(true));
            handleLogin(values);
            // props.navigation.navigate("welcome");
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, values }) => {
            return (
              <View style={styles.fieldContainer}>
                <Text style={styles.titleText}>Please Enter Your Phone Number & Password </Text>
                {/* <Input
                  placeholder={'Phone number'}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  error={errors.phoneNumber}
                  containerStyle={styles.containerStyle}
                  keyboardType="phone-pad"
                /> */}
                <CustomInputMask
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  error={errors.phoneNumber}
                  placeholder={'Phone number'}
                  keyboardType="phone-pad"
                  containerStyle={styles.containerStyle}
                />
                <Input
                  secure={secureText}
                  placeholder={'Password'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  containerStyle={styles.containerStyle}
                />

                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ForgotPassword');
                    }}
                  >
                    {/* <Text style={styles.forgotPassword}>Forgot password?</Text> */}
                  </TouchableOpacity>
                </View>
                <Button
                  title1={'Continue '}
                  onPress={handleSubmit}
                  style={[styles.loginBtn, styles.loginText]}
                  loading={loginCallResponse.isLoading}
                />
              </View>
            );
          }}
        </Formik>
        <Text style={styles.orText}>OR </Text>

        <Button
          title1={'Create My Account'}
          onPress={() => {
            props.navigation.navigate('Signup');
            formikRef.current?.resetForm();
          }}
          style={[styles.createButton, styles.createText]}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

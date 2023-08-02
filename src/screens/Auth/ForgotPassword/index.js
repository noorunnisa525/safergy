import Button from '@components/Button';
import Input from '@components/InputField';
import Snackbar from '@components/Snackbar';
import Text from '@components/Text';
import { forgotPassword } from '@endpoints';
import { usePostApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import { Formik } from 'formik';
import React from 'react';
import { Image, Keyboard, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import createStyles from './styles';

export default function ForgotPassword(props) {
  const styles = useThemeAwareObject(createStyles);
  const [forgotCall, forgotResponse] = usePostApiMutation();

  const validationSchema = yup.object().shape({
    email: yup.string('Email is required').email().label('Email').required('Email is required'),
  });
  async function handleForgot(values) {
    let form = new FormData();
    form.append('email', values.email.toLowerCase());

    let apiData = {
      url: forgotPassword,
      method: 'POST',
      data: form,
    };
    try {
      let res = await forgotCall(apiData).unwrap();
      if (res.status == 200) {
        Snackbar('success', 'Password has been sent to your email');
        setTimeout(() => {
          props.navigation.popToTop();
        }, 2000);
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.data?.message);
    }
  }
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.innerContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          source={require('../../../../assets/icons/logo.png')}
          style={styles.logoStyle}
        />

        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={values => {
            Keyboard.dismiss();
            handleForgot(values);
            // props.navigation.navigate('OtpVerification');
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, values }) => {
            return (
              <View>
                <Text style={styles.tilteText}>Email</Text>
                <Input
                  placeholder={'Email'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  keyboardType={'email-address'}
                  containerStyle={styles.containerStyle}
                />

                <Button
                  title1={'Recover Password'}
                  onPress={handleSubmit}
                  style={[styles.loginBtn, styles.loginText]}
                  loading={forgotResponse.isLoading}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}

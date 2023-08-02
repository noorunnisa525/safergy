import Button from '@components/Button';
import Input from '@components/InputField';
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Text from '@components/Text';
import { useThemeAwareObject } from '@theme';
import { wp } from '@utils';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Icons from "react-native-vector-icons/FontAwesome5";
import Icons from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import createStyles from './styles';

export default function RecoverPassword(props) {
  const styles = useThemeAwareObject(createStyles);
  const { t } = useTranslation();

  const [secureText, setsecureText] = useState(true);

  const validationSchema = yup.object().shape({
    password: yup
      .string(t('password_required'))
      .required(t('password_required'))
      .min(8, () => 'Minimum 8 characters. password must contain special characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Minimum 8 characters. password must contain special characters',
      ),
    passwordConfirmation: yup
      .string(t('password_require'))
      .required(t('password_require'))

      .oneOf([yup.ref('password'), null], t('password_confirmation_error')),
  });

  const rightIcon = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setsecureText(!secureText);
        }}
      >
        <Icons name={!secureText ? 'eye' : 'eye-with-line'} size={wp(4.5)} color="black"></Icons>
      </TouchableOpacity>
    );
  };
  // async function handleLogin(values) {
  //   let form = new FormData();
  //   form.append('email', values.email.toLowerCase());
  //   form.append('password', values.password);
  //   let apiData = {
  //     url: login,
  //     method: 'POST',
  //     data: form,
  //   };
  //   try {
  //     let res = await loginCall(apiData).unwrap();
  //     if (res.status == 200) {
  //       dispatch(setUser(res.data.user));
  //       dispatch(setToken(res.data.access_token));
  //     } else {
  //       Snackbar(res.message, true);
  //     }
  //   } catch (e) {
  //     Snackbar(e?.error ?? e?.data?.message, true);
  //   }a
  // }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.innerContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.mainContainer}>
        <Image
          resizeMode="contain"
          source={require('../../../../assets/icons/logo.png')}
          style={styles.logoStyle}
        />

        <Formik
          initialValues={{
            password: '',
          }}
          onSubmit={values => {
            // dispatch(setToken(true));
            props.navigation.popToTop();
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, values }) => {
            return (
              <View>
                <Text style={styles.tilteText}>Password</Text>
                <Input
                  secure={t}
                  placeholder={t('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  containerStyle={styles.containerStyle}
                />
                <Text style={styles.tilteText}>Confirm password</Text>
                <Input
                  secure={secureText}
                  placeholder={t('Confirm password ')}
                  value={values.passwordConfirmation}
                  onChangeText={handleChange('passwordConfirmation')}
                  error={errors.passwordConfirmation}
                  rightIcon={rightIcon()}
                  containerStyle={styles.containerStyle}
                />

                <Button
                  title1={'Update Password'}
                  onPress={handleSubmit}
                  style={[styles.loginBtn, styles.loginText]}
                  loading={false}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}

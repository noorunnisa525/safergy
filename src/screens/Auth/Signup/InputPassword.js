import Button from '@components/Button';
import Input from '@components/InputField';
import Text from '@components/Text';
import { useThemeAwareObject } from '@theme';
import { wp } from '@utils';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Icons from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import Header from '../../../components/Header';
import createStyles from './styles';
import Icons from '../../../../assets/Icons';

export default function InputPassword(props) {
  const styles = useThemeAwareObject(createStyles);
  const [secureText, setsecureText] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const formikRef = React.createRef();

  const validationSchema = yup.object().shape({
    password: yup
      .string('Password is required')
      .required('Password is required')
      .min(8, () => 'Minimum 8 characters. password must contain special characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Minimum 8 characters. password must contain special characters',
      ),
    confirmPassword: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Password does not match'),
  });
  function handleNext(values) {
    // const user = Object.assign(props?.route?.params?.user, values);
    props.navigation.navigate('Allergies', { user: values.password });
    formikRef.current?.resetForm();
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
      <View style={{ flex: 1 }}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../../assets/icons/splash.png')}
            style={styles.logoStyle}
          />
          <Text style={styles.infoText}>Create My Account</Text>
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          onSubmit={values => {
            handleNext(values);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, values }) => {
            return (
              <View style={styles.inputContainer}>
                <Text style={styles.titleText}>Please Enter Your Password</Text>

                <Text style={styles.containText}>
                  Must Contain: {'\n'}
                  {'\u2022'}At least 1 Uppercase {'\n'}
                  {'\u2022'}At least 1 Number{'\n'}
                  {'\u2022'}At least 1 Character
                </Text>

                <Input
                  secure={secureText}
                  placeholder={'Password'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  // rightIcon={rightIcon()}
                  rightIcon={errors.password && Icons.CrossIcon()}
                  containerStyle={styles.containerStyle}
                />
                <Text style={styles.titleText}>Confirm Your Password </Text>
                <Input
                  secure={secureConfirmPassword}
                  placeholder={'Confirm Password'}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  error={errors.confirmPassword}
                  containerStyle={styles.containerStyle}
                  rightIcon={errors.confirmPassword && Icons.CrossIcon()}
                />

                <Button
                  title1={'Continue'}
                  onPress={handleSubmit}
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
      </View>
    </KeyboardAwareScrollView>
  );
}

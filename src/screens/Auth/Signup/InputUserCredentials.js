import Button from '@components/Button';
import Input from '@components/InputField';
import Text from '@components/Text';
import { useThemeAwareObject } from '@theme';
import { Formik } from 'formik';
import React from 'react';
import { Image, View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import Header from '../../../components/Header';
import createStyles from './styles';
import { register } from '@endpoints';
import { usePostApiMutation } from '@services';
import { setPhone } from '@slices/userSlice';
import Snackbar from '@components/Snackbar';
import { useDispatch } from 'react-redux';
import CustomInputMask from '@components/CustomInputMask';

export default function InputUserCredentials(props) {
  const styles = useThemeAwareObject(createStyles);
  const formikRef = React.createRef();
  const [registerCall, registerResponse] = usePostApiMutation();

  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      // :FIXME:
      .matches(/^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/, {
        message: 'Phone format must be +#(###)###-####',
      })
      .required('Phone number is required'),
    confirmPhoneNumber: yup
      .string()
      .oneOf([yup.ref('phoneNumber')], 'Phone number do not match')
      .required('Confirm phone number is required'),
  });

  async function handleNext(values) {
    Keyboard.dismiss();
    let form = new FormData();
    form.append('phone', values.phoneNumber);
    let apiData = {
      url: register,
      method: 'POST',
      data: form,
    };
    try {
      let res = await registerCall(apiData).unwrap();
      console.log('res.....', res);
      if (res.status == 200) {
        dispatch(setPhone(res.data.user.phone));
        props.navigation.navigate('OtpVerification');
        formikRef.current?.resetForm();
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
      nestedScrollEnabled={true}
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
            phoneNumber: '',
            confirmPhoneNumber: '',
          }}
          onSubmit={values => {
            handleNext(values);
            // console.log('done', values);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, values }) => {
            return (
              <View style={styles.inputContainer}>
                <Text style={styles.titleText}>Please Enter Your Phone Number </Text>
                <CustomInputMask
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  placeholder={'Phone number'}
                  keyboardType="phone-pad"
                  error={errors.phoneNumber}
                />
                {/* <Input
                  placeholder={'Phone number'}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  error={errors.phoneNumber}
                  containerStyle={styles.containerStyle}
                  keyboardType="phone-pad"
                /> */}
                <Text style={styles.titleText}>Confirm Your Phone Number </Text>
                {/* <Input
                  placeholder={'Confirm phone number'}
                  value={values.confirmPhoneNumber}
                  onChangeText={handleChange('confirmPhoneNumber')}
                  error={errors.confirmPhoneNumber}
                  containerStyle={styles.containerStyle}
                  keyboardType="phone-pad"
                /> */}
                <CustomInputMask
                  value={values.confirmPhoneNumber}
                  onChangeText={handleChange('confirmPhoneNumber')}
                  placeholder={'Confirm phone number'}
                  keyboardType="phone-pad"
                  error={errors.confirmPhoneNumber}
                />

                {/* <Text style={styles.titleText}>First Name</Text>
                <Input
                  placeholder={'First name'}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  error={errors.firstName}
                  containerStyle={styles.containerStyle}
                />
                <Text style={styles.titleText}>Last Name</Text>
                <Input
                  placeholder={'Last name'}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  error={errors.lastName}
                  containerStyle={styles.containerStyle}
                /> */}

                <Button
                  title1={'Continue'}
                  onPress={handleSubmit}
                  loading={registerResponse.isLoading}
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

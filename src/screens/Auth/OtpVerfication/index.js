import Button from '@components/Button';
import { resendOtp, verifyEmail, verifyPhone } from '@endpoints';
import { usePostApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeVerification from '../../../components/CodeVerification';
import Text from '@components/Text';
import createStyles from './styles';
import { useSelector } from 'react-redux';
import Snackbar from '@components/Snackbar';

export default function OtpVerification(props) {
  const styles = useThemeAwareObject(createStyles);
  const [otpCall, otpResponse] = usePostApiMutation();
  const [sendOtpCall, sendOtpResponse] = usePostApiMutation();
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState('');
  const phoneNo = useSelector(state => state.user.phoneNumber);
  async function handleOtp(value) {
    let form = new FormData();
    form.append('phone', phoneNo);
    form.append('otp', value);
    let apiData = {
      url: verifyPhone,
      method: 'POST',
      data: form,
    };
    try {
      let res = await otpCall(apiData).unwrap();
      if (res.status == 200) {
        setLoader(true);
        setTimeout(() => {
          setLoader(true);

          props.navigation.navigate('InputPassword');
          setLoader(false);
        }, 3000);
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.data?.message);
    }
  }
  async function resendUserOtp() {
    let form = new FormData();
    form.append('phone', phoneNo);

    let apiData = {
      url: resendOtp,
      method: 'POST',
      data: form,
    };
    try {
      let res = await sendOtpCall(apiData).unwrap();
      if (res.status == 200) {
        console.log('res', res);
        setOtp(res?.data?.otp);
        Snackbar('success', `Your Otp code is ${res.data.otp}`);
        // setTimeout(() => {
        //   props.navigation.popToTop();
        // }, 1500);
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.message);
    }
  }
  useEffect(() => {
    resendUserOtp();
  }, []);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.innerContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      {loader ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={styles.borderColor} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={require('../../../../assets/icons/splash.png')}
              style={styles.logoStyle}
            />
            <Text style={styles.infoText}>Create My Account</Text>
          </View>
          <Text style={styles.titleText}>Please Enter the Code Sent to +X (XXX) XXX - XXX </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          >
            <Text style={styles.otpText}>Your Otp code is:</Text>
            <Text style={styles.otpStyle}>{otp}</Text>
          </View>

          <CodeVerification
            verifyCode={value => {
              if (value.length == 6) {
                handleOtp(value);
              }
              // setCode(value);
            }}
          />

          {/* <TouchableOpacity
          style={styles.resendBtn}
          onPress={() => {
            resendUserOtp();
          }}
        >
          {sendOtpResponse.isLoading ? (
            <ActivityIndicator color={styles.loginBtn?.backgroundColor} />
          ) : (
            <Text>Resend Otp</Text>
          )}
        </TouchableOpacity> */}
          {/* <Button
          title1={'Recover Password'}
          onPress={() => {
            if (code.length < 6) {
              Snackbar('error', 'Please enter valid otp');
            } else {
              handleOtp();
            }
          }}
          style={[styles.loginBtn, styles.loginText]}
          loading={otpResponse.isLoading}
        /> */}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}

import Button from '@components/Button';
import Input from '@components/InputField';
import { useThemeAwareObject } from '@theme';
import { wp } from '@utils';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import Header from '../../../components/Header';
import Text from '../../../components/Text';
import createStyles from './styles';

const ChangePassword = props => {
  const styles = useThemeAwareObject(createStyles);
  const [secureText, setsecureText] = useState([{ value: true }, { value: true }, { value: true }]);

  const validationSchema = yup.object().shape({
    // firstName: yup
    //   .string(t("firstName_required"))
    //   .required(t("firstName_required")),
    oldPassword: yup
      .string('Old password is required')
      .min(8, () => 'Password must be at least 7 characters')
      .required('Old password is required'),

    password: yup
      .string('Password is required')
      .required('Password is required')
      .min(8, () => 'Minimum 8 characters. password must contain special characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Minimum 8 characters. password must contain special characters',
      ),
    confirmation: yup
      .string('Confirmation password is required')
      .required('Confirmation password is required')
      .oneOf([yup.ref('password'), null], 'Password does not match'),
  });

  const rightIcon = (value, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          let temp = secureText;
          temp[index - 1].value = !temp[index - 1].value;
          setsecureText([...temp]);
        }}
      >
        <Icons
          name={!secureText[index - 1].value ? 'eye' : 'eye-with-line'}
          size={wp(4.5)}
          color="black"
        ></Icons>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftComponent={() => (
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.leftIcon}>
            <Ionicons
              name={'arrow-undo'}
              size={styles.backIcon.size}
              color={styles.backIcon.color}
            />
          </TouchableOpacity>
        )}
        centerComponent={() => <Text style={styles.textTitle}>Change Password</Text>}
      />

      <View style={styles.innnerContainer}>
        <Formik
          initialValues={{
            oldPassword: '',
            password: '',
            confirmation: '',
          }}
          onSubmit={() => {
            //    updatePassword()
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, values }) => {
            return (
              <View>
                <Text style={styles.tilteText}>Old Password</Text>
                <Input
                  secure={secureText[0].value}
                  placeholder={'Old Password'}
                  value={values.oldPassword}
                  onChangeText={handleChange('oldPassword')}
                  error={errors.oldPassword}
                  rightIcon={rightIcon(secureText.value, 1)}
                  containerStyle={styles.containerStyle}
                />

                <Text style={styles.tilteText}>New Password</Text>
                <Input
                  secure={secureText[1].value}
                  placeholder={'New Password'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  rightIcon={rightIcon(secureText.value, 2)}
                  containerStyle={styles.containerStyle}
                />
                <Text style={styles.tilteText}>Confirm Password</Text>
                <Input
                  secure={secureText[2].value}
                  placeholder={'Confirm Password'}
                  value={values.confirmation}
                  onChangeText={handleChange('confirmation')}
                  error={errors.confirmation}
                  rightIcon={rightIcon(secureText.value, 3)}
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
    </View>
  );
};

export default ChangePassword;

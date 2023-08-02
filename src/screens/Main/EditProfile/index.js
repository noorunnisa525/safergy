import Button from '@components/Button';
import Input from '@components/InputField';
import Snackbar from '@components/Snackbar';
import { baseUrl } from '@constants';
import { getAllergies, updateProfile } from '@endpoints';
import { useParamApiMutation, usePostApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import { wp } from '@utils';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import Header from '../../../components/Header';
import ImageInput from '../../../components/ImagePicker';
import Modal from '../../../components/RnModal';
import Text from '../../../components/Text';
import createStyles from './styles';

const EditProfile = props => {
  const user = useSelector(state => state.user.user);
  const [allergyCall, allergyResponse] = useParamApiMutation(true);
  const [profileCall, profileResponse] = usePostApiMutation();
  const styles = useThemeAwareObject(createStyles);
  const [imagePath, setImagePath] = useState(null);
  const [image, setImage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [allAllergies, setAllAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    let temp = [];
    user?.allergies.map(item => {
      temp.push(item.id);
      setSelectedAllergies(temp);
    });
    fetchAllergies();
    if (user?.profile_image != null) {
      setImage(baseUrl.imageUrl + user?.profile_image);
    }
  }, []);

  useEffect(() => {}, [selectedAllergies]);

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
  async function updateUserProfile(values) {
    let form = new FormData();
    form.append('first_name', values.firstName);
    if (imagePath) {
      form.append('profile_image', imagePath);
    }
    form.append('last_name', values.lastName);
    selectedAllergies.map((item, index) => {
      form.append(`allergies[${index}]`, item);
    });

    let apiData = {
      url: updateProfile,
      method: 'POST',
      data: form,
      token,
    };
    try {
      let res = await profileCall(apiData).unwrap();
      if (res.status == 200) {
        Snackbar('success', 'Profile updated successfully');
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

  const validationSchema = yup.object().shape({
    firstName: yup.string('First name is required').required('First name is required'),
    lastName: yup.string('Last name is required').required('Last name is required'),
  });

  const deleteAccount = () => {
    setDeleteModal(false);
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
        // rightComponent={() => (
        //   <TouchableOpacity
        //     onPress={() => {
        //       setDeleteModal(true);
        //     }}
        //     style={styles.leftIcon}
        //   >
        //     <Ionicons
        //       name={'trash-sharp'}
        //       size={styles.backIcon.size}
        //       color={styles.backIcon.color}
        //     />
        //   </TouchableOpacity>
        // )}
        centerComponent={() => <Text style={styles.textTitle}>Edit Profile</Text>}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ flex: 1 }}>
          {allergyResponse.isLoading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator color={styles.updateBtn.backgroundColor} />
            </View>
          ) : (
            <>
              <View style={styles.containerView}>
                <ImageInput
                  setUri={image => {
                    setImage(image.uri);
                    setImagePath(image);
                  }}
                  uri={
                    image == null
                      ? require('../../../components/ImagePicker/Icons/avatar-placeholder.png')
                      : { uri: image }
                  }
                ></ImageInput>
              </View>
              <View style={styles.bottomContainer}>
                <Formik
                  initialValues={{
                    firstName: user?.first_name,
                    lastName: user?.last_name,
                  }}
                  onSubmit={values => {
                    if (selectedAllergies.length == 0) {
                      Snackbar('error', 'Please select your allergy');
                    } else {
                      updateUserProfile(values);
                    }
                  }}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validationSchema={validationSchema}
                >
                  {({ handleChange, handleSubmit, errors, values }) => {
                    return (
                      <View>
                        <Text style={styles.tilteText}>First Name</Text>
                        <Input
                          placeholder={'First name'}
                          value={values.firstName}
                          onChangeText={handleChange('firstName')}
                          error={errors.firstName}
                          containerStyle={styles.containerStyle}
                        />
                        <Text style={styles.tilteText}>Last Name</Text>
                        <Input
                          placeholder={'Last name'}
                          value={values.lastName}
                          onChangeText={handleChange('lastName')}
                          error={errors.lastName}
                          containerStyle={styles.containerStyle}
                        />

                        <Text style={styles.tilteText}>Allergies</Text>

                        {allAllergies.length > 0 && (
                          <>
                            {/* <TouchableOpacity
                              onPress={() => {
                                setShowAllergyModal(true);
                              }}
                            >
                              {selectedAllergies.length > 0 ? (
                                <View style={styles.selectedList}>
                                  {selectedAllergies.map((item, index) => {
                                    let myIndex = allAllergies.findIndex(data => data.id == item);
                                    return (
                                      <Text key={index}>
                                        {allAllergies[myIndex]?.name}
                                        {index + 1 < selectedAllergies.length ? ',  ' : '.'}
                                      </Text>
                                    );
                                  })}
                                </View>
                              ) : (
                                <Text style={styles.selectedAllergies}>Select Allergies</Text>
                              )}
                            </TouchableOpacity> */}
                            {/* <SelectModal
                              items={allAllergies}
                              preSelected={selectedAllergies}
                              multiple={true}
                              dialogVisible={showAllergyModal}
                              closeModal={() => setShowAllergyModal(false)}
                              onChange={value => {
                                setShowAllergyModal(false);
                                setSelectedAllergies(value);
                              }}
                            /> */}

                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                width: wp(88),
                                alignSelf: 'center',
                              }}
                            >
                              {allAllergies.map(item => {
                                return (
                                  <TouchableOpacity
                                    activeOpacity={1}
                                    key={item.id}
                                    style={[
                                      styles.btnText,
                                      selectedAllergies.includes(item.id) && styles.selectedView,
                                    ]}
                                    onPress={() => {
                                      if (selectedAllergies.includes(item.id)) {
                                        let temp = selectedAllergies.filter(item1 => {
                                          return item1 != item.id;
                                        });
                                        setSelectedAllergies(temp);
                                      } else {
                                        setSelectedAllergies([...selectedAllergies, item.id]);
                                      }

                                      // props.closeModal();
                                      // props.onChange(item.id);
                                    }}
                                  >
                                    <Text
                                      style={
                                        selectedAllergies.includes(item.id)
                                          ? styles.selectedText
                                          : styles.titleText
                                      }
                                    >
                                      {item?.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </View>
                          </>
                        )}

                        <Button
                          title1={'Update'}
                          onPress={handleSubmit}
                          style={[styles.updateBtn, styles.updateText]}
                          loading={profileResponse.isLoading}
                        />
                      </View>
                    );
                  }}
                </Formik>
              </View>
            </>
          )}
        </View>

        <Modal
          close={() => {
            setDeleteModal(false);
          }}
          visible={deleteModal}
        >
          <View style={styles.modalView}>
            <Text style={styles.textDelete}>Delete Account</Text>
            <Text style={styles.textAlert}>
              Are you sure about this? Your account will be deleted in 30 days and you will lose
              access to all your memories.
            </Text>
            <Button
              style={[styles.deleteBtn, styles.deleteText]}
              title1="Delete Account"
              onPress={() => {
                deleteAccount();
              }}
            />
            <Button
              style={[styles.ignoreButton, styles.ignoreText]}
              title1="I'll Do it Later"
              onPress={() => {
                setDeleteModal(false);
              }}
            />
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfile;

import Button from '@components/Button';
import CustomDropDown from '@components/CustomDropdown';
import Input from '@components/InputField';
import MenuCard from '@components/MenuCard';
import Snackbar from '@components/Snackbar';
import { baseUrl } from '@constants';
import { getRestaurantDetail, post_experience } from '@endpoints';
import { usePostApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../../components/CustomAvatar';
import Header from '../../../components/Header';
import Image from '../../../components/Image';
import Modal from '../../../components/RnModal';
import Text from '../../../components/Text';
import createStyles from './styles';
import { hidewelcome, setToken } from '@slices/userSlice';
import { useIsFocused } from '@react-navigation/native';
import { hp } from '@utils';

const ResturantDetail = props => {
  const styles = useThemeAwareObject(createStyles);
  const { data } = props?.route?.params;
  const [detailCall, detailResponse] = usePostApiMutation(true);
  const token = useSelector(state => state.user.token);
  const [menu, setMenu] = useState();
  const [allMenu, setAllMenu] = useState();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.user.user);
  const [comment, setCommentText] = useState('');
  const [postBtn, setPostBtn] = useState(false);
  const [reactionButton, setReactionButton] = useState(false);
  const [reaction, setReaction] = useState();
  const [envButton, setEnvButton] = useState(false);
  const [env, setEnv] = useState();
  const [expButton, setExpButton] = useState(false);
  const [exp, setExp] = useState();
  const [locationValue, setLocationValue] = useState();
  const [menuValue, setMenuValue] = useState();
  const [openLocationPicker, setOpenLocationPicker] = useState(false);
  const [openMenuPicker, setOpenMenuPicker] = useState(false);
  console.log('user', user);
  const [locations, setLocations] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [submitBtn, setSubmitBtn] = useState(false);
  const [includeNameBtn, setIncludeNameBtn] = useState(false);
  const [includePic, setIncludePic] = useState(false);
  const [postCall, postResponse] = usePostApiMutation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused) getResturantDetails();
  }, [isFocused]);
  async function getResturantDetails() {
    let form = new FormData();
    form.append('id', data?.id);
    let apiData = {
      url: getRestaurantDetail,
      method: 'POST',
      data: form,
      token,
    };
    try {
      let res = await detailCall(apiData).unwrap();
      if (res.status == 200) {
        setMenu(res.data);
        setAllMenu(res.data.all_menu);
        let locationsListItem = res?.data?.locations?.map(item => ({
          label: item.name,
          value: item.id,
        }));

        let letAllMenuList = res?.data?.all_menu?.map(item => ({
          label: item.name,
          value: item.id,
        }));
        setLocations(locationsListItem);
        setMenuList(letAllMenuList);
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.message);
    }
  }
  async function postExperience() {
    let form = new FormData();
    form.append('location_id', locationValue?.id);
    form.append('menu_id', menuValue?.id);
    form.append('reaction', reaction.value);
    form.append('allergy_friendly_environment', env.value);
    form.append('experience', exp.value);
    form.append('comments', comment);

    if (includeNameBtn) {
      form.append('include_name', 'yes');
    } else {
      form.append('include_name', 'no');
    }
    if (includePic) {
      form.append('include_picture', 'yes');
    } else {
      form.append('include_picture', 'no');
    }

    let apiData = {
      url: post_experience,
      method: 'POST',
      data: form,
      token,
    };
    try {
      let res = await postCall(apiData).unwrap();
      if (res.status == 200) {
        setPostBtn(false);
        setLocationValue();
        setMenuValue();
        setReaction();
        setEnv();
        setExp();
        setCommentText();
        setReactionButton();
        setEnvButton();
        setExpButton();
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.message);
    }
  }

  const reactionList = [
    { id: 1, title: 'No Reaction', value: 'no_reaction' },
    { id: 2, title: 'Small Reaction', value: 'smal_reaction' },
    { id: 3, title: 'Serious Reaction', value: 'serious_reaction' },
  ];
  const envList = [
    { id: 1, title: 'Yes', value: 'yes' },
    { id: 2, title: 'No', value: 'no' },
    { id: 3, title: 'Unsure', value: 'unsure' },
  ];
  const expList = [
    { id: 1, title: 'Above Average', value: 'above_average' },
    { id: 2, title: 'Average', value: 'average' },
    { id: 3, title: 'Below Average', value: 'below_average' },
  ];
  return (
    <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <Modal
        close={() => {
          setShowModal(false);
        }}
        visible={showModal}
      >
        <View style={styles.modalView}>
          <Avatar
            disabled
            rounded
            image={user?.profile_image ? baseUrl.imageUrl + user?.profile_image : null}
            size="large"
            avatarContainer={styles.avatarImg}
          />
          <Text numberOfLines={1} style={styles.userName}>
            {user?.first_name}
          </Text>

          <Button
            style={[styles.profileButton, styles.modalText]}
            title1="Edit Account"
            onPress={() => {
              setShowModal(false);
              props.navigation.navigate('EditProfile');
            }}
          />
          {/* <Button
            style={[styles.profileButton, styles.modalText]}
            title1="Change Password"
            onPress={() => {
              setShowModal(false);
              props.navigation.navigate('ChangePassword');
            }}
          /> */}

          <Button
            style={[styles.profileButton, styles.modalText]}
            title1="Logout"
            onPress={() => {
              setShowModal(false);
              dispatch(hidewelcome());
              dispatch(setToken(false));
            }}
          />
        </View>
      </Modal>

      <Modal
        close={() => {
          setOpenLocationPicker(false);
        }}
        visible={openLocationPicker}
      >
        <View style={styles.locationModalView}>
          <Text style={styles.modalLocationHeadingText}>Choose location</Text>
          <FlatList
            scrollEnabled={false}
            // contentContainerStyle={{ marginBottom: hp(1) }}
            data={menu?.locations}
            ListEmptyComponent={() => {
              return <Text style={styles.noFood}>{'No location found'}</Text>;
            }}
            renderItem={({ item }) => {
              return (
                <>
                  <Text
                    style={styles.modalLocationText}
                    onPress={() => {
                      setLocationValue(item);
                      setOpenLocationPicker(false);
                    }}
                  >
                    {item.name}
                  </Text>
                </>
              );
            }}
          />
        </View>
      </Modal>
      <Modal
        close={() => {
          setOpenMenuPicker(false);
        }}
        visible={openMenuPicker}
      >
        <View style={styles.locationModalView}>
          <Text style={styles.modalLocationHeadingText}>Choose Item</Text>
          <FlatList
            scrollEnabled={false}
            // contentContainerStyle={{ marginBottom: hp(1) }}
            data={allMenu}
            ListEmptyComponent={() => {
              return <Text style={styles.noFood}>{'No location found'}</Text>;
            }}
            renderItem={({ item }) => {
              return (
                <>
                  <Text
                    style={styles.modalLocationText}
                    onPress={() => {
                      setMenuValue(item);
                      setOpenMenuPicker(false);
                    }}
                  >
                    {item.name}
                  </Text>
                </>
              );
            }}
          />
        </View>
      </Modal>
      <Header
        containerStyle={styles.containerStyle}
        backgroundColor={{ backgroundColor: styles.containerStyle.color }}
        statusbar={{ backgroundColor: styles.containerStyle.color }}
      />
      <View style={styles.headerView}>
        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => props.navigation.popToTop()}
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Image
              resizeMode="contain"
              source={require('../../../../assets/icons/splash.png')}
              style={styles.leftIcon}
            />

            <Image
              resizeMode="contain"
              source={require('../../../../assets/icons/logo.png')}
              style={styles.logoStyle}
            />
          </TouchableOpacity>

          <Avatar
            style={styles.userBtn}
            profile
            image={user?.profile_image ? baseUrl.imageUrl + user?.profile_image : null}
            size="large"
            onPressAvatar={() => {
              setShowModal(true);
            }}
          />
        </View>
      </View>

      {/* <Image style={styles.resturantImage} source={{ uri: baseUrl.imageUrl + data.image }} /> */}

      {detailResponse.isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={styles.profileButton.borderColor} />
        </View>
      ) : (
        <>
          <View style={styles.resturantContainer}>
            <View style={styles.leftResturantContainer}>
              <Image
                resizeMode="cover"
                source={{ uri: baseUrl.imageUrl + menu?.restaurant?.logo }}
                style={styles.logoImage}
              />
              <Text style={styles.resturantName}>{menu?.restaurant?.name} </Text>
            </View>
            <View style={styles.rightResturantContainer}>
              <View>
                <Text style={styles.locationHeadingText}>Locations Near You</Text>
                {menu?.locations.map(item => (
                  <Text numberOfLines={2} style={styles.locationText}>
                    {item.name}
                  </Text>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (menu) {
                    setPostBtn(!postBtn);
                  } else {
                    setPostBtn(false);
                  }
                }}
                style={postBtn ? styles.postBtnSelected : styles.postBtnUnSelected}
              >
                <Text style={postBtn ? styles.selectedFilterText : styles.filterText}>
                  Post Your Experience
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {postBtn ? (
            <>
              <View style={{ zIndex: 300, zIndexReverse: 400 }}>
                <Text style={styles.feedbackText}>Which Location?</Text>
                {/* <TouchableOpacity onPress={() => setOpenLocationPicker(true)}>
                  <Input
                    placeholder={'Select Location'}
                    value={locationValue?.name}
                    onChangeText={() => {
                      openLocationPicker(true);
                    }}
                    editable={false}
                    style={styles.inputText}
                    placeholderTextColor={'black'}
                    inputContainerStyle={styles.dropdownContainerStyle}
                    containerStyle={styles.ContainerInputStyle}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  // style={{ backgroundColor: 'red', zIndex: 100 }}
                  style={styles.locationStyle}
                  onPress={() => setOpenLocationPicker(true)}
                >
                  {locationValue == null ? (
                    <Text style={styles.inputTextPlacholder}>Select Location</Text>
                  ) : (
                    <Text style={styles.inputTextItem}>{locationValue?.name}</Text>
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.feedbackText}>Which Menu Item?</Text>

              <TouchableOpacity
                // style={{ backgroundColor: 'red', zIndex: 100 }}
                style={styles.locationStyle}
                onPress={() => setOpenMenuPicker(true)}
              >
                {menuValue == null ? (
                  <Text style={styles.inputTextPlacholder}>Select Item</Text>
                ) : (
                  <Text style={styles.inputTextItem}>{menuValue?.name}</Text>
                )}
                {/* <View style={styles.dropdownContainerStyle}></View> */}
                {/* <Input
                  placeholder={'Select Item'}
                  value={menuValue?.name}
                  onChangeText={() => {
                    setOpenMenuPicker(true);
                  }}
                  editable={false}
                  style={[styles.inputText, { zIndex: -100 }]}
                  placeholderTextColor={'black'}
                  inputContainerStyle={styles.dropdownContainerStyle}
                  containerStyle={styles.ContainerInputStyle}
                /> */}
              </TouchableOpacity>
              <Text style={styles.feedbackText}>Any Reaction?</Text>

              <View style={styles.tabView}>
                {reactionList.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      setReactionButton(item.id);
                      setReaction(item);
                    }}
                    key={item.id}
                    style={
                      reactionButton == item.id ? styles.selectedFilterView : styles.filterView
                    }
                  >
                    <Text
                      style={
                        reactionButton == item.id ? styles.selectedFilterText : styles.filterText
                      }
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.feedbackText}>Allergy-Friendly Environment?</Text>

              <View style={styles.tabView}>
                {envList.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      setEnvButton(item.id);
                      setEnv(item);
                    }}
                    key={item.id}
                    style={envButton == item.id ? styles.selectedFilterView : styles.filterView}
                  >
                    <Text
                      style={envButton == item.id ? styles.selectedFilterText : styles.filterText}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.feedbackText}>Overall Experience</Text>

              <View style={styles.tabView}>
                {expList.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      setExpButton(item.id);
                      setExp(item);
                    }}
                    key={item.id}
                    style={expButton == item.id ? styles.selectedFilterView : styles.filterView}
                  >
                    <Text
                      style={expButton == item.id ? styles.selectedFilterText : styles.filterText}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.feedbackText}>Comments?</Text>
              <Input
                placeholder={'Click to type'}
                value={comment}
                onChangeText={value => {
                  setCommentText(value);
                }}
                style={styles.commentInputText}
                placeholderTextColor={'black'}
                inputContainerStyle={styles.inputContainer}
              />
              <View style={styles.bottomBtn}>
                <TouchableOpacity
                  onPress={() => {
                    setIncludeNameBtn(!includeNameBtn);
                  }}
                  style={includeNameBtn ? styles.includeBtnSelected : styles.includeBtnUnSelected}
                >
                  <Text style={includeNameBtn ? styles.selectedFilterText : styles.filterText}>
                    Include my name
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIncludePic(!includePic);
                  }}
                  style={includePic ? styles.includePicBtn : styles.includePicBtnUnSelected}
                >
                  <Text
                    style={
                      includePic ? styles.selectedIncludeText : styles.unselectedIncludePicText
                    }
                  >
                    Include Profile Pic
                  </Text>
                </TouchableOpacity>
                <Button
                  style={[
                    submitBtn ? styles.buttonActive : styles.buttonInactive,
                    submitBtn ? styles.activeBtnText : styles.inactiveBtnText,
                  ]}
                  title1="SUBMIT"
                  loading={postResponse.isLoading}
                  loaderOrange
                  onPress={() => {
                    if (
                      locationValue?.id &&
                      menuValue?.id &&
                      reaction?.value &&
                      env?.value &&
                      exp?.value &&
                      comment
                    ) {
                      postExperience();
                    } else {
                      Snackbar('error', 'All fields are required');
                    }
                  }}
                />
              </View>
            </>
          ) : (
            <>
              {menu?.menu?.length ? (
                <>
                  <Text style={styles.textMenu}>Items For You</Text>
                  <FlatList
                    scrollEnabled={false}
                    data={menu?.menu}
                    ListEmptyComponent={() => {
                      return <Text style={styles.noFood}>{'No suitable food for you'}</Text>;
                    }}
                    renderItem={({ item }) => {
                      return (
                        <>
                          <MenuCard
                            onPress={() => {
                              // props.navigation.navigate('RiskView');
                            }}
                            data={item}
                          />
                        </>
                      );
                    }}
                  />
                </>
              ) : null}
              {allMenu?.length ? (
                <>
                  <Text style={styles.textMenu}>Full Menu</Text>
                  <Text style={styles.FeaturedText}>Featured Items</Text>

                  <FlatList
                    scrollEnabled={false}
                    data={allMenu}
                    ListEmptyComponent={() => {
                      return <Text style={styles.noFood}>{'No food matches'}</Text>;
                    }}
                    renderItem={({ item }) => {
                      return (
                        <>
                          <MenuCard
                            onPress={() => {
                              // props.navigation.navigate('RiskView');
                            }}
                            data={item}
                          />
                        </>
                      );
                    }}
                  />
                </>
              ) : null}
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ResturantDetail;

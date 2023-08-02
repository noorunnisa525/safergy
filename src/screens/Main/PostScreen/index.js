import Button from '@components/Button';
import PostCard from '@components/PostCard';
import Snackbar from '@components/Snackbar';
import Text from '@components/Text';
import { baseUrl } from '@constants';
import { getExperience, getUser } from '@endpoints';
import { useIsFocused } from '@react-navigation/native';
import { useParamApiMutation, usePostApiMutation } from '@services';
import { hidewelcome, setToken, setUserAllergies } from '@slices/userSlice';
import { useThemeAwareObject } from '@theme';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../../components/CustomAvatar';
import Header from '../../../components/Header';
import Modal from '../../../components/RnModal';
import createStyles from './styles';

const PostScreen = props => {
  const dispatch = useDispatch();
  const styles = useThemeAwareObject(createStyles);
  const [homeCall, homeResponse] = usePostApiMutation(true);
  const [userDetailCall] = useParamApiMutation();
  const [showModal, setShowModal] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const isFocused = useIsFocused();
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (isFocused) {
      getUserDetail();
      if (selectedFilter == 1) {
        fetchPost(1);
      } else {
        fetchPost(2);
      }
      // setSelectedTab({ id: 1, title: 'Posts For You' });
    }
  }, [isFocused]);

  const filterKeys = [
    { id: 1, title: 'Posts For You' },
    { id: 2, title: 'All Posts' },
  ];
  const [selectedTab, setSelectedTab] = useState(filterKeys[0]);
  async function fetchPost(id) {
    let data = {
      filter: id == 1 ? 'for_you' : 'all',
    };
    let apiData = {
      url: getExperience,
      method: 'POST',
      data,
      token,
    };
    try {
      let res = await homeCall(apiData).unwrap();
      if (res.status == 200) {
        if (res?.data) {
          setAllPosts(res?.data);
        }
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.message);
    }
  }
  async function getUserDetail() {
    let apiData = {
      url: getUser,
      method: 'GET',
      token,
    };
    try {
      let res = await userDetailCall(apiData).unwrap();
      if (res.status == 200) {
        console.log('res.data', res.data);
        dispatch(setUserAllergies(res.data));
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.data?.message);
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
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
      <Header
        containerStyle={styles.containerStyle}
        backgroundColor={{ backgroundColor: styles.containerStyle.color }}
        statusbar={{ backgroundColor: styles.containerStyle.color }}
      />
      <View style={styles.headerView}>
        <View style={styles.rowView}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('Home')}
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

        {/* <View style={styles.searchRow}>
          <Input
            placeholder={'Search'}
            value={search}
            onChangeText={value => {
              searchResturant(value);
              setSearch(value);
            }}
            style={styles.inputText}
            leftIcon={() => (
              <Icon style={styles.marginRight} name={'search1'} size={wp(4.5)} color="black"></Icon>
            )}
            placeholderTextColor={'red'}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.inputContainerStyle}
          />
          <TouchableOpacity
            style={showMap ? styles.mapBtnWithBackground : styles.mapBtn}
            onPress={() => {
              if (latitude) {
                setShowMap(!showMap);
                Keyboard.dismiss();
              }
            }}
          >
            <Text style={showMap ? styles.textViewWhite : styles.textView}>
              {showMap ? 'View List' : 'View Map'}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.tabView}>
        {filterKeys.map(item => (
          <TouchableOpacity
            onPress={() => {
              if (item?.id == 1 || item?.id == 2) {
                setSelectedFilter(item?.id);
                setSelectedTab(item);
                fetchPost(item?.id);
              } else {
                setSelectedFilter(item?.id);
                setSelectedTab(item);
                setAllPosts([]);
              }
            }}
            key={item.id}
            style={selectedFilter == item.id ? styles.selectedFilterView : styles.filterView}
          >
            <Text style={selectedFilter == item.id ? styles.selectedFilterText : styles.filterText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {homeResponse.isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={styles.profileButton.borderColor} />
        </View>
      ) : (
        <>
          {showWarningAlert ? (
            <>
              <Text style={styles.noPermission}>
                {
                  'You have denied the location permission, Please enable it from the setting section in your phone'
                }
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openSettings();
                }}
                style={styles.textEnable}
              >
                <Text>Enable</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.tabTitle}>{selectedTab.title}</Text>
              {selectedFilter == 2 && (
                <Text style={styles.avoidText}>Click to browse all posts{'\n'} </Text>
              )}

              {selectedFilter == 1 && (
                <>
                  <Text style={styles.avoidText}>
                    Click to browse posts from other users who avoid{'\n'}{' '}
                  </Text>

                  <View style={styles.allergyContainer}>
                    {user?.allergies &&
                      user?.allergies.length > 0 &&
                      user?.allergies.map(item => {
                        return (
                          <Text key={item.id} style={styles.allergyText}>
                            &bull; {item.name}{' '}
                          </Text>
                        );
                      })}
                  </View>
                </>
              )}

              <FlatList
                data={allPosts?.experience?.data}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => {
                  return (
                    <View style={styles.noDataView}>
                      <Text style={styles.noResturant}>{'No posts found'}</Text>
                    </View>
                  );
                }}
                contentContainerStyle={styles.flatlistContainerStyle}
                renderItem={({ item, index }) => {
                  return (
                    <PostCard
                      index={index}
                      onPress={() =>
                        props.navigation.navigate('PostDetail', {
                          data: item,
                        })
                      }
                      name={item?.user?.first_name + ' ' + item?.user?.last_name}
                      address={item?.menu?.restaurant?.location}
                      // certified={item?.certified}
                      image={item?.menu?.restaurant?.image}
                      logo={item?.menu?.restaurant?.logo}
                    />
                  );
                }}
              />
            </>
          )}
        </>
      )}
    </KeyboardAwareScrollView>
  );
};

export default PostScreen;

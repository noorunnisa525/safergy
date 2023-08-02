import Button from '@components/Button';
import Input from '@components/InputField';
import ResturantCard from '@components/ResturantCard';
import Snackbar from '@components/Snackbar';
import Text from '@components/Text';
import { baseUrl } from '@constants';
import { getRestaurants, getUser } from '@endpoints';
import { useIsFocused } from '@react-navigation/native';
import { useParamApiMutation, usePostApiMutation } from '@services';
import { hidewelcome, setToken, setUserAllergies } from '@slices/userSlice';
import { useThemeAwareObject } from '@theme';
import { wp, hp } from '@utils';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  FlatList,
  Image,
  Keyboard,
  Linking,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Icons from '../../../../assets/Icons';
import Avatar from '../../../components/CustomAvatar';
import Header from '../../../components/Header';
import Modal from '../../../components/RnModal';
import createStyles from './styles';

const Home = props => {
  const dispatch = useDispatch();
  const styles = useThemeAwareObject(createStyles);
  const [homeCall, homeResponse] = usePostApiMutation(true);
  const [userDetailCall] = useParamApiMutation();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locationPermission, setPermission] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [allResturants, setAllResturants] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const isFocused = useIsFocused();
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.user);
  const appState = useRef(AppState.currentState);
  const [load, setLoad] = useState(true);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    if (isFocused) {
      getUserDetail();
    }
  }, [isFocused, appState.current]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current == 'active') {
        hasLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const filterKeys = [
    { id: 1, title: 'Restaurants For You' },
    { id: 2, title: 'SAFErgy Certified' },
    { id: 3, title: 'All Restaurants' },
  ];
  const [selectedTab, setSelectedTab] = useState(filterKeys[0]);

  async function fetchResturant(lat, lng, id) {
    setAllResturants([]);
    setFilterData([]);

    let data = {
      filter: id == 1 ? 'location' : id == 2 ? 'certified' : 'all',
      latitude: id == 1 || id == 3 ? lat : null,
      longitude: id == 1 || id == 3 ? lng : null,
    };

    console.log('data', data);
    let apiData = {
      url: getRestaurants,
      method: 'POST',
      data,
      token,
    };
    try {
      let res = await homeCall(apiData).unwrap();
      setLoad(false);
      if (res.status == 200) {
        if (res?.data?.data.length > 0) {
          setAllResturants(res?.data?.data);
          setFilterData(res?.data?.data);
        }
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      setLoad(false);
      Snackbar('error', e?.error ?? e?.data?.message);
    }
  }
  useEffect(() => {
    if (isFocused) {
      if (latitude && longitude && selectedFilter) {
        fetchResturant(latitude, longitude, selectedFilter);
      }
      // setLoad(true);
    }
  }, [isFocused]);

  async function getUserDetail() {
    let apiData = {
      url: getUser,
      method: 'GET',
      token,
    };
    try {
      let res = await userDetailCall(apiData).unwrap();
      if (res.status == 200) {
        dispatch(setUserAllergies(res.data));
      } else {
        Snackbar('error', res.message);
      }
    } catch (e) {
      Snackbar('error', e?.error ?? e?.data?.message);
    }
  }

  useEffect(() => {
    hasLocationPermission();
    if (locationPermission) {
      getLocation();
    }
  }, [locationPermission]);

  async function hasPermissionIOS() {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      setPermission(true);
      return true;
    }

    if (status === 'denied') {
      setPermission(false);
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      setPermission(false);
      Alert.alert('Turn on Location Services to allow the app to determine your location.', '', [
        { text: 'Go to Settings', onPress: openSetting },
        {
          text: "Don't Use Location",
          onPress: () => {
            setPermission(false);
          },
        },
      ]);
    }
    return false;
  }
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      setPermission(true);
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      setPermission(true);
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      setPermission(false);
      hasLocationPermission();
      // ToastAndroid.show(
      //   'Location permission denied by user.',
      //   ToastAndroid.LONG,
      // );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      setShowWarningAlert(true);
      // hasLocationPermission();
      // ToastAndroid.show(
      //   'Location permission revoked by user.',
      //   ToastAndroid.LONG,
      // );
    }
    return false;
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setShowWarningAlert(false);

        if (position?.coords?.latitude) {
          setLatitude(position?.coords?.latitude);
          setLongitude(position?.coords?.longitude);
          // let lat = position?.coords?.latitude;
          // let lng = position?.coords?.longitude;
          // dispatch(updateLatLng({ lat, lng }));
          // getData({ lat, lng });

          fetchResturant(position?.coords?.latitude, position?.coords?.longitude, 1);
        }
      },
      error => {
        setShowWarningAlert(true);

        //FIXME: remove function below
        console.log('error...> ', error);
        // setLatitude(userData?.lat);
        // setLongitude(userData?.lng);

        // dispatch(updateLatLng({ lat, lng }));
        // getData({ lat, lng });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const searchResturant = value => {
    if (value.length) {
      let term = value.toLowerCase();
      let obj = allResturants.filter(
        item =>
          item?.name.toLowerCase().indexOf(term) > -1 ||
          item?.name.toLowerCase().indexOf(term) > -1,
      );
      setFilterData(obj);
    } else {
      setFilterData(allResturants);
    }
  };

  const mapStyle = [
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.attraction',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.attraction',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.attraction',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
        {
          weight: 2,
        },
      ],
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.business',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.business',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },

    {
      featureType: 'poi.government',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.government',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.government',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.medical',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.medical',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.medical',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.place_of_worship',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.place_of_worship',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.place_of_worship',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.school',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.school',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.school',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.sports_complex',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.sports_complex',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.sports_complex',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    styles.map,
  ];
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
          </View>

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

        <View style={styles.searchRow}>
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
        </View>
      </View>

      <View style={styles.tabView}>
        {filterKeys.map(item => (
          <TouchableOpacity
            onPress={() => {
              if (item?.id == 1 || item?.id == 3) {
                setSelectedFilter(item?.id);
                setSelectedTab(item);
                fetchResturant(latitude, longitude, item.id);
                setLoad(true);
                if (item.id != selectedFilter) {
                  setSearch('');
                }
              } else if (item?.id == 2) {
                setSelectedFilter(item?.id);
                setSelectedTab(item);
                setLoad(true);
                fetchResturant(latitude, longitude, item.id);
              } else {
                setSelectedFilter(item?.id);
                setSelectedTab(item);
                setLoad(true);
                setFilterData([]);
                setAllResturants([]);
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
      {load ? (
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
              {showMap ? (
                <View style={styles.mapView}>
                  <MapView
                    showsUserLocation
                    // provider={PROVIDER_GOOGLE}
                    style={mapStyle}
                    initialRegion={{
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    {filterData.length > 0 &&
                      filterData.map((item, index) => {
                        return (
                          <>
                            {item?.latitude ? (
                              <Marker
                                key={index}
                                pointerEvents="auto"
                                coordinate={{
                                  latitude: parseFloat(item?.latitude),
                                  longitude: parseFloat(item?.longitude),
                                }}
                                tracksViewChanges={false}
                                onPress={() => {
                                  props.navigation.navigate('RestaurantDetail', {
                                    data: item,
                                  });
                                }}
                              >
                                <ImageBackground
                                  source={require('../../../../assets/icons/pinImg.png')}
                                  style={styles.imgBackground}
                                  resizeMode="contain"
                                >
                                  <Image
                                    resizeMode="contain"
                                    source={
                                      item?.logo
                                        ? {
                                            uri: baseUrl.imageUrl + item?.logo,
                                          }
                                        : require('../../../../assets/icons/foodPin.png')
                                    }
                                    style={styles.imgStyle}
                                  />
                                </ImageBackground>
                              </Marker>
                            ) : null}
                          </>
                        );
                      })}
                  </MapView>
                </View>
              ) : (
                <>
                  <Text style={styles.tabTitle}>{selectedTab.title}</Text>
                  {selectedTab?.id == 2 ? (
                    <View style={styles.certifiedTab}>
                      <Image
                        source={require('../../../../assets/icons/certifiedLogo.png')}
                        style={{ width: wp(50), height: hp(23), marginTop: hp(6) }}
                        resizeMode="contain"
                      />
                      <Image
                        source={require('../../../../assets/icons/certifiedTextImg.png')}
                        style={{ width: wp(50), height: hp(20) }}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <FlatList
                      data={filterData}
                      showsHorizontalScrollIndicator={false}
                      ListEmptyComponent={() => {
                        return (
                          <View style={styles.noDataView}>
                            <Text style={styles.noResturant}>{'No resturant found'}</Text>
                          </View>
                        );
                      }}
                      contentContainerStyle={styles.flatlistContainerStyle}
                      renderItem={({ item, index }) => {
                        return (
                          <ResturantCard
                            index={index}
                            onPress={() =>
                              props.navigation.navigate('RestaurantDetail', {
                                data: item,
                              })
                            }
                            name={item?.name}
                            address={item?.location?.name}
                            certified={item?.certified}
                            image={item?.image}
                            logo={item?.logo}
                          />
                        );
                      }}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </KeyboardAwareScrollView>
  );
};

export default Home;

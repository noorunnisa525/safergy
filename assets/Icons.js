import { wp } from '@utils';
import React from 'react';
import { Image } from 'react-native';
import rightArrow from './icons/rightArrow.png';
import user from './icons/user.png';
import profile from './icons/profile.png';
import mapPin from './icons/mapPin.png';
import cerified from './icons/cerified.png';
import foodPin from './icons/foodPin.png';
import homeActive from './icons/homeActive.png';
import homeInactive from './icons/homeInactive.jpg';
import searchActive from './icons/searchActive.png';
import searchInactive from './icons/searchInactive.jpg';
import PostActive from './icons/PostActive.png';
import PostInActive from './icons/PostInActive.png';
import scan from './icons/scan.png';
import plusIcon from './icons/plusIcon.png';
import cross from './icons/cross.png';

const Icons = {
  RightArrow: (style = {}) => (
    <Image source={rightArrow} style={{ ...styles.longIcon, ...style }} />
  ),
  User: style => <Image source={user} style={{ ...styles.userStyle, ...style }} />,
  Profile: style => <Image source={profile} style={{ ...styles.profileStyle, ...style }} />,
  MapPin: (style = {}) => <Image source={mapPin} style={{ ...styles.pinStyle, ...style }} />,
  Cerified: (style = {}) => (
    <Image source={cerified} style={{ ...styles.cerifiedStyle, ...style }} />
  ),
  FoodPin: (style = {}) => <Image source={foodPin} style={{ ...styles.foodStyle, ...style }} />,
  CrossIcon: (style = {}) => <Image source={cross} style={{ ...styles.crossStyle, ...style }} />,

  homeActive: (style = {}) => (
    <Image source={homeActive} style={{ ...styles.crossStyle, ...style }} />
  ),
  homeInactive: (style = {}) => (
    <Image source={homeInactive} style={{ ...styles.crossStyle, ...style }} />
  ),
  searchActive: (style = {}) => (
    <Image source={searchActive} style={{ ...styles.activeStyle, ...style }} />
  ),
  searchInactive: (style = {}) => (
    <Image source={searchInactive} style={{ ...styles.crossStyle, ...style }} />
  ),
  PostActive: (style = {}) => (
    <Image source={PostActive} style={{ ...styles.crossStyle, ...style }} />
  ),
  PostInActive: (style = {}) => (
    <Image source={PostInActive} style={{ ...styles.crossStyle, ...style }} />
  ),

  scan: (style = {}) => <Image source={scan} style={{ ...styles.crossStyle, ...style }} />,
  plusIcon: (style = {}) => <Image source={plusIcon} style={{ ...styles.crossStyle, ...style }} />,
};

export default Icons;
const styles = {
  logoStyle: {
    height: wp(20),
    width: wp(40),
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  longIcon: {
    height: wp(5),
    width: wp(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  defaultStyle: {
    height: wp(4.5),
    width: wp(4.5),
    resizeMode: 'contain',
  },
  cerifiedStyle: {
    height: wp(4.5),
    width: wp(30),
    resizeMode: 'contain',
  },
  foodStyle: {
    height: wp(6),
    width: wp(6),
    resizeMode: 'contain',
    tintColor: '#ED4232',
  },
  crossStyle: { height: wp(6), width: wp(6), resizeMode: 'contain' },
  activeStyle: { height: wp(7), width: wp(7), resizeMode: 'contain' },
  homeStyle: {
    height: wp(5),
    width: wp(5),
    resizeMode: 'contain',
  },
  pinStyle: {
    height: wp(5),
    width: wp(5),
    resizeMode: 'contain',
  },
  userStyle: {
    height: wp(15),
    width: wp(15),
    resizeMode: 'contain',
  },
  profileStyle: {
    height: wp(10),
    width: wp(10),
    resizeMode: 'contain',
  },
  heartStyle: {
    height: wp(8.5),
    width: wp(8.5),
    resizeMode: 'contain',
  },
};

import Button from '@components/Button';
import { baseUrl } from '@constants';
import { usePostApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/CustomAvatar';
import Header from '../../../components/Header';
import Image from '../../../components/Image';
import Modal from '../../../components/RnModal';
import Text from '../../../components/Text';
import createStyles from './styles';

const PostDetail = props => {
  const styles = useThemeAwareObject(createStyles);
  const [detailCall, detailResponse] = usePostApiMutation(true);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.user.user);
  const [submitBtn, setSubmitBtn] = useState(false);

  const Data = props?.route?.params?.data;

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
      </View>
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
                source={{ uri: baseUrl.imageUrl + Data?.menu?.restaurant?.logo }}
                style={styles.logoImage}
              />
              <Text style={styles.resturantName}>{Data?.menu?.restaurant?.name} </Text>
            </View>
            {console.log('Data', Data?.user?.profile_image)}
            <View style={styles.rightResturantContainer}>
              <Image
                resizeMode="cover"
                source={
                  user?.profile_image && Data?.include_picture == 'yes'
                    ? { uri: baseUrl.imageUrl + Data?.user?.profile_image }
                    : require('../../../../assets/icons/postPic.png')
                }
                style={styles.postPicImg}
              />
              <View>
                <Text numberOfLines={1} style={styles.locationHeadingText}>
                  {Data?.include_name == 'yes'
                    ? Data?.user?.first_name + ' ' + Data?.user?.last_name
                    : 'Safergy user'}
                </Text>
              </View>
            </View>
          </View>
          {console.log('Data?.menu', Data)}
          <>
            <Text numberOfLines={1} style={styles.menuSubHeading}>
              {'\u2022'} Location: <Text style={styles.textMenu}>{Data?.location?.name}</Text>
            </Text>
            <Text numberOfLines={1} style={styles.menuSubHeading}>
              {'\u2022'} Menu Item: <Text style={styles.textMenu}>{Data?.menu?.name}</Text>
            </Text>
            <Text numberOfLines={1} style={styles.menuSubHeading}>
              {'\u2022'} Reaction:{' '}
              <Text style={styles.textMenu}>
                {Data?.reaction == 'smal_reaction'
                  ? 'Small Reaction'
                  : Data?.reaction == 'no_reaction'
                  ? 'No Reaction'
                  : 'Serious Reaction'}
              </Text>
            </Text>

            <Text numberOfLines={1} style={styles.menuSubHeading}>
              {'\u2022'} Allergy-Friendly Environment:{' '}
              <Text style={styles.textMenu}>{Data?.allergy_friendly_environment}</Text>
            </Text>

            <Text numberOfLines={1} style={styles.menuSubHeading}>
              {'\u2022'} Overall Experience:{' '}
              <Text style={styles.textMenu}>
                {Data?.experience == 'above_average'
                  ? 'Above average'
                  : Data?.reaction == 'average'
                  ? 'Average'
                  : 'Below Average'}
              </Text>
            </Text>

            {Data?.comments && <Text style={styles.commentText}>Comments:</Text>}
            {Data?.comments && <Text style={styles.inputContainer}>{Data?.comments}</Text>}
            <View style={styles.bottomBtn}>
              <TouchableOpacity
                onPress={() => props?.navigation.goBack()}
                style={submitBtn ? styles.selectedFilterView : styles.filterView}
              >
                <Text style={submitBtn ? styles.selectedFilterText : styles.filterText}>Close</Text>
              </TouchableOpacity>
            </View>
          </>
        </>
      )}
    </ScrollView>
  );
};

export default PostDetail;

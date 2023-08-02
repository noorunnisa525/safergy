/* eslint-disable no-useless-escape */
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Text from '@components/Text';
import { setOnboard } from '@slices/userSlice';
import { useThemeAwareObject } from '@theme';
import createStyles from './styles';

export default function Onboarding() {
  const styles = useThemeAwareObject(createStyles);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatlistRef = useRef();

  const onboardingData = [
    {
      id: 0,
      heading: t('lawyer_office'),
      name: t('lawyer_name'),
    },
    {
      id: 1,
      heading: t('lawyer_office'),
      name: t('lawyer_name'),
      subHeading: t('latest_development'),
    },
  ];

  return (
    <FlatList
      contentContainerStyle={styles.mainContainer}
      ref={flatlistRef}
      inverted={i18n.language == 'ar' && true}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={event => {
        const index = Math.floor(
          Math.floor(event.nativeEvent.contentOffset.x) /
            Math.floor(event.nativeEvent.layoutMeasurement.width),
        );
        setCurrentIndex(index);
      }}
      data={onboardingData}
      snapToInterval={Dimensions.get('window').width}
      snapToAlignment="start"
      decelerationRate="fast"
      disableIntervalMomentum
      renderItem={({ index }) => {
        return (
          <>
            <View style={styles.mainContainer}>
              {index == 1 && (
                <View style={styles.bottomView}>
                  <Text style={styles.headingText}>{t('lawyer_office')}</Text>
                  <Text style={styles.nameText}>{t('lawyer_name')}</Text>
                  <Text style={styles.subHeadingText}>{t('latest_development')}</Text>
                </View>
              )}
            </View>
            <View style={[styles.buttonView, i18n.language == 'ar' && styles.arabicButton]}>
              <Text
                style={[styles.proceedText, index == 0 && styles.proceedWhiteText]}
                onPress={() => {
                  if (index == 1) {
                    dispatch(setOnboard(false));
                  } else {
                    let screenIndex = index;
                    screenIndex += 1;
                    flatlistRef.current.scrollToIndex({
                      animated: true,
                      index: screenIndex,
                    });
                    setCurrentIndex(screenIndex);
                  }
                }}
              >
                {t('proceed')}
              </Text>
              <FlatList
                contentContainerStyle={[
                  styles.paginationContainer,
                  i18n.language == 'ar' && styles.arabicButton,
                ]}
                data={new Array(2)}
                renderItem={({ index }) => {
                  return (
                    <View
                      style={[
                        styles.paginationDot,
                        currentIndex == index && styles.activePagination,
                      ]}
                    />
                  );
                }}
              />
              <Text
                onPress={() => {
                  dispatch(setOnboard(false));
                }}
                style={styles.skipText}
              >
                {t('skip')}
              </Text>
            </View>
          </>
        );
      }}
    />
  );
}

import { colors } from '@constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/Main/Home';
import PostScreen from '@screens/Main/PostScreen';
import PremiumScreen from '@screens/Main/Premium';
import SafergyPlus from '@screens/Main/SafergyPlus';
import SearchScreen from '@screens/Main/SearchScreen';
import * as React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Tab.Navigator
        options={() => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,

          unmountOnBlur: false,
        })}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarAllowFontScaling: false,
          tabBarActiveTintColor: colors.tangelo,

          tabBarStyle: {
            // height: hp(5),
            backgroundColor: colors.white,
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            unmountOnBlur: !false,
            tabBarLabel: ' ',
            tabBarIcon: ({ focused, color, size }) => (
              <Octicons name="home" color={focused ? color : 'black'} size={size} />
            ),
          }}

          // options={{
          //   unmountOnBlur: !false,
          //   tabBarLabel: '',
          //   tabBarIcon: ({ focused }) => (focused ? Icons.homeActive() : Icons.homeInactive()),
          // }}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          inactiveTintColor={'red'}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="search" color={focused ? color : 'black'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PostScreen"
          component={PostScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name="file-document-multiple-outline"
                color={focused ? color : 'black'}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="PremiumScreen"
          component={PremiumScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name="line-scan"
                color={focused ? color : 'black'}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SafergyPlus"
          component={SafergyPlus}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused, color, size }) => (
              <Octicons name="plus" color={focused ? color : 'black'} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default function TabNavigator() {
  return <MyTabs />;
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '@screens/Auth/ForgotPassword';
import Login from '@screens/Auth/Login';
import OtpVerification from '@screens/Auth/OtpVerfication';
import RecoverPassword from '@screens/Auth/RecoverPassword';
import Signup from '@screens/Auth/Signup';
import welcome from '@screens/Auth/welcome';
import ChangePassword from '@screens/Main/ChangePassword';
import EditProfile from '@screens/Main/EditProfile';
import HomeScreen from '@screens/Main/Home';
import RestaurantDetail from '@screens/Main/RestaurantDetail';
import RiskView from '@screens/Main/RiskView';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME, useTheme } from '../theme';
import TabNavigator from './TabNavigator';
import InputPassword from '@screens/Auth/Signup/InputPassword';
import Allergies from '@screens/Auth/Signup/Allergies';
import IntolerantOrAllergic from '@screens/Auth/Signup/IntolerantOrAllergic';
import UserProfile from '@screens/Auth/Signup/UserProfile';
import PostDetail from '@screens/Main/PostDetail';

const Stack = createStackNavigator();

const AppStack = () => {
  const showwelcome = useSelector(state => state.user.showwelcome);

  return (
    <Stack.Navigator
      // initialRouteName={showwelcome ? 'welcome' : 'TabNavigator'}
      initialRouteName={'Welcome'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={welcome} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="RiskView" component={RiskView} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="InputPassword" component={InputPassword} />
      <Stack.Screen name="Allergies" component={Allergies} />
      <Stack.Screen name="IntolerantOrAllergic" component={IntolerantOrAllergic} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="Welcome" component={welcome} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  const token = useSelector(state => state.user.token);

  const colorScheme = useColorScheme();
  let { setTheme } = useTheme();

  React.useEffect(() => {
    if (colorScheme == 'dark') {
      setTheme(DEFAULT_DARK_THEME);
    } else {
      setTheme(DEFAULT_LIGHT_THEME);
    }
  }, [colorScheme]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {token ? (
          <Stack.Screen name="AppStack" component={AppStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

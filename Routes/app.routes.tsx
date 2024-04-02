import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsList from '../components/Pages/JobsList';
import { Feather } from '@expo/vector-icons';
import { SignInRoutes } from '../Routes/signIn.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false , tabBarStyle: {backgroundColor: '#eb5e28'} }}>
        <Screen
          name="Login"
          component={SignInRoutes}
          options={{
            tabBarIcon: () => {
              return <Feather name="home" size={25} color="black" />;
            },
          }}
        />

        <Screen
          name="JobsList"
          component={JobsList}
          options={{
            tabBarIcon: () => {
              return <Feather name="search" size={25} color="black" />;
            },
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

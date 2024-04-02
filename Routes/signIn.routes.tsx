import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../components/Pages/SignIn';
import Login from '../components/Pages/Login';

const Stack = createStackNavigator();

export function SignInRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: 'Cadastre-se' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import JobCreate from '../components/Pages/RecruiterPages/JobCreate';
import MyOpportunities from '../components/Pages/RecruiterPages/MyOpportunities';
import Reply from '../components/Pages/RecruiterPages/Reply';
import { createStackNavigator } from "@react-navigation/stack";
import RecruiterHome from '../components/Pages/RecruiterPages/RecruiterHome';

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator();

function Routes() {
  return (
    <Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#7ac6c0' }, tabBarLabelStyle: { color: 'black' } }}>
      <Screen
        name="Criar Vaga"
        component={RecruiterHome}
        options={{
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="home" size={24} color="black" />;
          },
        }}
      />

      <Screen
        name="Minhas Vagas"
        component={MyOpportunities}
        options={{
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="briefcase-search" size={24} color="black" />;
          },
        }}
      />
            <Screen
        name="Responder Inscrições"
        component={Reply}
        options={{
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="reply-circle" size={24} color="black" />;
          },
        }}
      />
    </Navigator>

  );
}

export function RecruiterRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="recruiter"
        component={Routes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create"
        component={JobCreate}
        options={{ headerShown: true , headerTitle: "Criar Vaga" }}
      />
    </Stack.Navigator>
  );
}

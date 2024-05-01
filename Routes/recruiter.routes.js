import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsList from '../components/Pages/UserPages/JobsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyApplies from '../components/Pages/UserPages/MyApplies';
import JobCreate from '../components/Pages/RecruiterPages/JobCreate';
import MyOpportunities from '../components/Pages/RecruiterPages/MyOpportunities';

const { Navigator, Screen } = createBottomTabNavigator();

export function RecruiterRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#7ac6c0' }, tabBarLabelStyle: { color: 'black' } }}>
      <Screen
        name="Criar Vaga"
        component={JobCreate}
        options={{
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="briefcase-plus" size={24} color="black" />;
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
    </Navigator>
  );
}

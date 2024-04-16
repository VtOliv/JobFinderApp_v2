import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsList from '../components/Pages/UserPages/JobsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyApplies from '../components/Pages/UserPages/MyApplies';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#7ac6c0' }, tabBarLabelStyle: { color: 'black' } }}>
      <Screen
        name="JobsList"
        component={JobsList}
        options={{
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="format-list-text" size={24} color="black" />;
          },
        }}
      />

      <Screen
        name="Minhas Candidaturas"
        component={MyApplies}
        options={{
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="briefcase-check-outline" size={24} color="black" />;
          },
        }}
      />
    </Navigator>
  );
}

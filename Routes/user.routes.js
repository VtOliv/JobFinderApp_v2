import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JobsList from "../components/Pages/UserPages/JobsList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyApplies from "../components/Pages/UserPages/MyApplies";
import MyProfile from "../components/Pages/UserPages/MyProfile";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../components/Pages/UserPages/EditProfile";
import ApplyPage from "../components/Pages/UserPages/ApplyPage";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator();

function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#7ac6c0" },
        tabBarLabelStyle: { color: "black" },
      }}
    >
      <Screen
        name="Vagas"
        component={JobsList}
        options={{
          tabBarIcon: () => {
            return (
              <MaterialCommunityIcons
                name="format-list-text"
                size={24}
                color="black"
              />
            );
          },
        }}
      />

      <Screen
        name="Minhas Candidaturas"
        component={MyApplies}
        options={{
          tabBarIcon: () => {
            return (
              <MaterialCommunityIcons
                name="briefcase-check-outline"
                size={24}
                color="black"
              />
            );
          },
        }}
      />

      <Screen
        name="Meu Perfil"
        component={MyProfile}
        options={{
          tabBarIcon: () => {
            return (
              <MaterialCommunityIcons
                name="account-circle"
                size={24}
                color="black"
              />
            );
          },
        }}
      />
    </Navigator>
  );
}

export function UserRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="user"
        component={Routes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="apply"
        component={ApplyPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="edit"
        component={EditProfile}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: true, headerTitle: "Meu Perfil" }}
      />
    </Stack.Navigator>
  );
}

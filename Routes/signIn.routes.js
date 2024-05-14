import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../components/Pages/CommonPages/SignIn";
import Login from "../components/Pages/CommonPages/Login";
import { UserRoutes } from "./user.routes";
import { RecruiterRoutes } from "./recruiter.routes";
import AppLogo from "../components/Pages/CommonPages/AppLogo";
import Navbar from "../components/Pages/UserPages/UserNav";

const Stack = createStackNavigator();

export function SignInRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: "Cadastre-se" }}
      />
      <Stack.Screen
        name="Navbar"
        component={Navbar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserLoggedIn"
        component={UserRoutes}
        options={{ title: "UserRoutes" }}
      />
      <Stack.Screen
        name="RecruiterLoggedIn"
        component={RecruiterRoutes}
        options={{ title: "RecruiterRoutes" }}
      />
    </Stack.Navigator>
  );
}

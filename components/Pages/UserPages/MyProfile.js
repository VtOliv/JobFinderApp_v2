import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { userDataURL } from "../index";
import { ModalStyles, MyProfileStyles } from "../Styles";
import Navbar from "./UserNav";

export default function MyProfile({ navigation, route }) {
  const { getItem } = useAsyncStorage("id");
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const id = await getItem();
      const response = await fetch(`${userDataURL}${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData != null) {
      return;
    }

    fetchData();
  }, [userData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [fetchData]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Navbar navigation={navigation} />
      <View style={MyProfileStyles.header}>
        {isLoading ? (
          <ActivityIndicator size="large" color={"#057a5f"} />
        ) : (
          <View>
            {userData && (
              <>
                <Image
                  source={require("../../../assets/snack-icon.png")}
                  style={MyProfileStyles.profileImage}
                />
                <Text style={MyProfileStyles.title}>{userData.name}</Text>
                <Text style={MyProfileStyles.text}>{userData.email}</Text>
                <Text style={MyProfileStyles.text}>{userData.phoneNumber}</Text>
                <Text style={MyProfileStyles.text}>{userData.address}</Text>
                <TouchableOpacity
                  style={[ModalStyles.button, ModalStyles.buttonClose]}
                  onPress={() => navigation.navigate('edit')}
                  disabled
                >
                  <Text style={ModalStyles.textStyle}>Editar perfil</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>

      <View>
        <Text style={MyProfileStyles.sectionTitle}>Experiência</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#7ac6c0" />
        ) : (
          <View>
            {userData &&
              userData.previousWorks &&
              userData.previousWorks.map((item, index) => (
                <View style={MyProfileStyles.header} key={index}>
                  <Text style={MyProfileStyles.title}>{item.jobName}</Text>
                  <Text style={MyProfileStyles.text}>{item.companyName}</Text>
                  <Text style={MyProfileStyles.text}>{item.period}</Text>
                </View>
              ))}
          </View>
        )}
      </View>

      <Text style={MyProfileStyles.sectionTitle}>Escolaridade</Text>
      {isLoading ? (
        <ActivityIndicator color={"#057a5f"} size={"small"} />
      ) : (
        <View>
          {userData &&
            userData.knowledge &&
            userData.knowledge.map((item, index) => (
              <View style={MyProfileStyles.header} key={index}>
                <Text style={MyProfileStyles.title}>{item.name}</Text>
                <Text style={MyProfileStyles.text}>{item.schoolName}</Text>
                <Text style={MyProfileStyles.text}>{item.period}</Text>
              </View>
            ))}
        </View>
      )}

      <Text style={MyProfileStyles.sectionTitle}>Habilidades</Text>
      {isLoading ? (
        <ActivityIndicator color={"#057a5f"} size={"small"} />
      ) : (
        <View style={MyProfileStyles.header}>
          {userData &&
            userData.skills &&
            userData.skills.map((item, index) => (
              <View key={index}>
                <Text style={MyProfileStyles.text}>{item.name}</Text>
              </View>
            ))}
        </View>
      )}

      <Text style={MyProfileStyles.sectionTitle}>Objetivos</Text>
      {isLoading ? (
        <ActivityIndicator color={"#7ac6c0"} size={"small"} />
      ) : (
        <View style={MyProfileStyles.header}>
          {userData && (
            <>
              <Text style={MyProfileStyles.title}>{userData.objective}</Text>
              <Text style={MyProfileStyles.text}>{userData.about}</Text>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

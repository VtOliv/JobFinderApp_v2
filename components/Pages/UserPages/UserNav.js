import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { baseURL } from "../index";

export default function Navbar({ navigation }) {
  const { getItem, removeItem } = useAsyncStorage("id");
  const [userName, setUserName] = useState("");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getFromStorage() {
    const item = await getItem();
    setId(item);
  }

  useEffect(() => {
    getFromStorage();
  }, []);

  useEffect(() => {
    if (id !== null) {
      fetchUser(id);
    }
  }, [id]);

  async function fetchUser(userId) {
    try {
      const response = await fetch(`${baseURL}/user/${userId}`);
      const data = await response.json();
      var name = data.name;
      var firstName = name.split(" ");

      setUserName(firstName[0]);
    } catch (error) {
      console.log("ERRO:" + error.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    Alert.alert("Logout efetuado com sucesso");
    removeItem();
    setTimeout(() => navigation.navigate("Login"), 3000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ height: 20, width: 100 }}
          source={require("../../../assets/logo-no-background.png")}
        />
      </View>
      <View style={styles.rightContent}>
        {loading && id === undefined ? (
          <ActivityIndicator size="small" color={"#057a5f"} />
        ) : (
          <Text style={styles.welcomeText}>Bem vindo(a), {userName}</Text>
        )}

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("MyProfile")}
        >
          <Ionicons name="person-circle-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => logout()}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    paddingHorizontal: 20,
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.2, // Sombra para iOS
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    marginRight: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AppLogo from "./AppLogo";
import { LoginURL } from "../index";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

const Login = ({ navigation }) => {
  const { getItem, setItem } = useAsyncStorage("id");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleStorage(id) {
    await setItem(id);
  }

  const loginMethod = async () => {
    await fetch(LoginURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.result === "success") {
          try {
            handleStorage(res.id.toString());
            setEmail("");
            setPassword("");
            res.role === "Recrutador"
              ? navigation.navigate("RecruiterLoggedIn")
              : navigation.navigate("UserLoggedIn", { id: res.id.toString() });
          } catch (error) {
            console.log(error);
          }
        } else {
          Alert.alert("Login ou senha inválido !");
        }
      });
  };

  return (
    <View style={styles.container}>
      <AppLogo margin={0} logout={false} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        label="Email"
        style={styles.input}
        placeholder="Digite seu Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType={undefined}
      />
      <TextInput
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        label="Senha"
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCompleteType={undefined}
      />
      <TouchableOpacity style={styles.button} onPress={loginMethod}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text>Primeiro Acesso? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 10,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#7ac6c0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;

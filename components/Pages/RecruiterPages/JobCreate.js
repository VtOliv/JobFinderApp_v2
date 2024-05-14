import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import AppLogo from "../CommonPages/AppLogo";
import { createJobURL } from "..";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Navbar from "../UserPages/UserNav";

export default function JobCreate({ navigation }) {
  const { getItem, setItem } = useAsyncStorage("id");
  const [jobName, setJobName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [income, setIncome] = useState("");
  const [officeHour, setOfficeHour] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    getFromStorage();
  });

  async function getFromStorage() {
    const item = await getItem();
    let data = JSON.parse(item);
    setId(data);
  }

  const getInfo = () => {
    console.log(id);
  };

  const cadastrar = async () => {
    await fetch(createJobURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobName: jobName,
        companyName: companyName,
        shortDescription: shortDescription,
        description: description,
        income: income,
        officeHour: officeHour,
        savedById: id,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.id != null) {
          Alert.alert(`Vaga ${res.jobName} cadastrada com sucesso`);
          setJobName("");
          setCompanyName("");
          setDescription("");
          setShortDescription("");
          setIncome("");
          setOfficeHour("");
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} >
      <Text style={styles.title}>Nova vaga</Text>

      <TextInput
        style={styles.input}
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        label="Nome da Vaga"
        placeholder="Digite o Nome"
        value={jobName}
        onChangeText={(value) => {
          setJobName(value);
        }}
      />

      <TextInput
        label="Nome da empresa"
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        style={styles.input}
        placeholder="Digite o nome da empresa"
        value={companyName}
        onChangeText={(value) => {
          setCompanyName(value);
        }}
      />

      <TextInput
        label="Descrição resumida"
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        style={styles.input}
        placeholder="Digite a descrição resumida"
        value={shortDescription}
        onChangeText={(value) => {
          setShortDescription(value);
        }}
      />

      <TextInput
        label="Descrição da vaga"
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        editable
        multiline
        numberOfLines={4}
        maxLength={400}
        style={styles.input}
        placeholder="Digite a descrição da vaga"
        value={description}
        onChangeText={(value) => {
          setDescription(value);
        }}
      />

      <TextInput
        label="Salário previsto"
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o valor"
        value={income}
        onChangeText={(value) => {
          setIncome(value);
        }}
      />

      <TextInput
        label="Horário"
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        style={styles.input}
        placeholder="Digite o horário"
        value={officeHour}
        onChangeText={(value) => {
          setOfficeHour(value);
        }}
      />
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} key={"send"} onPress={cadastrar}>
          <Text style={styles.text}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    margin: 10,
    marginTop: 0,
    padding: 6,
    borderRadius: 4,
    width: "80%",
  },
  btn: {
    width: "40%",
    height: 40,
    padding: 5,
    alignSelf: "center",
    backgroundColor: "#7ac6c0",
    borderStyle: "solid",
    borderColor: "#7ac6c0",
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  btnView: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
  },
});

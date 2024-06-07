import { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { TextInput, Surface, Divider } from "react-native-paper";
import { applyURL, searchURL, baseURL } from "../index";
import Navbar from "./UserNav";
import { ScrollView } from "react-native-gesture-handler";

export default function ApplyPage({ navigation, route }) {
  const [jobId, setJobId] = useState();
  const [jobData, setJobData] = useState([]);
  const [message, setMessage] = useState("");
  const [jobName, setJobName] = useState("");
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  async function findJob() {
    await fetch(`${searchURL}jobName=${jobName}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setJobData(res.content);
      })
      .catch((err) => {
        console.log("ERRO:" + err.message);
      });
  }

  const fetchData = async () => {
    setJobId(route.params.id);

    try {
      const response = await fetch(`${baseURL}/${jobId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setData(data);

      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setIsLoading(true);
    }
  };

  const sendApply = () => {
    fetch(applyURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: jobId,
        userId: userId,
        applyMessage: message,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("ERRO:" + err.message);
      });
  };

  useEffect(() => {
    try {
      var paramJobId = route.params.id;
      var paramUserId = route.params.user;
      var paramJobName = route.params.jobName;

      setJobId(paramJobId);
      setUserId(paramUserId);
      setJobName(paramJobName);

      fetchData();
      findJob();
    } catch (error) {
      console.log(error);
    }
  }, [isLoading]);

  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Navbar navigation={navigation} />

        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          Candidate-se a vaga
        </Text>

        <Surface style={styles.surface} elevation={4}>
          {isLoading ? (
            <ActivityIndicator size="large" color={"#057a5f"} />
          ) : (
            <View>
              <Text style={styles.text}>Dados da vaga: </Text>
              <Text style={styles.accordionTxt}>Nome:</Text>
              <Text style={styles.subTxt}>{data.jobName}</Text>
              <Divider />
              <Text style={styles.accordionTxt}>Descrição:</Text>
              <Text style={styles.subTxt}>{data.description}</Text>
              <Divider />
              <Text style={styles.accordionTxt}>Resumo: </Text>
              <Text style={styles.subTxt}>{data.shortDescription}</Text>
              <Divider />
              <Text style={styles.accordionTxt}>Empresa: </Text>
              <Text style={styles.subTxt}>{data.companyName}</Text>
              <Divider />
              <Text style={styles.accordionTxt}>Salário: </Text>
              <Text style={styles.subTxt}>{data.income}</Text>
              <Divider />
              <Text style={styles.accordionTxt}>Horário: </Text>
              <Text style={styles.subTxt}>{data.officeHour}</Text>
            </View>
          )}
        </Surface>

        <TextInput
          label="Mensagem ao recrutador"
          placeholder="Digite a Mensagem ao recrutador"
          editable
          multiline
          numberOfLines={5}
          mode="outlined"
          theme={{ colors: { primary: "#7ac6c0" } }}
          outlineColor="#7ac6c0"
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          autoCompleteType={undefined}
        />

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "80%",
          }}
        >
          <Button color={"#7ac6c0"} title="Candidatar-se" onPress={sendApply} />
          <Button
            color={"#7ac6c0"}
            title="Voltar"
            onPress={() => navigation.navigate("user")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "70%",
    alignSelf: "center",
    marginVertical: 15,
  },
  surface: {
    padding: 8,
    height: "auto",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7ac6c0",
    borderRadius: 15,
  },
  accordionTxt: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 15,
    paddingVertical: 5,
  },
  subTxt: {
    paddingHorizontal: 15,
    paddingVertical: 3,
    fontSize: 14,
  },
});

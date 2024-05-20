import { useEffect, useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { applyURL, searchURL } from "..";
import { JobsListStyles } from "../Styles";
import Navbar from "./UserNav";

export default function ApplyPage({ navigation, route }) {
  const [jobId, setJobId] = useState();
  const [jobData, setJobData] = useState([]);
  const [message, setMessage] = useState("");
  const [jobName, setJobName] = useState("");
  const [userId, setUserId] = useState();

  async function findJob() {
    await fetch(`${searchURL}jobName=${jobName}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((res) => {
        setJobData(res.content)
      })
      .catch((err) => {
        console.log("ERRO:" + err.message);
      });
  }

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
      setJobName(paramJobName)

      findJob()
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View>
      <Navbar navigation={navigation} />

      <Text style={{textAlign:'center', fontSize:20, fontWeight: 'bold'}}>Candidate-se a vaga {jobName}</Text>


      <TextInput
        label="Digite uma mensagem"
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
      
      <View style={{alignSelf:'center', flexDirection:'row', justifyContent:'space-evenly', width:'80%'}}>
        <Button color={"#7ac6c0"} title="Candidatar-se" onPress={sendApply} />
        <Button color={"#7ac6c0"} title="Voltar" onPress={() => navigation.navigate('user')} />
      </View>
    </View>
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
    width: '70%',
    alignSelf: 'center',
    marginVertical: 15
  }
});

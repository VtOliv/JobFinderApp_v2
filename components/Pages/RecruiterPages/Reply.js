import { useState, useEffect } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Mailer from "react-native-mail";
import Navbar from "../UserPages/UserNav";
import { SelectList } from "react-native-dropdown-select-list";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { recruiterAppliesURL, replyURL } from "..";

export default function Reply({ navigation }) {
  const [textAPI, setTextAPI] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const { getItem } = useAsyncStorage("id");
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState();
  const [applyMessage, setApplyMessage] = useState();


  async function sendViaAPI(applyId) {
    try {
      const id = await getItem();
      const response = await fetch(`${replyURL}/${applyId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyMessage: textAPI,
          status: 'Em processo'
        })
      });
      const json = await response.json();
      setResult(json)
      console.log(json);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }

    console.log("Texto enviado via API:", textAPI);
    Alert.alert("Texto enviado via API com sucesso!");
  };

  // Função para enviar o texto por e-mail
  const sendViaEmail = () => {
    // Configuração para enviar o e-mail
    const email = {
      subject: `Inscrição para a vaga ${data.jobName}`,
      recipients: ['vitorturmac@gmail.com'],
      body: textEmail,
      isHTML: false,
    };

    Mailer.mail(email, (error, event) => {
      if (error) {
        console.error("Erro ao enviar e-mail:", error);
        Alert.alert("Erro ao enviar por e-mail. Por favor, tente novamente.");
      } else {
        console.log("E-mail enviado com sucesso:", event);
        Alert.alert("E-mail enviado com sucesso!");
      }
    });
  };

  useEffect(() => {
    data.filter((item) => item.id === value).map((item) => { setApplyMessage(item.applyMessage) })

    console.log(applyMessage);
  }, [value])

  useEffect(() => {
    const fetchMyOpportunities = async () => {
      try {
        const id = await getItem();
        const response = await fetch(`${recruiterAppliesURL}/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        setData(json)
        let newArray = json.map((item) => {
          return { key: item.id, value: item.jobName };
        });
        setFormattedData(newArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(true);
      }
    };

    fetchMyOpportunities();
  }, []);

  return (
    <View>
      <View style={{ alignSelf: "flex-start", width: "100%" }}>
        <Navbar navigation={{ navigation }} />
      </View>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <SelectList
            dropdownStyles={{ backgroundColor: "#fff", marginTop: 0 }}
            boxStyles={styles.dropdown}
            setSelected={(val) => setValue(val)}
            placeholder="Selecione a Vaga"
            searchPlaceholder="Pesquise a vaga"
            data={formattedData}
            maxHeight={150}
            save="key"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            theme={{ colors: { primary: "#7ac6c0" } }}
            outlineColor="#7ac6c0"
            disabled
            mode="outlined"
            label="Mensagem ao recrutador"
            placeholder="Digite o texto para enviar"
            numberOfLines={2}
            editable
            multiline
            value={applyMessage}
          />
          <TextInput
            style={styles.input}
            theme={{ colors: { primary: "#7ac6c0" } }}
            outlineColor="#7ac6c0"
            mode="outlined"
            label="Mensagem ao candidato"
            placeholder="Digite o texto para enviar"
            numberOfLines={2}
            editable
            multiline
            value={textAPI}
            onChangeText={setTextAPI}
          />
          <Button title="Enviar via API" color="#7ac6c0" onPress={() => sendViaAPI(value)} />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            theme={{ colors: { primary: "#7ac6c0" } }}
            outlineColor="#7ac6c0"
            mode="outlined"
            label="Email ao candidato"
            editable
            multiline
            placeholder="Digite o texto para enviar por e-mail"
            value={textEmail}
            numberOfLines={6}
            onChangeText={setTextEmail}
          />
          <Button
            title="Enviar por e-mail"
            color="#7ac6c0"
            onPress={sendViaEmail}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    marginTop: 0,
    padding: 6,
    borderRadius: 4,
    width: "80%",
  },
  container: {
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 30,
  },
  inputView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  dropdown: {
    height: 50,
    width: "70%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginTop: 15
  },
  nav: {
    alignSelf: "flex-start",
  },
});

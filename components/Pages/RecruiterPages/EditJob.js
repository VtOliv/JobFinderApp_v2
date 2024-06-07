import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TextInput, Surface, Divider } from "react-native-paper";
import { updateJobURL, baseURL } from "../index";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { MyOppsStyles } from "../Styles";

export default function JobCreate({ navigation, route }) {
  const { getItem, setItem } = useAsyncStorage("id");
  const [jobName, setJobName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [income, setIncome] = useState("");
  const [officeHour, setOfficeHour] = useState("");
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [jobId, setJobId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFromStorage();

  }, [getItem]);

  useEffect(() => {
    fetchData();
  }, [isLoading]);

  async function getFromStorage() {
    const item = await getItem();
    let data = JSON.parse(item);
    setId(data);
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
      setJobName(data.jobName);
      setCompanyName(data.companyName);
      setDescription(data.description);
      setShortDescription(data.shortDescription);
      setIncome(data.income);
      setOfficeHour(data.officeHour);

      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setIsLoading(true);
    }
  };

  const alterar = async () => {
    await fetch(`${updateJobURL}/${jobId}`, {
      method: "PUT",
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
          Alert.alert(`Vaga ${res.jobName} alterada com sucesso`);
        }
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Surface style={styles.surface} elevation={4}>
          {isLoading ? (
            <ActivityIndicator size="large" color={"#057a5f"} />
          ) : (
            <View>
              <Text style={styles.text}>Dados Atuais: </Text>
              <Text style={MyOppsStyles.accordionTxt}>Nome:</Text>
              <Text style={MyOppsStyles.subTxt}>{data.jobName}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Descrição:</Text>
              <Text style={MyOppsStyles.subTxt}>{data.description}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Resumo: </Text>
              <Text style={MyOppsStyles.subTxt}>{data.shortDescription}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Empresa: </Text>
              <Text style={MyOppsStyles.subTxt}>{data.companyName}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Salário: </Text>
              <Text style={MyOppsStyles.subTxt}>{data.income}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Horário: </Text>
              <Text style={MyOppsStyles.subTxt}>{data.officeHour}</Text>
            </View>
          )}
        </Surface>
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
          <TouchableOpacity style={styles.btn} key={"send"} onPress={alterar}>
            <Text style={styles.text}>Alterar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    margin: 10,
    marginTop: 0,
    padding: 6,
    borderRadius: 4,
    width: "90%",
  },
  btn: {
    width: "40%",
    height: 40,
    padding: 5,
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
  surface: {
    padding: 8,
    height: "auto",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7ac6c0",
    borderRadius: 15,
  },
});

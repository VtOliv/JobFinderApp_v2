import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
  BackHandler,
} from "react-native";

// You can import supported modules from npm
import { Card, TextInput } from "react-native-paper";

// or any files within the Snack
import AppLogo from "../CommonPages/AppLogo";
import { useEffect, useMemo, useState } from "react";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { IP } from "..";
import { ModalStyles, JobsListStyles } from "../Styles";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function JobsList({ navigation }) {
  const { getItem, setItem } = useAsyncStorage("id");
  const [vagas, setVagas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const [tipo, setTipo] = useState("jobName");
  const [id, setId] = useState();

  const radioButtons = useMemo(
    () => [
      { id: "jobName", label: "Cargo" },
      { id: "companyName", label: "Empresa" },
      { id: "officeHour", label: "Horário" },
    ],
    []
  );

  useEffect(() => {
    getFromStorage();
  });

  async function getFromStorage() {
    const item = await getItem();
    let data = JSON.parse(item);
    setId(data);
  }
  const filtrar = () => {
    fetch(`${IP}/find?${tipo}=${filtro}`)
      .then((response) => response.json())
      .then((data) => {
        if (filtro != "") {
          setFiltered(data.content);
        }
      })
      .catch((err) => {
        console.log("ERRO:" + err.message);
      });
  };

  const limpar = () => {
    setFiltro("");
    setFiltered(vagas);
  };

  useEffect(() => {
    fetch(`${IP}`)
      .then((response) => response.json())
      .then((data) => {
        setVagas(data.content);
      })
      .catch((err) => {
        console.log("ERRO:" + err.message);
      });

      getFromStorage()
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={JobsListStyles.container}>
      <ScrollView>
        <Card style={JobsListStyles.card}>
          <AppLogo margin={15}/>

          <RadioGroup
            containerStyle={JobsListStyles.radio}
            layout="row"
            radioButtons={radioButtons}
            onPress={setTipo}
            selectedId={tipo}
          />
          <View style={JobsListStyles.searchBar}>
            <TextInput
              label="Filtrar"
              placeholder="Busque sua vaga"
              mode="outlined"
              theme={{ colors: { primary: "#7ac6c0" } }}
              outlineColor="#7ac6c0"
              style={JobsListStyles.input}
              value={filtro}
              onChangeText={(text) => setFiltro(text)}
              autoCompleteType={undefined}
            />
          </View>
          <View style={JobsListStyles.searchBar}>
            <Button color={"#7ac6c0"} title="Pesquisar" onPress={filtrar} />
            <Button color={"#7ac6c0"} title="Limpar" onPress={limpar} />
          </View>

          {filtered.length > 0 &&
            filtered.map((item) => {
              return (
                <Card key={item.id} style={JobsListStyles.contentCard}>
                  <Card.Title
                    title={item.jobName}
                    subtitle={item.companyName}
                  />
                  <Text style={JobsListStyles.company}>
                    Horário: {item.officeHour}
                  </Text>
                  <Button
                    color={"#7ac6c0"}
                    title="Candidatar-se"
                    onPress={() =>
                      navigation.navigate("apply", { id: item.id , user: id})
                    }
                  />
                </Card>
              );
            })}

          {filtered.length == 0 &&
            vagas.map((item) => {
              return (
                <Card key={item.id} style={JobsListStyles.contentCard}>
                  <Card.Title
                    title={item.jobName}
                    subtitle={item.companyName}
                  />
                  <Text style={JobsListStyles.company}>
                    Horário: {item.officeHour}
                  </Text>
                  <Button
                    color={"#7ac6c0"}
                    title="Candidatar-se"
                    onPress={() =>
                      navigation.navigate("apply", { id: item.id , user: id })
                    }
                  />
                </Card>
              );
            })}

          {vagas.length < 1 && filtered.length < 1 && (
            <TouchableOpacity style={JobsListStyles.contentCard}>
              <Text style={JobsListStyles.jobTitle}>
                Não foi possível carregar vagas
              </Text>
            </TouchableOpacity>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

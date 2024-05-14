import {
  Text,
  View,
  StyleSheet,
  Button,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Surface, HelperText, Modal } from "react-native-paper";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Navbar from "../UserPages/UserNav";
import { deactivateURL, overallURL, recruiterJobListURL } from "..";
import { SelectList } from "react-native-dropdown-select-list";

export default function RecruiterHome({ navigation }) {
  const { getItem } = useAsyncStorage("id");
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getItem();
        const response = await fetch(`${overallURL}/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();
        setUserData(userData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMyOpportunities = async () => {
      try {
        const id = await getItem();
        const response = await fetch(`${recruiterJobListURL}/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        let newArray = data.content.map((item) => {
          return { key: item.id, value: item.jobName };
        });
        setData(newArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(true);
      }
    };

    fetchMyOpportunities();
  }, []);

  async function disableOpportunity(idToDisable) {
    console.log(idToDisable);

    try {
      const response = await fetch(`${deactivateURL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idToDisable,
        }),
      });
      const data = await response.json();
      if (data === "Desativado") {
        console.log("desativou");
      }

      hideModal;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setIsLoading(true);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    await fetchMyOpportunities();
    setRefreshing(false);
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={{ height: "100%" }}>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <Navbar navigation={navigation} />
      <Text style={styles.txt}>Bem vindo ao Job Finder</Text>
      {!isLoading && userData && (
        <View style={styles.surfaceView}>
          <Surface style={styles.surface} elevation={4}>
            <Text>Vagas</Text>
            <Text style={{ fontSize: 30 }}>{userData.opportunityCount}</Text>
          </Surface>
          <Surface style={styles.surface} elevation={4}>
            <Text>Inscrições</Text>
            <Text style={{ fontSize: 30 }}>{userData.appliesCount}</Text>
          </Surface>
          <Surface style={styles.surface} elevation={4}>
            <Text>A Avaliar</Text>
            <Text style={{ fontSize: 30 }}>{userData.repliesCount}</Text>
          </Surface>
        </View>
      )}
      {!isLoading && (
        <View>
          <Surface style={styles.optionsSurface} elevation={4}>
            <Surface style={styles.surfaceBtn} elevation={1}>
              <Text>Opções</Text>
              <Button
                title="Criar Vaga"
                color="#7ac6c0"
                onPress={() => navigation.navigate("create")}
              />
              <View style={styles.selectView}>
                <SelectList
                  placeholder="Selecione a Vaga"
                  searchPlaceholder="Pesquise a vaga"
                  dropdownStyles={{ backgroundColor: "#fff" }}
                  boxStyles={styles.dropdown}
                  setSelected={(val) => setValue(val)}
                  data={data}
                  maxHeight={150}
                  save="key"
                />
                <HelperText type="info" visible={true}>
                  Selecione uma vaga para editar ou deletar
                </HelperText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: "25%",
                  width: "100%",
                }}
              >
                <Button
                  title="Editar Vaga"
                  color="#7ac6c0"
                  onPress={() => console.log(value)}
                />
                <Button
                  title="Desativar Vaga"
                  color="#7ac6c0"
                  onPress={showModal}
                />
              </View>
            </Surface>
          </Surface>
        </View>
      )}
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        <Text>Deseja realmente desativar essa vaga ?</Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={styles.touch}
            onPress={() => disableOpportunity(value)}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={hideModal}>
            <Text style={{ textAlign: "center", color: "#fff" }}>Não</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    textAlign: "center",
    margin: 4,
    fontWeight: "bold",
    fontSize: 20,
  },
  touch: {
    width: "30%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#7ac6c0",
    padding: 6,
    borderRadius: 5,
    marginVertical: 10,
  },
  surface: {
    padding: 8,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  surfaceBtn: {
    padding: 8,
    height: "auto",
    width: 300,
    backgroundColor: "#d2f7f4",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
  surfaceEdit: {
    padding: 8,
    height: "auto",
    width: 300,
    backgroundColor: "#d2f7f4",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
  surfaceView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  optionsSurface: {
    paddingHorizontal: 8,
    height: 520,
    width: 350,
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  selectView: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    width: "70%",
    height: "30%",
    alignSelf: "center",
  },
});

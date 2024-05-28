import { Text, ScrollView, StyleSheet } from "react-native";
import { Card, Surface } from "react-native-paper";
import Navbar from "./UserNav";
import { useEffect, useState } from "react";
import { appliesList } from "../index";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function MyApplies({navigation}) {
  const { getItem } = useAsyncStorage("id");
  const [apply, setApply] = useState([]);

  async function loadApplies() {
    try {
      const id = await getItem();
      const response = await fetch(`${appliesList}/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setApply(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    if (apply.length > 0) {
      return;
    }

    loadApplies();
    console.log(apply);
  }, [getItem]);

  return (
    <ScrollView>
      <Navbar navigation={navigation}/>
      <Text style={{ margin: 15, justifyContent: "center" }}>
        Minhas candidaturas
      </Text>

      {apply.length > 0 &&
        apply.map((item, index) => {
          return (
            <Card key={index.toString()} style={styles.card}>
              <Surface style={styles.surface} elevation={4}>
                <Text>{item.status}</Text>
              </Surface>
              <Card.Title title={item.jobName} />

              <Text style={styles.cardText}>{`Ultima atualização: ${item.lastUpdate.split("T")[0].split("-").reverse().join("/")}`}</Text>
              <Surface style={styles.content} elevation={1}>
                <Text>{item.replyMessage === null? "Aguardando resposta" : item.replyMessage}</Text>
              </Surface>
            </Card>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  surface: {
    margin: 5,
    padding: 2,
    height: 30,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9df5a1",
    borderRadius: 15,
    alignSelf: "flex-end",
  },
  card: {
    margin: 15,
    padding: 5,
  },
  cardText: {
    paddingLeft: 15,
  },
  content: {
    margin: 5,
    padding: 2,
    height: 100,
    width: "97%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e8e4",
  },
});

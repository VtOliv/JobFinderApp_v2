import {
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { List, Divider } from "react-native-paper";
import Navbar from "../UserPages/UserNav";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { recruiterJobListURL } from "../index";
import { MyOppsStyles } from "../Styles";

export default function MyOpportunities({ navigation }) {
  const { getItem } = useAsyncStorage("id");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchData = async () => {
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
      setData(data.content);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (!isInitialized) { 
      setIsInitialized(true); 
      fetchData(); 
    }
  }, [getItem, isInitialized]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [fetchData]);

  return (
    <ScrollView>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <Navbar navigation={navigation} />
      <Text style={{ textAlign: "center", padding: 10, fontSize: 20 }}>
        Minhas Vagas
      </Text>
      {isLoading ? (
        <ActivityIndicator size="small" color={"#057a5f"} />
      ) : (
        <List.AccordionGroup>
          {data.map((item, index) => (
            <List.Accordion
              title={item.jobName}
              description={`Id da vaga: ${item.id}`}
              id={index.toString()}
              key={index.toString()}
            >
              <Text style={MyOppsStyles.accordionTxt}>Descrição:</Text>
              <Text style={MyOppsStyles.subTxt}>{item.description}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Resumo: </Text>
              <Text style={MyOppsStyles.subTxt}>{item.shortDescription}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Empresa: </Text>
              <Text style={MyOppsStyles.subTxt}>{item.companyName}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Salário: </Text>
              <Text style={MyOppsStyles.subTxt}>{item.income}</Text>
              <Divider />
              <Text style={MyOppsStyles.accordionTxt}>Horário: </Text>
              <Text style={MyOppsStyles.subTxt}>{item.officeHour}</Text>
            </List.Accordion>
          ))}
        </List.AccordionGroup>
      )}
    </ScrollView>
  );
}

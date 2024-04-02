import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from "react-native-picker-select";

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

// or any files within the Snack
import AppLogo from '../AppLogo';
import { useEffect, useState } from 'react';




function JobsList() {

  const [vagas, setVagas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const [tipo, setTipo] = useState(null);

  const filtrar = () => {
    useEffect(() => {
      fetch(`http://192.168.1.2:8097/find?${tipo}=${filtro}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.content)
          setFiltered(data.content);
        })
        .catch((err) => {
          console.log('ERRO:' + err.message);
        });
    }, []);
  }

  useEffect(() => {
    fetch('http://192.168.1.2:8097/')
      .then((response) => response.json())
      .then((data) => {
        setVagas(data.content);
      })
      .catch((err) => {
        console.log('ERRO:' + err.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <AppLogo />

        <RNPickerSelect
          onValueChange={(value) => setTipo(value)}
          items={[
            { label: "Cargo", value: "jobName" },
            { label: "Empresa", value: "companyName" },
            { label: "Horário", value: "officeHour" }
          ]}
        />
        <View style={styles.searchBar}>
          <TextInput style={styles.input} onChangeText={(text => setFiltro(text))} />
          <TouchableOpacity onPress={() => filtrar}>
            <Feather name="search" size={40} color="grey" />
          </TouchableOpacity>
        </View>

        {filtered.length > 0 && filtered.map((item) => {
          return (
            <TouchableOpacity key={item.id} style={styles.contentCard}>
              <Text style={styles.jobTitle}>{item.jobName}</Text>
              <Text style={styles.company}>{item.companyName}</Text>
              <Text style={styles.company}>Horário: {item.officeHour}</Text>
            </TouchableOpacity>
          )
        })}

        {filtered.length == 0 && vagas.map((item) => {
          return (
            <TouchableOpacity key={item.id} style={styles.contentCard}>
              <Text style={styles.jobTitle}>{item.jobName}</Text>
              <Text style={styles.company}>{item.companyName}</Text>
              <Text style={styles.company}>Horário: {item.officeHour}</Text>
            </TouchableOpacity>
          )
        })}

        {vagas.length < 1 && filtered.length < 1 && (
          <TouchableOpacity style={styles.contentCard}>
            <Text style={styles.jobTitle}>Não foi possível carregar vagas</Text>
          </TouchableOpacity>
        )}
      </Card>
    </SafeAreaView>
  );
}

export default JobsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  jobTitle: {
    margin: 20,
    marginBottom: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  company: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  card: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    width: 315,
    marginLeft: 12,
    padding: 8,
  },
  contentCard: {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    margin: 12,
  },
  searchBar: {
    flexDirection: 'row',
  },
});

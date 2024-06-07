import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
  BackHandler,
} from 'react-native';

import {
  ActivityIndicator,
  Card,
  TextInput,
  HelperText,
} from 'react-native-paper';

import AppLogo from '../CommonPages/AppLogo';
import { useEffect, useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { baseURL, searchURL } from '../index';
import { ModalStyles, JobsListStyles } from '../Styles';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Navbar from './UserNav';

export default function JobsList({ navigation }) {
  const { getItem, setItem } = useAsyncStorage('id');
  const [vagas, setVagas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const [tipo, setTipo] = useState('jobName');
  const [id, setId] = useState();
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const radioButtons = useMemo(
    () => [
      { id: 'jobName', label: 'Cargo' },
      { id: 'companyName', label: 'Empresa' },
      { id: 'officeHour', label: 'Horário' },
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
    fetch(`${searchURL}${tipo}=${filtro}`)
      .then((response) => response.json())
      .then((data) => {
        if (filtro != '') {
          setFiltered(data.content);
        }
      })
      .catch((err) => {
        console.log('ERRO:' + err.message);
      });
  };

  const limpar = () => {
    setFiltro('');
    setFiltered(vagas);
  };

  useEffect(() => {
    setPage(0);

    fetch(`${baseURL}?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setVagas(data.content);
        setTotalPages(data.totalPages);
        setPage(1);
      })
      .catch((err) => {
        console.log('ERRO:' + err.message);
      })
      .finally(() => setLoading(false));

    getFromStorage();
  }, []);

  function loadNextPage() {
    setLoading(true);
    if (page === totalPages) {
      Alert.alert('Não há mais vagas para carregar');
      setLoading(false);
      return;
    }

    fetch(`${baseURL}?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        var newArr = vagas.concat(data.content);
        setVagas(newArr);
      })
      .catch((err) => {
        console.log('ERRO:' + err.message);
      })
      .finally(() => setLoading(false));

    var newPage = page + 1;
    console.log(newPage);
    setPage(newPage);
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={JobsListStyles.container}>
      <ScrollView>
        <Navbar navigation={navigation} />

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
            theme={{ colors: { primary: '#7ac6c0' } }}
            outlineColor="#7ac6c0"
            style={JobsListStyles.input}
            value={filtro}
            onChangeText={(text) => setFiltro(text)}
            autoCompleteType={undefined}
          />
          <HelperText type="info" visible={true}>
            Pesquise suas vagas utilizando os filtros acima
          </HelperText>
        </View>
        <View style={JobsListStyles.searchButtons}>
          <TouchableOpacity style={JobsListStyles.buttons} onPress={filtrar}>
            <Text style={JobsListStyles.btnText}>Pesquisar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={JobsListStyles.buttons} onPress={limpar}>
            <Text style={JobsListStyles.btnText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {filtered.length > 0 &&
          filtered.map((item) => {
            return (
              <Card key={item.id} style={JobsListStyles.contentCard}>
                <Card.Title title={item.jobName} subtitle={item.companyName} />
                <Text style={JobsListStyles.company}>
                  Horário: {item.officeHour}
                </Text>
                <TouchableOpacity
                  style={JobsListStyles.cardButtons}
                  onPress={() =>
                    navigation.navigate('apply', { id: item.id, user: id })
                  }>
                  <Text style={JobsListStyles.btnText}>Candidatar-se</Text>
                </TouchableOpacity>
              </Card>
            );
          })}

        {filtered.length == 0 &&
          vagas.map((item) => {
            return (
              <Card key={item.id} style={JobsListStyles.contentCard}>
                <Card.Title title={item.jobName} subtitle={item.companyName} />
                <Text style={JobsListStyles.company}>
                  Horário: {item.officeHour}
                </Text>
                <TouchableOpacity
                  style={JobsListStyles.cardButtons}
                  onPress={() =>
                    navigation.navigate('apply', {
                      id: item.id,
                      user: id,
                      jobName: item.jobName,
                    })
                  }>
                  <Text style={JobsListStyles.btnText}>Candidatar-se</Text>
                </TouchableOpacity>
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
        {loading ? (
          <ActivityIndicator color="7ac6c0" size={'small'} />
        ) : (
          <TouchableOpacity
            style={JobsListStyles.cardButtons}
            onPress={() => loadNextPage()}>
            <Text style={JobsListStyles.btnText}>Carregar mais vagas</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

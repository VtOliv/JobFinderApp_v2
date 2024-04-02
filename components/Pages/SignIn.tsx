import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppLogo from '../AppLogo';

function SignIn({ navigation }: { navigation: any }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dtnasc, setDtnasc] = useState('');

  function logResults() {
    console.warn(nome);
    console.warn(email);
    console.warn(cpf);
    console.warn(telefone);
    console.warn(dtnasc);
  }

  return (
    <View style={styles.container}>
      <AppLogo />

      <Text style={styles.title}>Cadastre-se</Text>

      <Text style={styles.text}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu Nome"
        value={nome}
        onChangeText={(value) => {
          setNome(value);
        }}
      />

      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu Email"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />

      <Text style={styles.text}>CPF:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        value={cpf}
        keyboardType="numeric"
        onChangeText={(value) => {
          setCpf(value);
        }}
      />

      <Text style={styles.text}>Telefone:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite seu Telefone"
        value={telefone}
        onChangeText={(value) => {
          setTelefone(value);
        }}
      />

      <Text style={styles.text}>Data de nascimento:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite sua Data de nascimento"
        value={dtnasc}
        onChangeText={(value) => {
          setDtnasc(value);
        }}
      />
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btn}
          key={'send'}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    margin: 10,
    marginTop: 0,
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    width: '80%',
  },
  btn: {
    width: '40%',
    height: 40,
    padding: 5,
    alignSelf: 'center',
    backgroundColor: '#eb5e28',
    borderStyle: 'solid',
    borderColor: '#eb5e28',
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  btnView:{
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
  }
});

export default SignIn;

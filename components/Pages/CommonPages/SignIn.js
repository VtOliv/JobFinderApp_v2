import React, { useMemo, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import AppLogo from './AppLogo';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import MaskInput, { Masks } from 'react-native-mask-input';
import { IP } from '..';

function SignIn({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [recruiter, setRecruiter] = useState();

  const radioButtons = useMemo(() => ([
    { id: '1', label: 'Recrutador', value: 'true' },
    { id: '2', label: 'Usuário', value: 'false' }
  ]), []);

  const cadastrar = async () => {

    await fetch(`${IP}/user/create`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nome,
        email: email,
        password: password,
        cpf: cpf,
        isRecruiter: recruiter === '1' ? true : false
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.id != null) {
          Alert.alert(`${res.isRecruiter ? 'Recrutador' : 'Usuário'} cadastrado com sucesso`)
          setTimeout(() => navigation.navigate('Login'), 3000)
        }
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <AppLogo margin={0} logout={false}/>

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
      <MaskInput
      keyboardType="numeric"
      maxLength={14}
      style={styles.input}
      placeholder="Digite seu CPF"
      value={cpf}
      onChangeText={(value) => {
        setCpf(value);
      }}
      mask={Masks.BRL_CPF}
    />

      <Text style={styles.text}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.text}>Você é:</Text>
      <RadioGroup
        layout='row'
        radioButtons={radioButtons}
        onPress={setRecruiter}
        selectedId={recruiter}
      />

      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btn}
          key={'send'}
          onPress={cadastrar}>
          <Text style={styles.text}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    backgroundColor: '#7ac6c0',
    borderStyle: 'solid',
    borderColor: '#7ac6c0',
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
  btnView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
  },
  pickerInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderColor: '#7ac6c0',
    borderRadius: 5,
    color: 'black',
    margin: 5,
  },
});

export default SignIn;

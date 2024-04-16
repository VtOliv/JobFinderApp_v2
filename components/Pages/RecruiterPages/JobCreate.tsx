import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet , Text, Alert  } from "react-native";
import AppLogo from "../CommonPages/AppLogo";
import storage from "../../Services/Storage";

export default function JobCreate({ navigation }: { navigation: any }) {

    const [jobName, setJobName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [income, setIncome] = useState('');
    const [officeHour, setOfficeHour] = useState('');
    const [id, setId] = useState();

    useEffect(() => {
        storage.load({key: 'loginState'}).then(response => setId(response.id))
        })

    const getInfo = () => {
        console.log(id)
    }

    const cadastrar = async () => {

        await fetch('http://192.168.1.2:8097/create', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            jobName: jobName,
            companyName: companyName,
            shortDescription: shortDescription,
            description: description,
            income: income,
            officeHour: officeHour,
            savedById: id
          })
        })
          .then(response => response.json())
          .then(res => {
            if (res.id != null) {
              Alert.alert(`Vaga ${res.jobName} cadastrada com sucesso`)
              setJobName("")
              setCompanyName("")
              setDescription("")
              setShortDescription("")
              setIncome("")
              setOfficeHour("")
            }
          })
      }


    return (

        <View style={styles.container}>
            <AppLogo margin={0} logout={false}/>

            <Text style={styles.title}>Nova vaga</Text>

            <Text style={styles.text}>Nome da Vaga:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o Nome"
                value={jobName}
                onChangeText={(value) => {
                    setJobName(value);
                }}
            />

            <Text style={styles.text}>Nome da empresa:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome da empresa"
                value={companyName}
                onChangeText={(value) => {
                    setCompanyName(value);
                }}
            />

            <Text style={styles.text}>Descrição resumida:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite a descrição resumida"
                value={shortDescription}
                onChangeText={(value) => {
                    setShortDescription(value);
                }}
            />

            <Text style={styles.text}>Descrição da vaga:</Text>
            <TextInput
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

            <Text style={styles.text}>Salário previsto:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Digite o valor"
                value={income}
                onChangeText={(value) => {
                    setIncome(value);
                }}
            />

            <Text style={styles.text}>Horário:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o horário"
                value={officeHour}
                onChangeText={(value) => {
                    setOfficeHour(value);
                }}
            />
            <View style={styles.btnView}>
                <TouchableOpacity
                    style={styles.btn}
                    key={'send'}
                    onPress={cadastrar}>
                    <Text style={styles.text}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={getInfo}>
                    <Text style={styles.text}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
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
    btnView:{
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'center',
    }
  });


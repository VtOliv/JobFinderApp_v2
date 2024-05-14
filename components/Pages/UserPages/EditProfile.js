import { useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, BackHandler, TouchableOpacity } from 'react-native'
import Navbar from './UserNav';

export default function EditProfile({ navigation }){

return (
<View>
    <Navbar navigation={navigation} />
    <Text>Funcionou</Text>
    <TouchableOpacity onPress={navigation.navigate('MyProfile')}><Text>Voltar</Text></TouchableOpacity>
</View>
)
}

const styles = StyleSheet.create({})
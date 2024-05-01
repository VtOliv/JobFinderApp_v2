import { useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, BackHandler } from 'react-native'

export default function EditProfile(){

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          return false;
        });
        return () => backHandler.remove();
      }, []);

return (
<View>
    <Text>Funcionou</Text>
</View>
)
}

const styles = StyleSheet.create({})
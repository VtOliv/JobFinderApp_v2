import { Text, View, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppLogo({ margin, logout}) {

  return (

    <View style={styles.container}>
      {logout ? <View style={styles.icon}>
          <Text>Logout</Text>
          <MaterialCommunityIcons name='logout' size={25}/>
      </View>
        : <></>}
      <Image style={{ height: 50, width: 250, marginTop: margin }} source={require('../../../assets/logo-no-background.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

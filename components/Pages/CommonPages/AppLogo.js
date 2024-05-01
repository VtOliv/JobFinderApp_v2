import { Text, View, StyleSheet, Image, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { logoutFunc } from '..';

export default function AppLogo({ margin }) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={hidden}
      />
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
    marginTop: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

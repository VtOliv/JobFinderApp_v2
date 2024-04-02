import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';


import { Card } from 'react-native-paper';
import { AppRoutes } from './Routes/app.routes';

function App(){
  return (
    <View style={{flex:1}}>
      <AppRoutes />
    </View>
  );
}

export default App;

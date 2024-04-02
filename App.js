import { Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <AssetExample />
        <TextInput style={styles.input} />
        
        <TouchableOpacity style={styles.contentCard}>
          <Text style={styles.paragraph}>Card Example</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contentCard}>
          <Text style={styles.paragraph}>Card Example</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contentCard}>
          <Text style={styles.paragraph}>Card Example</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contentCard}>
          <Text style={styles.paragraph}>Card Example</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contentCard}>
          <Text style={styles.paragraph}>Card Example</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
    width: 280,
    marginLeft: 4,
  },
  contentCard: {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    margin: 12,
  },
});

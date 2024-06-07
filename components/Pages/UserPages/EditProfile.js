import { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { TextInput, Surface, Divider } from "react-native-paper";

export default function EditProfile({ navigation }) {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const addToList = () => {
    var newList = list;
    newList.push(value);

    setList(newList);
    setValue("");
  };

  return (
    <View>
      <Surface elevation={4} style={styles.surface}>
        {list.length > 0 &&
          list.map((item) => {
            return (
              <Surface elevation={4} style={styles.surfaceList}>
                <Text>{item}</Text>
              </Surface>
            );
          })}
      </Surface>

      <TextInput
        theme={{ colors: { primary: "#7ac6c0" } }}
        outlineColor="#7ac6c0"
        mode="outlined"
        label="Nome da Vaga"
        placeholder="Digite o Nome"
        value={value}
        onChangeText={(value) => {
          setValue(value);
        }}
      />
      <TouchableOpacity onPress={addToList}>
        <Text>Adicionar a lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: "auto",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    borderRadius: 15,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  surfaceList: {
    padding: 8,
    margin: 5,
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7ac6c0",
    borderRadius: 15,
  }
});

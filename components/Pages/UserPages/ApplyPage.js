import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { applyURL } from "..";
import AppLogo from "../CommonPages/AppLogo";
import Navbar from "./UserNav";

export default function ApplyPage({ navigation, route }) {
  const [jobId, setJobId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [userId, setUserId] = useState();

  const sendApply = () => {
    fetch(applyURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: jobId,
        userId: id,
        applyMessage: message,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("ERRO:" + err.message);
      });
  };

  useEffect(() => {
    try {
      var paramJobId = route.params.id;
      var paramUserId = route.params.user;

      setId(paramJobId);
      setUserId(paramUserId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View>
      <Navbar />
      <Text>
        O jobId é {id} e o user é {userId}
      </Text>
      <FAB icon={"plus"} onPress={() => navigation.navigate("user")} />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

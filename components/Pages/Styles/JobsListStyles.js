import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  jobTitle: {
    margin: 20,
    marginBottom: 0,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  company: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 13,
    color: "gray",
    fontWeight: "bold",
    textAlign: "left",
  },
  card: {
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    width: 315,
    marginLeft: 12,
  },
  contentCard: {
    backgroundColor: "lightgrey",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
    margin: 12,
  },
  searchBar: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    margin: 1,
  },
  searchButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 1,
    width:'60%',
    alignSelf:'center'
  },
  radio: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#ced0ce",
  },
});

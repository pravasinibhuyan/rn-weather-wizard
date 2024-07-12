import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchComponent = ({ handleLocationChange, handleSearch }) => {
  return (
    <>
      <View style={styles.content}>
        <View style={{ width: "80%" }}>
          <TextInput
            onChangeText={handleLocationChange}
            placeholder="Search city"
            placeholderTextColor={"lightgrey"}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: "rgba(255,255,255,0.3)",
            padding: 15,
            marginRight: 3,
            borderRadius: 50,
          }}
        >
          <AntDesign name="search1" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default SearchComponent;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 40,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  input: {
    fontSize: 15,
    paddingLeft: 20,
    height: "100%",
    color: "#fff",
  },
});

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const DailyForeCast = ({ item, dayName }) => {
  return (
    <>
      <View style={styles.forecast_card}>
        <Image
          source={{ uri: "https:" + item?.day?.condition?.icon }}
          style={styles.forecast_img}
          resizeMode="contain"
        />
        <Text style={styles.forecast_content}>{dayName}</Text>
        <Text style={[styles.forecast_content, { fontSize: 17 }]}>
          {item?.day?.avgtemp_c}&#176;
        </Text>
      </View>
    </>
  );
};
export default DailyForeCast;

const styles = StyleSheet.create({
  forecast_img: {
    width: 35,
    height: 35,
  },
  forecast_card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: 75,
    margin: 8,
  },
  forecast_content: {
    color: "#fff",
    fontSize: 12,
  },
});

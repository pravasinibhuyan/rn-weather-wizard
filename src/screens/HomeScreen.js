import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getForecast, getSearch } from "../services/weather.service";
import DailyForeCast from "../components/forecast/dailyForeCast.component";
import {
  GET_SEARCH_DATA,
  GET_WEATHER,
  weatherImages,
} from "../constant/queryKey";
import { debounce } from "lodash";
import * as Progress from "react-native-progress";
import SearchComponent from "../components/search.component";

function HomeScreen() {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("bhubaneswar");
  const [showList, setShowList] = useState(true);

  const { data = [], refetch } = useQuery({
    queryKey: [GET_WEATHER, search],
    queryFn: () => getSearch(search),
    enabled: !!search,
  });

  const { data: forecast = {}, isLoading } = useQuery({
    queryKey: [GET_SEARCH_DATA, select],
    queryFn: () => getForecast(select),
    enabled: !!select,
  });

  const handleLocation = async (loc) => {
    setSelect(loc.name);
    setShowList(false);
  };

  const debounceOnChange = debounce((nextValue) => {
    setSearch(nextValue);
  }, 300);

  const handleLocationChange = (value) => {
    debounceOnChange(value);
    setShowList(true);
  };

  const handleSearch = () => {
    refetch();
  };
  return (
    <View styles={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.img}
        blurRadius={80}
      >
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Progress.Circle
              size={80}
              indeterminate={true}
              borderWidth={5}
              color="#fbc375"
            />
          </View>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                height: 100,
                position: "relative",
                zIndex: 50,
                margin: 10,
              }}
            >
              <SearchComponent
                handleLocationChange={handleLocationChange}
                handleSearch={handleSearch}
              />
              {data.length > 0 && showList ? (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    top: 110,
                    width: "100%",
                    borderRadius: 15,
                  }}
                >
                  {data.map((area, ind) => {
                    let showBorder = ind + 1 !== data.length;
                    return (
                      <TouchableOpacity
                        onPress={() => handleLocation(area)}
                        key={ind}
                        style={[
                          showBorder && styles.border,
                          {
                            padding: 15,
                            paddingHorizontal: 4,
                            marginBottom: 3,
                            flexDirection: "row",
                            gap: 8,
                            paddingLeft: 20,
                          },
                        ]}
                      >
                        <Entypo name="location-pin" size={25} color="grey" />
                        <Text style={styles.popupText}>
                          {area.name},{area.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <View style={styles.cloud_content}>
              <Text style={styles.cloud_content_text}>
                {forecast?.location?.name}, {forecast?.location?.country}
              </Text>
              <Image
                source={
                  weatherImages[
                    forecast?.current?.condition?.text.toLowerCase()
                  ]
                    ? weatherImages[
                        forecast?.current?.condition?.text.toLowerCase()
                      ]
                    : weatherImages["other"]
                }
                style={styles.cloud_img}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.cloud_content_text2}>
                  {forecast?.current?.temp_c}&#176;
                </Text>
                <Text style={[styles.cloud_content_text, { fontWeight: 300 }]}>
                  {forecast?.current?.condition?.text}
                </Text>
              </View>
              <View style={styles.weather_content}>
                <View style={styles.flex_row}>
                  <Image
                    source={require("../assets/icons/wind.png")}
                    style={styles.cloud_icon}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.cloud_content_text,
                      { fontWeight: 300, fontSize: 18 },
                    ]}
                  >
                    {forecast?.current?.wind_kph}km
                  </Text>
                </View>
                <View style={styles.flex_row}>
                  <Image
                    source={require("../assets/icons/drop.png")}
                    style={styles.cloud_icon}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.cloud_content_text,
                      { fontWeight: 300, fontSize: 18 },
                    ]}
                  >
                    {forecast?.current?.humidity}%
                  </Text>
                </View>
                <View style={styles.flex_row}>
                  <Image
                    source={require("../assets/icons/sun.png")}
                    style={styles.cloud_icon}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.cloud_content_text,
                      { fontWeight: 300, fontSize: 18 },
                    ]}
                  >
                    {forecast?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
              <View style={{ width: "100%" }}>
                <View style={styles.forecast_header}>
                  <AntDesign name="calendar" size={18} color="white" />
                  <Text
                    style={[
                      styles.cloud_content_text,
                      { fontWeight: 300, fontSize: 13 },
                    ]}
                  >
                    Daily forecast
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{ paddingHorizontal: 8 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {forecast?.forecast?.forecastday.map((item, index) => {
                    let day = new Date(item.date);
                    let option = { weekday: "long" };
                    let dayName = day.toLocaleDateString("en-US", option);
                    // dayName = dayName.split(",")[0];
                    return (
                      <DailyForeCast
                        key={index}
                        item={item}
                        dayName={dayName}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        )}
      </ImageBackground>
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: "100%",
    width: "100%",

  },

  border: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  popupText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cloud_content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 100,
    gap: 50,
  },
  cloud_content_text: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
  cloud_img: {
    width: "50%",
    height: 200,
  },
  cloud_content_text2: {
    fontSize: 45,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  cloud_icon: {
    width: 20,
    height: 20,
  },
  weather_content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 40,
    marginTop: -18,
  },
  flex_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  forecast_header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    marginLeft: 15,
    marginTop: -25,
  },
});

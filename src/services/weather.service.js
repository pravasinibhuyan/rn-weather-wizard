import axios from "axios";
import { FORECAST_URL, LOCATION_URL } from "./apiConfig";

export const getForecast = async (params) => {
  try {
    const result = await axios.get(
      `${FORECAST_URL}&q=${params}&days=7&aqi=no&alerts=no`
    );
    return result.data;
  } catch (error) {
    throw new Error("Something went wrong !!");
  }
};

export const getSearch = async (params) => {
  try {
    const result = await axios.get(`${LOCATION_URL}&q=${params}`);
    return result.data;
  } catch (error) {
    throw new Error("Something went wrong !!");
  }
};

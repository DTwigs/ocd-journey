import AsyncStorage from "@react-native-async-storage/async-storage";
import { uiError } from "@/utils/logger";

export const get = async (KEY) => {
  try {
    const result = await AsyncStorage.getItem(KEY);

    return result ? JSON.parse(result) : null;
  } catch (error) {
    uiError("db:get", error);
  }
};

export const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    uiError("db:remove", error);
  }
};

export const set = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    uiError("db:set", error);
  }
};

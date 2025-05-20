import { get, remove, set } from "./db";
import type { Factors } from "@/models/settings/type";

const SETTINGS = "SETTINGS";

export const removeSettingsData = async () => {
  return Promise.all([remove(SETTINGS)]);
};

export const getSettings = async (): Factors => {
  const data: Factors = await get(SETTINGS);

  return JSON.parse(data);
};

export const setSettings = async (data: Factors): Factors => {
  return set(SETTINGS, JSON.stringify(data));
};

import { get, remove, set } from "./db";
import type { Settings } from "@/models/settings/type";

const SETTINGS = "SETTINGS";

export const removeSettingsData = async () => {
  return Promise.all([remove(SETTINGS)]);
};

export const getSettings = async (): Promise<Settings> => {
  const data: string = await get(SETTINGS);

  return JSON.parse(data);
};

export const setSettings = async (data: Settings): Promise<void> => {
  return set(SETTINGS, JSON.stringify(data));
};

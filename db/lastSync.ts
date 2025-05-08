import { get, set } from "./db";

const LAST_SYNC = "LAST_SYNC";

export const getLastSync = async () => {
  const lastSync = await get(LAST_SYNC);

  return lastSync;
};

export const setLastSync = async (value) => set(LAST_SYNC, value);

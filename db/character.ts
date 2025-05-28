import { get, remove, set } from "./db";
import type { Character } from "@/models/character/type";

const CHARACTER = "CHARACTER";

export const removeCharacterData = async () => {
  return Promise.all([remove(CHARACTER)]);
};

export const getCharacter = async (): Promise<Character> => {
  const data: string = await get(CHARACTER);

  return JSON.parse(data);
};

export const setCharacter = async (data: Character): Promise<void> => {
  return set(CHARACTER, JSON.stringify(data));
};

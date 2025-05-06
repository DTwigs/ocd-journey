import { useContext } from "react";
import { StoreContext } from "@/contexts/StoreContext";

export const useStore = () => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};

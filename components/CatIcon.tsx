// @ts-expect-error: svg
import SVGImg from "../assets/images/CatIcon.svg";

export const CatIcon = ({ color }: { color: string }) => (
  <SVGImg height={24} width={22} color={color} />
);

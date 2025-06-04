// @ts-expect-error: svg
import SVGImg from "../assets/images/CatIcon.svg";

export const CatIcon = ({ color }: { color: string }) => (
  <SVGImg height={28} width={26} color={color} />
);

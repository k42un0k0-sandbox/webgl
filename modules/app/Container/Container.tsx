import { ReactElement } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactElement;
};
export default function Container({ children }: Props) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}

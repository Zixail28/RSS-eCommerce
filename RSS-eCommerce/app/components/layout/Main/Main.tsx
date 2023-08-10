import { FC, PropsWithChildren } from "react";
import styles from "./Main.module.scss";

const Main: FC<PropsWithChildren<{classes: string}>> = ({ children, classes }) => {
  return <main className={`${styles.main} ${classes}`}>{children}</main>;
};

export default Main;
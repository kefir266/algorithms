import styles from "./ElementBar.module.css";

export default function ElementBar({ height }) {
  const style = {
    height: `${height}%`,
  };

  return <div className={styles.bar} style={style}></div>;
}

import ElementBar from "./ElementBar";
import styles from "./ArrayGraph.module.css";

export default function ArrayGraph({ array }) {
  const maxValue = Math.max(...array.map((element) => element.value));
  return (
    <div className={styles.graph}>
      {array.map((element) => (
        <ElementBar
          height={Math.round((element.value * 100) / maxValue)}
          key={element.key}
        ></ElementBar>
      ))}
    </div>
  );
}

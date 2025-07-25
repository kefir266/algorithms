import { useLocalstorageState } from "../hooks/useLocalstorageState";
import { algorithms } from "../constants/algorithms";
import styles from "./AlgorithmConfig.module.css";

export default function AlgorithmConfig({ onGenerateArray, onStartSorting }) {
  const [algorithm, setAlgorithm] = useLocalstorageState(
    "algorithm",
    algorithms.quickSort,
  );
  const [numberOfElements, setNumberOfElements] = useLocalstorageState(
    "numberOfElements",
    10,
  );
  const [delay, setDelay] = useLocalstorageState("delay", 1);

  const handleSubmit = () => {
    onGenerateArray(numberOfElements);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={styles.settings}>
        <div className={styles.row}>
          <label className={styles.label}>Select Algorithm:</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            {Object.keys(algorithms).map((key) => (
              <option value={key} key={key}>
                {algorithms[key]}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Numbers of elements:</label>
          <input
            className={styles.input}
            type="text"
            value={numberOfElements}
            onChange={(e) => setNumberOfElements(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Delay in ms:</label>
          <input
            className={styles.input}
            type="text"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <button className={styles.generateButton} onClick={handleSubmit}>
            Generate
          </button>
          <button
            className={styles.startButton}
            onClick={() => onStartSorting(delay)}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

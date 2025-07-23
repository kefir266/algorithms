import { useState } from "react";

export default function AlgorithmConfig({ onGenerateArray, onStartSorting }) {
  const [algorithm, setAlgorithm] = useState("");
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [delay, setDelay] = useState(1);
  const handleSubmit = () => {
    onGenerateArray(numberOfElements);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-lg font-semibold">Select Algorithm:</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="dijkstra">QuickSort</option>
        </select>
      </div>
      <div>
        <label className="text-lg font-semibold">Numbers of elements:</label>
        <input
          className="number-input"
          type="text"
          value={numberOfElements}
          onChange={(e) => setNumberOfElements(e.target.value)}
        />
      </div>
      <div>
        <label>Delay in ms:</label>
        <input
          className="number-input"
          type="text"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
      </div>
      <div>
        <button className="generate-button" onClick={handleSubmit}>
          Generate
        </button>
        <button className="start-button" onClick={() => onStartSorting(delay)}>
          Start
        </button>
      </div>
    </div>
  );
}

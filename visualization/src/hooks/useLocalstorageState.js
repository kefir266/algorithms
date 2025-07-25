import { useEffect, useState } from "react";

export function useLocalstorageState(key, initialValue) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value],
  );

  return [value, setValue];
}

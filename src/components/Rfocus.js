import React, { useState, useMemo } from "react";

function ExpensiveCalculation({ number }) {
  console.log("Calculating...");
  return number * number;
}

function Rfocus() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const memoizedValue = useMemo(() => ExpensiveCalculation({ number: count }), [count]);

  return (
    <div>
      <h1>Result: {memoizedValue}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
  );
}

// export default App;
export default Rfocus;

import { useState } from "react";
import Statistic from "./components/Statistic";
import Button from "./components/Button";
function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  return (
    <>
      <div className="container">
        <h1>give feedback</h1>
        <Button clickfunc={() => setCount1(count1 + 1)} label="good" />
        <Button clickfunc={() => setCount2(count2 + 1)} label="neutral" />
        <Button clickfunc={() => setCount3(count3 + 1)} label="bad" />
        <Statistic count1={count1} count2={count2} count3={count3} />
      </div>
    </>
  );
}

export default App;

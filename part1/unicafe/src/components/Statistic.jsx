import React from "react";
import StatisticLine from "./StatisticLine";
function Statistic({ count1, count2, count3 }) {
  if (count1 === 0 && count2 === 0 && count3 === 0) {
    return (
      <div className="container">
        <h1>statistics</h1>
        <span>No feedback given</span>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>statistics</h1>
      <StatisticLine text="good" value={count1} />
      <StatisticLine text="neutral" value={count2} />
      <StatisticLine text="bad" value={count3} />
      <StatisticLine text="all" value={count1 + count2 + count3} />
      <StatisticLine
        text="average"
        value={(
          (count1 * 1 + count2 * 0 + count3 * -1) /
          (count1 + count2 + count3)
        ).toFixed(2)}
      />
      <StatisticLine
        text="positive"
        value={((count1 / (count1 + count2 + count3)) * 100).toFixed(2) + "%"}
      />
    </div>
  );
}

export default Statistic;

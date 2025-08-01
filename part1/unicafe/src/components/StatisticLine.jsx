import React from "react";

function StatisticLine({ text, value }) {
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: "50px", border: "1px solid black" }}>{text}</td>
          <td style={{ width: "50px", border: "1px solid black" }}>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default StatisticLine;

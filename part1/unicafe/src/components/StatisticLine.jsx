import React from "react";

function StatisticLine({ text, value }) {
  return (
    <table>
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr>
    </table>
  );
}

export default StatisticLine;

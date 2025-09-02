import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/"
        );
        const data = await response.data;
        console.log(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountry();
  }, []);
  return (
    <>
      <form action="">
        <label htmlFor="country">find countries</label>
        <input
          type="text"
          placeholder="Enter the name of countries to search!"
        />
      </form>
    </>
  );
}

export default App;

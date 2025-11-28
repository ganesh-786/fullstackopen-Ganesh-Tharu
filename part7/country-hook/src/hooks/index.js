import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          // The API returns an array, take the first element
          const countryData = Array.isArray(response.data) ? response.data[0] : response.data
          setCountry({ data: countryData, found: true })
        })
        .catch(() => {
          setCountry({ found: false })
        })
    } else {
      setCountry(null)
    }
  }, [name])

  return country
}


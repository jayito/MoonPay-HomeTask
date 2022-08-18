import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrencyItem from './components/CurrencyItem'
import Radio from './components/Radio'
import SelectBox from './components/SelectBox'

function App() {
  const [allCurrencies, setAllCurrencies] = useState([])
  const [filteredCurrencies, setFilteredCurrencies] = useState([])
  const [isSupportedUS, setIsSupportedUS] = useState(false)
  const [isAvailableTestMode, setIsAvailableTestMode] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  // Fetch currencies from API
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await axios.get('https://api.moonpay.com/v3/currencies')
        setAllCurrencies(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCurrencies();
  }, [])

  useEffect(() => {
    const filterHandler = () => {
      let _filteredCurrencies = allCurrencies

      // Filter the currencies that is supported in US
      if (isSupportedUS) {
        _filteredCurrencies = _filteredCurrencies.filter((currency: any) => currency.isSupportedInUS === true)
      }

      // Filter the currencies that is available in Test Mode
      if (isAvailableTestMode) {
        _filteredCurrencies = _filteredCurrencies.filter((currency: any) => currency.supportsTestMode === true)
      }

      //Filter by sort
      switch (sortBy) {
        case "name": 
          _filteredCurrencies.sort(sortName)
          break;
        case "code":
          _filteredCurrencies.sort(sortCode)
          break;
        default: 
          break;
      }

      _filteredCurrencies = [..._filteredCurrencies]
      
      setFilteredCurrencies(_filteredCurrencies)
    }

    filterHandler()
  }, [allCurrencies, isSupportedUS, isAvailableTestMode, sortBy])

  // Radio handler
  const supportChangeHandler = (e: any) => {
    const isTrue = (e.target.value === "true")
    setIsSupportedUS(!isTrue)
  }

  // Radio handler
  const availableChangeHandler = (e: any) => {
    const isTrue = (e.target.value === "true")
    setIsAvailableTestMode(!isTrue)
  }

  // Sort by handler
  const sortByHandler = (val: string) => {
    setSortBy(val)
  }

  // Random shuffle handler
  const suffleHandler = () => {
    let _filteredCurrencies = filteredCurrencies
    _filteredCurrencies.sort(() => Math.random() - 0.5)
    _filteredCurrencies = [..._filteredCurrencies]
      
    setFilteredCurrencies(_filteredCurrencies)
  }

  // Sort array by using name
  const sortName = (a: any, b: any) => {
    const nameA = a.name.toLowerCase(); // ignore upper and lowercase
    const nameB = b.name.toLowerCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  }

  // Sort array by using code
  const sortCode = (a: any, b: any) => {
    const codeA = a.code.toLowerCase(); // ignore upper and lowercase
    const codeB = b.code.toLowerCase(); // ignore upper and lowercase
    if (codeA < codeB) {
      return -1;
    }
    if (codeA > codeB) {
      return 1;
    }

    return 0;
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center pb-12">
        MoonPay Currencies
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-6 items-center">
          <Radio label="Is supported in US" id="supported-us" val={isSupportedUS} onChange={(e: any) => supportChangeHandler(e)} />
          <Radio label="Is available in Test Mode" id="available-test-mode" val={isAvailableTestMode} onChange={(e: any) => availableChangeHandler(e)} />
          <button className="border-2 border-blue-500 bg-blue-500 hover:bg-white text-white hover:text-black rounded-lg px-4 py-1" onClick={suffleHandler}>
            Random Shuffle
          </button>
        </div>
        <SelectBox val={sortBy} onChange={(val: string) => sortByHandler(val)} />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-8 lg:gap-12">
        {filteredCurrencies.map((currency, index) => (
          <CurrencyItem data={currency} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;

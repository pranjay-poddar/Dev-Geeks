import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'
import './App.css'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      )

      console.log(result.data)

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])
  
  const queryFunction = (q) =>{
    setQuery(q)
  }
  
  return (
    <div className='container'>
      <Header />
      <Search getQuery={queryFunction} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default App

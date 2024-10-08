
import './App.css'

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Create from './components/Create/Create'

function App() {

  return (
    <>
      <Header />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  )
}

export default App

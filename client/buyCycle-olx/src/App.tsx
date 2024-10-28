
import './App.css'

import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Create from './components/Create/Create'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Cycle from './components/DetailCycle/DetailCycle';

import AuthGuard from './components/guards/AuthGuard';
import NotAuthGuard from './components/guards/NotAuthGuard';

function App() {

  return (
    <>
      <AuthProvider>
        <Header />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Cycle />}></Route>

          <Route element={<AuthGuard />}>
            {/* <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} /> */}
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route element={<NotAuthGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App

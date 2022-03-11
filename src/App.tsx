import React, { useContext, useState } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Admin from './components/Admin';
import User from './components/User';
import Edit from './components/Edit';
import Header from './components/Header';

export const initialState = {
  user: '',
  isLoggedin: false,
  isAdmin: false,
}

export const AppContext = React.createContext(initialState)

const RequiredAuth = ({ children }: any) => {
  const auth = useContext(AppContext);

  return auth.isLoggedin ? children : <Navigate to="/" />
}

function App() {
  const [state, setState] = useState(initialState)

  return (
    <ChakraProvider>
      <AppContext.Provider value={state}>
        <Router>
          <div className="App">
            <Header onUpdateAuth={setState} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<RequiredAuth><Admin /></RequiredAuth>} />
              <Route path="/articles" element={<RequiredAuth><User /></RequiredAuth>} />
              <Route path="/edit" element={<RequiredAuth><Edit /></RequiredAuth>} />
              <Route path="/edit/:id" element={<RequiredAuth><Edit /></RequiredAuth>} />
            </Routes>
          </div>
        </Router>
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;

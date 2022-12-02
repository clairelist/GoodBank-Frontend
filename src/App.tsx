import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext, User } from './context/user.context';
import { AppRoutes } from './router/AppRoutes';
import {ThemeProvider, createTheme} from '@mui/material';
import Navbar from './components/navbar/Navbar';

const theme = createTheme ({
  palette: {
    primary: {
      main: "#9F86C0",
      light: "#BE95C4",
      dark: "#5E548E"
    },
    secondary: {
      main: "#9F86C0",
      light: "#E0B1CB",
      dark: "#231942"
    }
  }
});

function App() {
  const [user, setUser] = useState<User | undefined>();
  const value = { user, setUser };

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={value}>
        <Router>
          <AppRoutes></AppRoutes>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;

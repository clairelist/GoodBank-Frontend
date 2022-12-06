import { createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { User, UserContext } from './context/user.context';
import { AppRoutes } from './router/AppRoutes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9F86C0',
      light: '#BE95C4',
      dark: '#5E548E',
    },
    secondary: {
      main: '#9F86C0',
      light: '#E0B1CB',
      dark: '#231942',
    },
  },
});

function App() {
  const [user, setUser] = useState<User | undefined>();
  const value = { user, setUser };
  //add the navbar here later on
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
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <AppRoutes></AppRoutes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import back from './assets/back.png'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthScreen from './screens/AuthScreen';
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import useStore from './store';
import AppLoader from './components/layouts/AppLoader';

const App = () => {
  const { loader, setLoginStatus } = useStore();
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginStatus(!!user);
    });
    return () => unsub();
  }, []);

  if (loader) return <AppLoader />;

  return (
    <ThemeProvider theme={theme}>
      <div style={{backgroundImage: `url(${back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
      }}>
        <CssBaseline />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthScreen />} />
        </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;

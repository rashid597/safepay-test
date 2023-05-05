import React from 'react';
import Home from './components/pages/Home';
import Lookup from './components/pages/Lookup';
import { createTheme, ThemeProvider } from '@material-ui/core';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const theme = createTheme({
  palette:{
    primary:{
      main: '#00cf83',
      contrastText:'#fff',
      light: '#193A8C'
    },

  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home className='home' />} />
            <Route path='/lookup' element={<Lookup className='lookup' />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

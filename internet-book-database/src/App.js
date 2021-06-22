import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import { Container, CssBaseline } from '@material-ui/core';

const sections = [
  { title: 'Books', url: '#' },
  { title: 'Magazines', url: '#' },
  { title: 'Comics', url: '#' }
]

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Book database" sections={sections} />
      </Container>
    </React.Fragment>
  );
}

export default App;

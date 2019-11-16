import React from 'react';
import logo from './logo.svg';
import './App.css';

import NameForm from './components/NameForm';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className="App">
      <Button variant="contained" color="primary">
      Hello World
    </Button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NameForm />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

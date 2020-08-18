import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import firebase from './firebase.js';
import './global.css'

class App extends Component {


  state = {
    firebaseInitiated: false
  }

  componentDidMount() {
    firebase.isInitialized().then(res => {
      this.setState({ firebaseInitiated: res });
    })
  }

  render() {
    return this.state.firebaseInitiated !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    ) : (
        <h1>Carregando...</h1>
      )
  }
}

export default App;

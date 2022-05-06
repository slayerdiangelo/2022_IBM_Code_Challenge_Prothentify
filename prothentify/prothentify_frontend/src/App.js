import React, { Component } from 'react';
import './App.css';
import Intro from './components/IntroComponent';
import Man from './components/ManComponent';
import Sel from './components/SelComponent';
import RC from './components/RCComponent';
import Ver from './components/VerComponent'
import { Routes, Route } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar color='dark'>
          <NavbarBrand href='/'>
            Prothentify
          </NavbarBrand>
        </Navbar>
        <Routes>
          <Route exact path = '/' element = { <Intro/> }/>  
          <Route path = '/manufacturer' element = { <Man/> } />
          <Route path = '/sell-product' element = { <Sel/> } />
          <Route path = '/retailer-customer' element = { <RC/> } />
          <Route path = '/verify' element = { <Ver/> } />
        </Routes>
      </div>
    )
  }
}

export default App;

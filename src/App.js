import React, { Component } from 'react';
import Logo from './Logo';
import Navigation from './Navigation'
import Rank from './Rank'
//import facerecognition from '.FaceRecognition '
import './App.css';
import ImageLinkForm from './ImageLinkForm';
import Particles from 'react-particles-js';

const particleOptions = {
  particles: {
    number: {
      value: 150,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}
    


class App extends Component {
  render() {
    return (
      <div>
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/> 
        
        {//<FaceRecognition/>
        }
      </div>
      
    );
  }
}

export default App;

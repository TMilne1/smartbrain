import React, { Component } from 'react';
import Logo from './Logo';
import Navigation from './Navigation'
import Rank from './Rank'
import './App.css';
import ImageLinkForm from './ImageLinkForm';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import FaceRecognition from './FaceRecognition'

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

const app = new Clarifai.App({
  apiKey: 'cf236557d3864e529f2636a040175a08'
});
    


class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      image: ""
    }
  }

  onInputChange =(event)=>{
   
    this.setState({ input: event.target.value }, function () {
      console.log(this.state.value)});

    console.log(this.state.input)
  }

  onButtonPress=()=>{
    this.setState({image:this.state.input})
    //console.log("this is it:", this.state.image)
    //first input is the model ID - that ID is for Face Detection
    console.log(this.state.image)
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', this.state.input).then(
      function (response) {
        // do something with response
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function (err) {
        // there was an error
      }
    );
    
  }

  render() {
    return (
      <div>
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonPress={this.onButtonPress}/> 
        
        //<FaceRecognition InputImage={this.state.image}/>
        
      </div>
      
    );
  }
}

export default App;

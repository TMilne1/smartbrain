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
      image: "",
      boundingBox:{} 
    }
  }

  calculateFaceLocation=(data)=>{
    
    const boundingBoxForFace=data.outputs[0].data.regions[0].region_info.bounding_box
    const image =  document.getElementById('uploadedPicture')
    const width = Number(image.width)
    const height = Number(image.height)

 
    return{
      top: boundingBoxForFace.top_row * height,
      bottom: height - (boundingBoxForFace.bottom_row * height),
      left: boundingBoxForFace.left_col * width,
      right: width -(boundingBoxForFace.right_col * width),
    }
    
  }

  displayFaceBox=(box)=>{
    this.setState({boundingBox:box})
  }

  onInputChange=(event)=>{
    this.setState({ input: event.target.value })
  }

  onButtonPress=()=>{
    this.setState({image:this.state.input})
    //first input is the model ID - that ID is for Face Detection
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', this.state.input)
      .then((response)=>this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err=>console.log(err))
  
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
        <FaceRecognition box={this.state.boundingBox} InputImage={this.state.image}/>
        
      </div>
      
    );
  }
}

export default App;

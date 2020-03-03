import React, { Component } from 'react';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation'
import Rank from './Components/Rank/Rank'
import './App.css';
import ImageLinkForm from './Components/ImagLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'

const particleOptions = {
  particles: {
    number: {
      value: 100,
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
      boundingBox:{}, 
      route:'signIn'
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

  displayFaceBox=box=>{this.setState({boundingBox:box})}
  onInputChange=event=>{this.setState({ input: event.target.value })}

  onButtonPress=()=>{
    this.setState({image:this.state.input})
    //first input is the model ID - that ID is for Face Detection
    app.models.predict('a403429f2ddf4b49b307e318f00e528b', this.state.input)
      .then((response)=>this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err=>console.log(err))
  }

  onRouteChange=route=>{this.setState({route})}


  render() {
    return (
      
      <div>
        <Particles className='particles'params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.route!=='signIn'} />

        {this.state.route === 'signIn' ?   
          <div> <Logo/><SignIn onRouteChange={this.onRouteChange}></SignIn></div>
          :
          (
            this.state.route === 'home'? 
              <div>
                <div><Logo/></div>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonPress={this.onButtonPress}/> 
                <FaceRecognition box={this.state.boundingBox} InputImage={this.state.image}/>
              </div>
              :
              <div><Register onRouteChange={this.onRouteChange}/></div>
          ) 
 
        }
      </div>
      
    );
  }
}

export default App;

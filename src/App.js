import React, { Component } from 'react';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation'
import Rank from './Components/Rank/Rank'
import './App.css';
import ImageLinkForm from './Components/ImagLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';

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

const initialState = {
  isSignedIn: false,
  input: '',
  image: "",
  boundingBox: {},
  route: 'signIn',
  user: {
    id: "",
    name: "",
    email: "",
    entries: "0",
    joined: ""
  }
}


class App extends Component {
  constructor(){
    super();
    this.state= initialState;
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
    fetch('https://smart-brain-api-13.herokuapp.com/imageURL', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .catch(err => console.log('error using API'))
      .then(response => response.json())
      .then((response)=>{
        if(response){
          fetch('https://smart-brain-api-13.herokuapp.com/image',{
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(resp => resp.json())
          .then(entry => {
            this.setState(Object.assign(this.state.user, {entries:entry}))
          })
          .catch(err=>console.log(err, 'error fetching image'))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err=>console.log('error'))
  }

  onRouteChange=(route)=>{ 
    if (route === 'signIn' || route === 'register'){
      this.setState({
          isSignedIn: false,
          input: '',
          image: "",
          boundingBox: {},
          route: route,
          user: {
            id: "",
            name: "",
            email: "",
            entries: "0",
            joined: ""
          }
      })
    }
    this.setState({ route: route });  
  }
    
  
  
  loadUser=(databaseUserInfo)=>{
    this.setState({user: {
        id: databaseUserInfo.id,
        name: databaseUserInfo.name,
        email: databaseUserInfo.email,
        entries: databaseUserInfo.entries,
        joined: databaseUserInfo.joined
      }
    })
    this.setState({isSignedIn:true})
    
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles'
        params={particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        
        {this.state.route === 'signIn' ?   
          <div> <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/></div>
          
          :
          (
            this.state.route === 'home'? 
              <div>
                <div><Logo/></div>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonPress={this.onButtonPress}/> 
                <FaceRecognition box={this.state.boundingBox} InputImage={this.state.image}/>
              </div>
              :
              <div><Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/></div>
          ) 
        }
      </div>
    )
    
  }
}

export default App;

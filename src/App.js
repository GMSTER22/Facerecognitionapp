import React, { Component } from 'react';
import Particles from 'react-tsparticles';
// import Clarifai from "clarifai";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';


//settings for react-tsparticles for background animation
const particlesOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 30,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 200,
        opacity: 0.8,
        size: 4,
      },
      push: {
        quantity: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#fff",
    },
    links: {
      color: "#fff",
      distance: 200,
      enable: true,
      opacity: .4,
      width: 0,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "star",
    },
    size: {
      random: true,
      value: 4,
    },
  },
  detectRetina: true,
}

const initialState = {
  input: "",
  imgUrl: "", 
  box: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const imageWidth = +image.width;
    const imageHeight = +image.height;
    let facesInfo = []

    data.forEach(face => {
      const faceBoxInfo = face.region_info.bounding_box;
      const { bottom_row, left_col, right_col, top_row } = faceBoxInfo;
      const top = Number(top_row) * imageHeight;  
      const left = Number(left_col) * imageWidth;  
      const right = Number( imageWidth - (right_col * imageWidth));
      const bottom = Number( imageHeight - (bottom_row * imageHeight));
      
      facesInfo.push({top, left, right, bottom});
    });

    this.setState({ box : facesInfo });
  }

  onInputChange = (event) => {
    this.setState({ input : event.target.value });
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    } 
    this.setState({ route: route });
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    this.setState({input: ""});

    const fetchPositions = () => {
      fetch("http://localhost:3000/image", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            imgUrl: this.state.input
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
        fetch("http://localhost:3000/image", {
          method: "PUT",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(data => {
          this.setState(Object.assign(this.state.user, {entries: data.entries}))
        })
        }
        this.calculateFaceLocation(data);
      });
    }

    fetchPositions();
  }

  render() {
    return (
      <div className="App">
        <Particles 
        id="tsparticles"
        options={particlesOptions}
        />
        <Navigation 
        onRouteChange={this.onRouteChange}
        isSignedIn={this.state.isSignedIn} />
        { this.state.route === "home" ?
          <div>
            <Logo />
            <Rank
            name={this.state.user.name}
            entries={this.state.user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
              value={this.state.input} 
            />
            {this.state.imgUrl && <FaceRecognition 
            imgSource={this.state.imgUrl} 
            facesLocation={this.state.box}
            />}
          </div> 
          :
          (
            this.state.route === "signin" ?
            <Signin 
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser} />
            :
            <Register 
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser} />
          )
        }
    </div>
    )
  };
}

export default App;
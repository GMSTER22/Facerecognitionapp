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

const clarifaiEndpoint = "https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs";

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
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 1,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#000",
    },
    links: {
      color: "#000",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      // random: false,
      // speed: 3,
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
      type: "circle",
    },
    size: {
      random: true,
      value: 10,
    },
  },
  detectRetina: true,
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "", 
      box: [],
      route: "signin",
      isSignedIn: false
    }
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
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    } 
    this.setState({ route: route });
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    this.setState({input: ""});

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "gaelxoaehons2k",
        "app_id": "d7876ff90a064d7c85606f597b33f89c"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": `${this.state.input}`
            }
          }
        }
      ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Key c89051a9cd344243ba0522b9c85c855b`
      },
      body: raw
    };

    const fetchPositions = async(url) => {
      try {
        const res = await fetch(url, requestOptions);
        const result = await res.text();
        const data = await JSON.parse(result, null, 2).outputs[0].data.regions;
        this.calculateFaceLocation(data);
        console.log(this.state.box);
      } catch(error) {
        console.log("error", error);
      }
    }

    fetchPositions(clarifaiEndpoint);
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
            <Rank />
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
            <Signin onRouteChange={this.onRouteChange} />
            :
            <Register onRouteChange={this.onRouteChange} />
          )
        }
    </div>
    )
  };
}

export default App;
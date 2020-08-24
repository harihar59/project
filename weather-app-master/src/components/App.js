import React from "react";
import "./App.css";
import weather from "../apis/api";
import WeatherBody from "./WeatherBody/WeatherBody";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import Chart from "./charts/chart"
import SearchHome from "./SearchBar/searchhome";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Axios from 'axios';

import {Bar} from 'react-chartjs-2';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: [],
      city: null,
      isLoaded: false,
      userPosition: {
        latitude: 35,
        longitude: 139
      },
      

    };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({ userPosition: pos });

        //Weather Api call
        Axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${this.state.userPosition.latitude}&lon=${this.state.userPosition.longitude}&key=3883f69ab25f46dc92cdf2b5d66a1517`).then(res => {
          console.log("executing responce section ");
          
          const temp = res.data.data;
          const city = res.data.city_name;
      

          this.setState({ 
            temp,
            city });
        });
      }


      )}
}

  
  searchCity = async city => {
    await weather
      .get(`daily?city=${city}&key=3883f69ab25f46dc92cdf2b5d66a1517`)
      .then(res => {
        const temp = res.data.data;
        
        const city = res.data.city_name;

        this.setState({
          temp,
          city
        });
      
      
      }).catch(() => { 
        
    
        alert("Not a Valid City Name")
        window.location.reload();
    });
     
  };

  render() {
    // Methods
    
      const minTemp = this.state.temp.map(el => {
      
        return parseInt(el.low_temp);
      });

      const maxTemp = this.state.temp.map(el => {
        return parseInt(el.max_temp);
      });

      const icon = this.state.temp.map(el => {
        return el.weather.code;
      });

      const description = this.state.temp.map(el => {
        return el.weather.description;
      });
    

    const name = this.state.city;

    const state = {
      labels: ['Monday', 'Tuesday', 'Wednesday',
               'Thursday', 'Friday'],
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [((minTemp[0] + maxTemp[0])/2), ((minTemp[1] + maxTemp[1])/2), ((minTemp[2] + maxTemp[2])/2), ((minTemp[3] + maxTemp[3])/2), ((minTemp[4] + maxTemp[4])/2)]
        }
      ]
    }

    // Loader
    if (!this.state.isLoaded) {
      return <Loader msg={"Loading..."} />;
    }
    return (
      <div className="App">

           

         
        <SearchBar city={this.state.city}  /> 
        
      
  
      </div>
    );
  }
}

export default App;

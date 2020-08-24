import React from "react";
import { withRouter } from 'react-router';
import "./SearchBar.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SearchHome from './searchhome';
import Display from './display';

import Final from '../final.js'
import weather from "../../apis/api";
import Chart from "../charts/chart";
import WeatherBody from "../WeatherBody/WeatherBody";
import { hashHistory } from 'react-router';
import { createHashHistory } from 'history';
import "../App.css";
import "../WeatherBody/WeatherBody.css"

import Axios from 'axios';
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temp: [],
      city: null,
      isLoaded: false,
      userPosition: {
        latitude: 35,
        longitude: 139
      },};
    this.searchCity = this.searchCity.bind(this);
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
 

  onSubmit = e => {
   e.preventDefault();
    if (this.state.city === "") {
      alert("City can not be empty");
    } else {
      this.searchCity(this.state.city);
      
    }
    

    //this.setState({ city: "" });
   
   
   
  };

  onChange = e => {
    
    this.setState({ [e.target.name]: e.target.value });
   
    
  }

  submitForm (e) {
    e.preventDefault();
    console.log("In here");

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
      //console.log(this.state.city);
      //console.log(weather);
      this.setState({isLoaded: true});
      
      }).catch(() => { 
        
    
        alert("Not a Valid City Name")
        window.location.reload();
    });
     
  };
  
    
  render() {


    if(this.isLoaded){
      return (
          <h1> Loading </h1>
       );
    }
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
    return (
     
      <div >
      <div>
        <hr/>
        <hr/>

        <div className="SearchBarChilds">
          

           {    /* <form onSubmit={this.onSubmit} className="formSearchCity">
            <input
              type="text"
              name="city"
              id="inputSearchCity"
              onChange={this.onChange}
              placeholder="Search City..."
            /> */     }
            <Router>
            <form onSubmit={this.onSubmit} className="formSearchCity"  >
            <input
              type="text"
              name="city"
              id="inputSearchCity"
              onChange={this.onChange}
              placeholder="Search City..."
            />
            <Link  to={`/${this.state.city}`} type="submit" className="btn btn-outline-info text-white"  >
              Verify Location
              </Link>
            </form>
            <Route path ="/" >
              <h1> Welcome To the Weather App</h1>
            </Route>
            <Route path={`/${this.state.city}`} >

            <Final city = {this.state.city}   />
            </Route>
          
            </Router>
           
                
          
        
        </div>
      </div>
      </div>
    );
  }
}

export default SearchBar;

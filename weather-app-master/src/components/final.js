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


class Final extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: [],
      city: this.props.city,
      isLoaded: false,
      userPosition: {
        latitude: 35,
        longitude: 139
      },
      minTemp: [],
      maxTemp: [],
      icon: [], 
      description: [],
      name: "",
      setDefault: 1,
      arrayDefault: [0,0,0,0,0]
      

    };
    
  }

  searchCity = async city => {
    await weather
      .get(`daily?city=${city}&key=3883f69ab25f46dc92cdf2b5d66a1517`)
      .then(res => {
        const temp = res.data.data;
        
        const city = res.data.city_name;
        const setDefault = 0;

        
          //console.log(city);
          //console.log(minTemp[0]);

        this.setState({
          temp: temp,
          city: city,
          setDefault: setDefault,
          
        });
    //console.log(temp);
      //console.log(this.state.temp);
     // console.log(this.state.searchDefault);
      //console.log(weather);
      
      
      });
     
  };


 
  componentDidMount() {

    this.searchCity(this.props.city);
    
  }

  
  render() {
    // Methods
    var minTemp;
    var maxTemp;
    var icon;
    var description;
    
    if(!(this.state.temp)) {

        minTemp = [...this.state.arrayDefault];
        maxTemp = [...this.state.arrayDefault];
          icon = [...this.state.arrayDefault];
           description = [...this.state.arrayDefault];
          
    }

    else{

     

         minTemp = this.state.temp.map(el => {
      
            return parseInt(el.low_temp);
          });
    
          maxTemp = this.state.temp.map(el => {
            return parseInt(el.max_temp);
          });
           icon = this.state.temp.map(el => {
            return el.weather.code;
          });
    
           description = this.state.temp.map(el => {
            return el.weather.description;
          });
    
     
       

    }
    const name = this.state.city;
 
    
     

    
    return (
        <div className="App">

        
        
        
        <Chart minTemp={minTemp} maxTemp={maxTemp} name = {name}/>
        <WeatherBody day={"Mon"} icon={icon[0]} minTemp={minTemp[0]} maxTemp={maxTemp[0]} description={description[0]} />
            <WeatherBody day={"Tue"} icon={icon[1]} minTemp={minTemp[1]} maxTemp={maxTemp[1]} description={description[1]} />
            <WeatherBody day={"Wed"} icon={icon[2]} minTemp={minTemp[2]} maxTemp={maxTemp[2]} description={description[2]} />
            <WeatherBody day={"Thu"} icon={icon[3]} minTemp={minTemp[3]} maxTemp={maxTemp[3]} description={description[3]} />
          <WeatherBody day={"Fri"} icon={icon[4]} minTemp={minTemp[4]} maxTemp={maxTemp[4]} description={description[4]} />
         
       
        

    </div>
    );
  }
}

export default Final;

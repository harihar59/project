import React from "react";
import "./SearchBar.css";
import SearchBar from './SearchBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class SearchHome extends React.Component {
  state = {
    city: ""
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.city === "") {
      alert("City can not be empty");
    } else {
      this.props.searchCity(this.state.city);
    }

    this.setState({ city: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
                      
                   

  render() {
    return (
      
        
        <form onSubmit={this.onSubmit} className="formSearchCity">
            <input
              type="text"
              name="city"
              id="inputSearchCity"
              onChange={this.onChange}
              placeholder="Search City..."
            />
            
            <button type="submit" className="btn btn-outline-info text-white">
              Search
            </button>
          </form>
        
        
        
      
          
    );
  }
}

export default SearchHome;

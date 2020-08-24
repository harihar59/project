/* App.js */

import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2'
import React from "react";
import './graph.css'


class Chart extends React.Component {	
	


	render() {

		const state = {
			labels: ['Monday', 'Tuesday', 'Wednesday',
					 'Thursday', 'Friday'],
			datasets: [
			  {
				label: 'Average-Daily-Temperature',
				backgroundColor: 'rgba(255,255,0,0.3)',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 2,
				data: [((this.props.minTemp[0] + this.props.maxTemp[0])/2), ((this.props.minTemp[1] + this.props.maxTemp[1])/2), ((this.props.minTemp[2] + this.props.maxTemp[2])/2), ((this.props.minTemp[3] + this.props.maxTemp[3])/2), ((this.props.minTemp[4] + this.props.maxTemp[4])/2)]
			  }
			]
		  }
		
		
		return (
		
		
		<div class="graph" >
        <Line 
          data={state}
          options={{
            title:{
              display:true,
              text: `${this.props.name} Temperature`,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
			},
			scales:{
				yAxes: [{
					display: true,
					ticks: {
						min:0
					}
				}]
			}
          }}
        />
      </div>
	  
		
		);
	}
}
 
export default Chart;
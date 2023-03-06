import React from 'react'
import axios from 'axios'
import CAQResult from './CAQResult';
import './App.css'

export default class CityAQResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            country : props.country,
            city : props.city,
            error : null,
            isDisabled : true,
            isLoading : true,
            results : [],
            lidz : "resultsLoadingSpan"+Math.random().toString(),
            eidz : "resultsEmptySpan"+Math.random().toString(),
            ridz : "resultsErrorSpan"+Math.random().toString(),
        }
    }
      
    async getCityAirQuality() {
        const apiFilterAttr = "&country="+this.state.country+"&city="+this.state.city;
        try {
            const response = await axios.get("https://api.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false"+apiFilterAttr);
            console.log(response);
            this.state.results = response.data.results;
            this.setState({ isLoading : false, isDisabled : false });
            const loadingSpan = document.getElementById(this.state.lidz);
            loadingSpan.setAttribute("hidden", "hidden");
            if(this.state.results.length<=0) {
                const emptySpan = document.getElementById(this.state.eidz);
                emptySpan.removeAttribute("hidden");
            }
        } catch(error) {
            console.log(error);
            this.state.error = error;
            const errorSpan = document.getElementById(this.state.ridz);
            errorSpan.removeAttribute("hidden");
    }
    }

    componentDidMount() {
        if(this.state.country && this.state.city && this.state.country.length>0 && this.state.city.length>0) {
            this.getCityAirQuality();
        }
    }

    render() {
        return (
            <div className="results">
                <span id={this.state.lidz}>Loading...</span>
                <span id={this.state.eidz} hidden="hidden">No Results</span>
                <span id={this.state.ridz} hidden="hidden">Error Getting Results</span>
                {this.state.results.map(({ id, name, parameters}) => (
                    <CAQResult
                        key={id}
                        name={name}
                        lastValue={parameters[0].lastValue}
                        displayName={parameters[0].displayName}
                        unit={parameters[0].unit}
                        lastUpdated={parameters[0].lastUpdated}
                    />
                ))}
            </div>
        )
    }
} // class CityAQResults
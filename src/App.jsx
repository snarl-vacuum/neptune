import React from 'react'
import CityAirQuality from './CityAirQuality';
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="App">
                <h2>Air Quality Assessment</h2>
                <CityAirQuality id="caq1" />
            </div>
        )
    }
}

export default App;

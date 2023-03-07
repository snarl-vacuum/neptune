import React from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
export default class SelectCountry extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectOptions : [],
            error : null,
            isDisabled : true,
            isLoading : true,
        }
    }
      
    handleChange = (event, newValue) => {
        var v = "";
        if(newValue&&newValue.value) {
            v = newValue.value;
        }
        //alert('SelectCountry.handleChange:'+v);
        this.props.onCountryChange(v);
    }

    async getOptions() {
        try {
            const response = await axios.get("https://api.openaq.org/v2/countries?limit=200&page=1&offset=0&sort=asc&order_by=country")
            console.log(response);
            const data = response.data.results;
        
            const options = data.map(d => ({
              "value" : d.code,
              "label" : d.name
            }));
            this.setState({ selectOptions : options, isLoading : false, isDisabled : false });
        } catch(error) {
            console.log(error);
            this.state.error = error;
        }
    }

    componentDidMount() {
        this.getOptions();
    }

    render() {
        const country = this.props.country;
        return (
            <div>
                <Autocomplete
                    options={ this.state.selectOptions } 
                    onChange={ this.handleChange } 
                    disabled={ this.state.isDisabled }
                    loading={ this.state.isLoading }
                    loadingText="Loading..."
                    disablePortal
                    renderInput={(params) => <TextField {...params} label="Search Countries..." />} 
                />
            </div>
        )
    }
} // class SelectCountry
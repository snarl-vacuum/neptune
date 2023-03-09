import ReactDOM from 'react-dom'
import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import SelectCountry from './SelectCountry';
import CityAQResults from './CityAQResults';
import './App.css'

import { styled } from '@mui/system';
import InputUnstyled from '@mui/base/InputUnstyled';

const txtblue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
};
  
const txtgrey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};
  
const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.0;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? txtgrey[300] : txtgrey[900]};
    background: ${theme.palette.mode === 'dark' ? txtgrey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? txtgrey[700] : txtgrey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? txtgrey[900] : txtgrey[50]};
  
    &:hover {
      border-color: ${txtblue[400]};
    }
  
    &:focus {
      border-color: ${txtblue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? txtblue[500] : txtblue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
    `,
);

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

const btnblue = {
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};
  
const btngrey = {
    100: '#eaeef2',
    300: '#afb8c1',
    900: '#24292f',
};
  
const CustomButton = styled(ButtonUnstyled)(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: ${btnblue[500]};
    padding: 12px 24px;
    border-radius: 12px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? btngrey[900] : btngrey[100]};
  
    &:hover {
      background-color: ${btnblue[600]};
    }
  
    &.${buttonUnstyledClasses.active} {
      background-color: ${btnblue[700]};
    }
  
    &.${buttonUnstyledClasses.focusVisible} {
      box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
    `,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <InputUnstyled slots={{ input: StyledInputElement }} {...props} ref={ref} />
    );
});

export default class CityAirQuality extends React.Component {
    constructor(props) {
        super(props)
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.state = {
            country : "",
            city : "",
            idz : "cityAQResultsDiv"+Math.random().toString(),
        }
    }
      
    handleCountryChange = (country) => {
        //alert('CityAirQuality.handleCountryChange:'+country);
        this.state.country = country;
    }

    handleCityChange = (event)  => {    
        //alert('CityAirQuality.handleCityChange:'+event.target.value);
        this.setState({city: event.target.value});  
    }

    render() {
        return (
            <div className="main">
                <Formik
                    initialValues={{ city: '', country: '' }}

                    validate={values => {
                        const errors = {};
                        var city = this.state.city;
                        var country = this.state.country;
                        if (!city) {
                            errors.city = 'City is a required field';
                        } else if(city.length<2) {
                            errors.city = 'City needs to be greater than equal 2 digits';
                        } else if(city.length>40) {
                            errors.city = 'City needs to be less than equal 40 digits';
                        }
                        if (!country) {
                            errors.country = 'Country is a required field';
                        } else if(country.length<2 || country.length>2) {
                            errors.city = 'Country needs to be equal 2 digits';
                        }
                        return errors;
                    }}

                    onSubmit={(values) => {
                        //alert('country: '+this.state.country+' city: ' + this.state.city);
                        const tempDiv = document.createElement("div");
                        tempDiv.setAttribute("id", this.state.idz);
                        const regex = /(<([^>]+)>)/ig;
                        ReactDOM.render(
                            <CityAQResults country={this.state.country}
                                city={this.state.city.replace(regex, '')} 
                            />, tempDiv
                            );
                        const containerDiv = document.getElementById(this.state.idz);
                        containerDiv.replaceWith(tempDiv);
                    }} 
                >
                <Form> 
                    <SelectCountry 
                        onCountryChange={ this.handleCountryChange } 
                    />
                    <ErrorMessage name="country" className='validation-error-message' component="div" />
                    <div className="pa"/>
                    <CustomInput id={ this.state.cidz } 
                        type="text" 
                        name="city"
                        placeholder="Type city…"
                        value={ this.state.city } 
                        onChange={ this.handleCityChange } 
                    />
                    <ErrorMessage name="city" className='validation-error-message' component="div" />
                    <div className="pa"/>
                    <CustomButton type="submit" value="Submit">
                        Submit
                    </CustomButton>
                </Form>
            </Formik>
            <div className="pa"/>
            <div id={this.state.idz} />
        </div>
        )
    }

} // class CityAirQuality



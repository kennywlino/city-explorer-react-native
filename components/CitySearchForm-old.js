import React from 'react';
import axios from 'axios';

import CityDisplay from './CityDisplay.js';
import ErrorDisplay from './ErrorDisplay.js';
import Weather from './Weather.js';
import Movies from './Movies.js';

import './CitySearchForm.css';

class CitySearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city : '',
            cityData: [],
            mapImageData: '',
            forecastData: [],
            movieData: [],
            error: false,
            errorMessage: '',
            showErrorDisplay: false
        }
    }

    handOpenErrorDisplay = () => {
        this.setState({
            showErrorDisplay: true
        })
    }

    handleCloseErrorDisplay = () => {
        this.setState({
            showErrorDisplay: false
        })
    }

    getMapData = async (event) => {
        event.preventDefault();
        try {
            // get city data
            let cityDataUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
            let cityData = await axios.get(cityDataUrl);
            let lon = cityData.data[0].lon;
            let lat = cityData.data[0].lat;
            // get map image
            let mapImageUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=14`;
            let mapImageData = await axios.get(mapImageUrl);

            this.setState({
                cityData: cityData.data[0],
                mapImageData: mapImageData.request.responseURL,
                error: false,
            }, () => {
                this.getForecastData();
                this.getMovieData();
            });
        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                showErrorDisplay: true
            })
        }
    }

    getForecastData = async () => {
        try {
            // commenting out this URL as the lat/lon values do not match completely with the sample data
            let forecastUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
            //let forecastUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`;
            let forecastData = await axios.get(forecastUrl);
            
            this.setState({
                forecastData: forecastData.data,
                error: false,
            })
        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                showErrorDisplay: true
            }) 
        }
    }

    getMovieData = async () => {
        try {
            let movieUrl = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`;
            let movieData = await axios.get(movieUrl);
            this.setState({
                movieData: movieData  
            })

        } catch(error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                showErrorDisplay: true
            })

        }
    }

    handleInput = (event) => {
        event.preventDefault();
        this.setState({
            city: event.target.value
        })
    }
    
    render() {
        return (
            <>
                <form onSubmit={this.getMapData}>
                    <label>Enter a location:
                        <input type="text" onInput={this.handleInput}/>
                        <button type="submit">Explore!</button>
                    </label>
                </form>
                {
                    this.state.city !== '' && 
                    this.state.cityData.length !== 0 && 
                    this.state.mapImageData !== '' && 
                    this.state.forecastData.length !== 0 &&
                    this.state.movieData.length !== 0 &&
                    !this.state.error
                    ?
                    <>
                        <div className='info-cards'>
                            <CityDisplay
                                cityData={this.state.cityData}
                                mapImageData={this.state.mapImageData}
                            />
                            <Weather
                                forecastData={this.state.forecastData}
                            />
                            <Movies
                                movieData={this.state.movieData}
                                /> 
                        </div>
                    </>
                    :
                    this.state.city !== '' && this.state.error 
                    ?
                    <ErrorDisplay
                        errorMessage={this.state.errorMessage}
                        showErrorDisplay={this.state.showErrorDisplay}
                    />
                    :
                    <></>
                }
            </>
        );
    }
}

export default CitySearchForm;
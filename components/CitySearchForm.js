import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';

const CitySearchForm = () => {
    const [city, setCity] = useState('');
    const [cityData, setCityData] = useState([]);
    const [mapImageData, setMapImageData] = useState('');
    const [forecastData, setForecastData] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    
    getMapData = async (event) => {
        event.preventDefault();
        try {
            // get city data
            let cityDataUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
            let cityData = await axios.get(cityDataUrl);
            let lon = cityData.data[0].lon;
            let lat = cityData.data[0].lat;
            setCityData(cityData.data[0]);

            // get map image
            let mapImageUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=14`;
            let mapImageData = await axios.get(mapImageUrl);
            setMapImageData(mapImageData.request.responseURL);            

            setError(false);

        } catch(error) {
            setError(true);
            setErrorMessage(error.message);
            showErrorDisplay(true);
        }
    }


    return (
        <>
            <TextInput
            style={styles.input}
            onChangeText={setCity}
            placeholder="Location"
            />
            <Text>
                {city}
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
   input: {
    fontSize: '24',
    height: 50,
    width: 240,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'white',
   } 
});


export default CitySearchForm;
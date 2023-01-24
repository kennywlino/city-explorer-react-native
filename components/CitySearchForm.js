import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import * as Location from 'expo-location';
import { LOCATIONIQ_API_KEY } from '@env';

const CitySearchForm = () => {
    const [city, setCity] = useState('');
    const [coordinates, setCoordinates] = useState({});
    const [cityData, setCityData] = useState([]);
    const [mapImage, setMapImage] = useState('');
    const [forecastData, setForecastData] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('no error');
    const [showError, setShowError] = useState(false);

    // runs when coordinates is updated
    useEffect(() => {
        getMapImage();
    }, [coordinates]);
   
    const handleError = (error) => {
        setError(true);
        setErrorMessage(error.message);
        setShowError(true); 
    }

    // uses Expo to get device location
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setError(true);
            setErrorMessage('ERROR: Location access was denied.');
            setShowError(true);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCoordinates({
            'lat' : location.coords.latitude,
            'lon' : location.coords.longitude
        });
    }

    // search by city name
    const getCityData = async () => {
        try {
            // let cityDataUrl = `https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_API_KEY}&q=${city}&format=json`;
            let cityDataUrl = 'https://us1.locationiq.com/v1/search?key=pk.537dc1559d074f5b7907f63b7520fc13&q=Seattle&format=json';
            let cityData = await axios.get(cityDataUrl);
            setCoordinates({
                'lat' : cityData.data[0].lat,
                'lon' : cityData.data[0].lon

            })
            setCityData(cityData.data[0]);

            setError(false);

        } catch(error) {
            handleError(error);
        }
    }

    //  needs lat and lon
    // can get from city data or location request
    const getMapImage = async () => {
        console.log(process.env.LOCATIONIQ_API_KEY)
        let mapImageUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.LOCATIONIQ_API_KEY}&center=${coordinates.lat},${coordinates.lon}&zoom=14`;
        // let mapImageUrl = `https://maps.locationiq.com/v3/staticmap?key=pk.537dc1559d074f5b7907f63b7520fc13&center=47.6038321,-122.330062&zoom=14`;
        let mapImage = await axios.get(mapImageUrl);
        setMapImage(mapImage.request.responseURL);  
    }

    const getForecastData = async () => {
        try {
            let forecastUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${cityData.lat}&lon=${cityData.lon}`;
            let forecastData = await axios.get(forecastUrl);
            setForecastData(forecastData.data);
            setError(false);
        } catch(error) {
            setError(true);
            setErrorMessage(error.message);
            showError(true);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* <TextInput
                style={styles.input}
                onChangeText={setCity}
                placeholder="Location"
                /> */}
                <Pressable
                    style={styles.button}
                    onPress={() => getCurrentLocation()}
                    >
                <Text style={styles.text}>Use Current Location</Text>
                </Pressable>
                {/* <Pressable
                    style={styles.button}
                    onPress={() => getMapData()}
                    >
                <Text style={styles.text}>Search</Text>
                </Pressable> */}
                {mapImage ? <Image
                    style={styles.image}
                    source={{
                        uri: mapImage
                    }}
                    /> : ''}
                <Text>
                    {errorMessage}
                </Text>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
   button: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    height: 150,
    width: 150,
    borderWidth: 2,
    padding: 10,
    borderRadius: '75%',
    backgroundColor: 'black',
   },
   input: {
    fontSize: '24',
    height: 50,
    width: 240,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'white',
   },
   image: {
    width: 300,
    height: 300,
   },
   container: {
    flex: 0,
    backgroundColor: '#262AC0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  }


});


export default CitySearchForm;
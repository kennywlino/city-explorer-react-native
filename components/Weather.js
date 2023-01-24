import React from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import WeatherDay from './WeatherDay.js';

class Weather extends React.Component {
   render() {
    let forecastData = this.props.forecastData;
    let forecastDataComponents = forecastData.map((element, index) => {
        return (
            <WeatherDay
                data={element}
                key={index}
            />
        )});
    return (
        <Card style={ { width: '18rem' } }>
            <Card.Header className="fw-bold">Weather</Card.Header>
            <ListGroup variant="flush">
            {forecastDataComponents}
            </ListGroup>
        </Card>
    );
   }
}

export default Weather;
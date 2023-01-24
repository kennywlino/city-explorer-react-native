import React from 'react';
import CitySearchForm from './CitySearchForm';
import './App.css';

class App extends React.Component {
    render () {
        return (
            <>
                <h1>City Explorer</h1>
                <CitySearchForm />
            </>
        )
    }
}

export default App;
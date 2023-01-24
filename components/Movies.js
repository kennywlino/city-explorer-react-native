import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Movie from './Movie.js';
import './Movies.css';

class Movies extends React.Component {
    render() {
        let movieCarouselComponents = this.props.movieData.data.map((movie, index) => {
            return (
                <Movie
                    data={movie}
                    key={index}
                />
            )});

        return (
            <>
                <Carousel>
                    {movieCarouselComponents}
                </Carousel>
            </>
        );
    }
}


export default Movies;
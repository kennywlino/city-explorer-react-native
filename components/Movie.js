import React from 'react';

import Carousel from 'react-bootstrap/Carousel';
import MoviePlaceholderImg from  '../assets/jill-marv-N9uGYWS7Bak-unsplash.jpeg';

class Movie extends React.Component {
    render() {
        let imageSrc = '';
           if (this.props.data.poster_path) {
            imageSrc = this.props.data.poster_path;
           } else if (this.props.data.backdrop_path) {
            imageSrc = this.props.data.backdrop_path;
           } else {
            imageSrc = MoviePlaceholderImg;
           }

           const {
            key, data, ...rest 
           } = this.props

            return (
            <Carousel.Item {...rest} key={this.props.key}>
                <img 
                    className="dblock w-100"
                    src={imageSrc}
                    alt={this.props.data.title}
                
                />
                <Carousel.Caption>
                    <h2>{this.props.data.title}</h2>
                   <p>{this.props.data.overview}</p>
                </Carousel.Caption>
            </Carousel.Item>
        );
    }
}

export default Movie;
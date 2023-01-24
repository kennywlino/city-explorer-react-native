import React from 'react';
import Alert from 'react-bootstrap/Alert';

class ErrorDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    render() {
        if(this.props.showErrorDisplay) {
            return (
                <Alert variant="danger" onClose={this.props.handleCloseErrorDisplay} dismissible>
                    <Alert.Heading>{this.props.errorMessage}</Alert.Heading>
                    <p>
                        Enter any location-based info such as a city, state, country, zipcode, etc.
                    </p>
                </Alert>
            )
        }
    }
}

export default ErrorDisplay;
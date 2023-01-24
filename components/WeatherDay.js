import React from "react";

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

class WeatherDay extends React.Component {
    render() {
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return (
            <ListGroup.Item key={this.props.index}
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{String(new Date(this.props.data.date).toLocaleDateString('en-us', options))}</div>
                    {this.props.data.description}
                </div>
                <Badge bg="primary" pill>
                    {this.props.data.description.split('with')[1]}
                </Badge>
            </ListGroup.Item>
        );
    }
}

export default WeatherDay;
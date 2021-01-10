import React, {Component} from 'react';
import axios from 'axios';

import { Jumbotron, Container } from 'react-bootstrap';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1><i>Welcome to JobsPlanet</i></h1>
                    <p>
                    Easiest way to find your dream job!
                    </p>
                </Container>
            </Jumbotron>
        )
    }
}
import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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
                    <h1 style={{ fontFamily: "monospace" }}>Welcome to JobsPlanet</h1>
                    <p>
                    <h5><i>The easiest way to find your dream job!</i></h5>
                    </p>
                    <button
                        style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-primary btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        <a style={{
                        color: "white",
                        }} href="/login">Login</a>
                    </button>
                    <hr></hr>
                    <h6 className="grey-text text-darken-1">
                        Don't have an account? <Link to="/register">Register</Link>
                    </h6>
                </Container>
            </Jumbotron>
        )
    }
}
import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            userdetails: [], 
        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        const { user } = this.props.auth;
        axios.get('http://localhost:4000/user/'+ user.id)
             .then(response => {
                 this.setState({userdetails: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        const { user } = this.props.auth;
        let UserOptions;
        if(this.state.userdetails.role === "applicant")
        {
            UserOptions = 
            <ul>
                <li><a href="/profile">My Profile</a></li>
                <li><a href="/jobsList">View Jobs</a></li>
                <li><a href="/myApplications">My Applications</a></li>
            </ul>
        }
        else if(this.state.userdetails.role === "recruiter")
        {
            UserOptions = 
            <ul>
                <li><a href="/profile">My Profile</a></li>
                <li><a href="/addJob">Add Job</a></li>
                <li><a href="/viewMyActiveJobs">My Job Listings</a></li>
                <li><a href="/employees">Employees</a></li>
            </ul>
        }
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        
                        <h6>
                            
                        </h6>
                        <Card style={{ width: '100%' }}>
                            <Card.Header>
                                <h4>
                                    <b>Hey {user.name.split(" ")[0]} !</b>
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <p className="flow-text grey-text text-darken-1">
                                    You are logged into the full-stack MERN app{" "}
                                    <span style={{ fontFamily: "monospace" }}><b>JobsPlanet</b></span>
                                    </p>
                                </Card.Title>
                                <Card.Text>
                                    {UserOptions}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                        <br></br>
                        <button
                            style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-primary btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
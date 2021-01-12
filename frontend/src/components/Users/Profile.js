import React, { Component } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Profile extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = {userdetails: []};
    }

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
        const user = this.state.userdetails;
        const userRole = user.role;
        let UserDetails;
        if(userRole == 'applicant') {
            UserDetails = 
            <ul>
                <li>DP: {user.profile_image}</li>
                <li>Email: {user.email}</li>
                <li>Education: {user.education}</li>
                <li>Skills: 
                    <ul>
                        {user.skills.map(skill => (
                            <li>{skill}</li>
                        ))}
                    </ul>
                </li>
                <li>Resume: {user.resume}</li>
            </ul>
        }
        else if(userRole == 'recruiter') {
            UserDetails = 
            <ul>
                <li>DP: {user.profile_image}</li>
                <li>Bio: {user.bio}</li>
                <li>Email: {user.email}</li>
                <li>Contact No.: {user.phone_number}</li>
            </ul>
        }
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                    <Card style={{ width: '100%' }}>
                        <Card.Header>
                            <Button variant="light"><h4>My Profile</h4></Button>
                            <Link to="/editprofile"><i className="material-icons">edit</i></Link>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>
                                {UserDetails}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
)(Profile);
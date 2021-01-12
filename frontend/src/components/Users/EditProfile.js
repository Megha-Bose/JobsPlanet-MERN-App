import React, { Component } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class EditProfile extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = {
            userdetails: [], 
            name: "",
            errors: {}
        };
    }

    componentDidMount() {
        const { user } = this.props.auth;
        axios.get('http://localhost:4000/user/'+ user.id)
             .then(response => {
                this.setState(
                {
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    password2: response.data.password2,
                    role: response.data.role,
                    phone_number: response.data.phone_number,
                    bio: response.data.bio,
                    education: response.data.education,
                    resume: response.data.resume,
                    skills: response.data.skills
                });
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
            errors: nextProps.errors
            });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const euser = this.state;
        euser.skills = euser.skills.split(',');
        const editedUser = {
            name: euser.name,
            email: euser.email,
            password: euser.password,
            password2: euser.password2,
            role: euser.role,
            phone_number: euser.phone_number,
            bio: euser.bio,
            education: euser.education,
            resume: euser.resume,
            skills: euser.skills
        };
        axios
            .put('http://localhost:4000/user/edit_profile/' + user.id, editedUser)
            .then(response => {
                console.log(editedUser);
            })
            .catch(function(error) {
                console.log(error);
            })
        // to refresh
        this.props.history.push("/profile");
        this.props.history.push("#");
        this.props.history.goBack();
    };

    render() {
        const user = this.state;
        const { errors } = this.state;
        const userRole = user.role;
        let EditUserDetails;
        if(userRole == 'applicant') {
            EditUserDetails = 
            <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                    <label htmlFor="name">Name</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className={classnames("", {
                            invalid: errors.name
                            })}className={classnames("", {
                            invalid: errors.name
                        })}
                    />
                    <span className="red-text">{errors.name}</span>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="email">Email</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                            invalid: errors.email
                        })}
                    />
                    <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password">Password</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                            invalid: errors.password
                        })}
                    />
                    <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="education">Education</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.education}
                        id="education"
                        type="text"
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="skills">Skills</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.skills}
                        id="skills"
                        type="text"
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="resume">Resume</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.resume}
                        id="resume"
                        type="text"
                    />
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                        Save
                    </button>
                </div>
            </form>
        }
        else if(userRole == 'recruiter') {
            EditUserDetails = 
            <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                    <label htmlFor="name">Name</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className={classnames("", {
                            invalid: errors.name
                            })}className={classnames("", {
                            invalid: errors.name
                        })}
                    />
                    <span className="red-text">{errors.name}</span>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="bio">Bio.</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.bio}
                        id="bio"
                        type="text"
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="phone_number">Phone no.</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.phone_number}
                        id="phone_number"
                        type="number"
                    />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="email">Email</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                            invalid: errors.email
                        })}
                    />
                    <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password">Password</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                            invalid: errors.password
                        })}
                    />
                    <span className="red-text">{errors.password}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                        Save
                    </button>
                </div>
            </form>
        }
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <Card style={{ width: '100%' }}>
                            <Card.Header>
                                <Button variant="light"><h4>My Profile</h4></Button>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {EditUserDetails}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(EditProfile);
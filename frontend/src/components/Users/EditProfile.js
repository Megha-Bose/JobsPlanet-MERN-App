import React, { Component } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EditProfile extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = {
            userdetails: [], 
            jobs: [],
            name: "",
            email: "",
            password: "",
            bio: "",
            role: "",
            resume: "",
            phone_number: NaN,
            skills: [],
            skillsstring: "",
            nameError: "",
            emailError: "",
            bioError: ""
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
                    role: response.data.role,
                    phone_number: response.data.phone_number,
                    bio: response.data.bio,
                    resume: response.data.resume,
                    skills: response.data.skills
                });
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/job/get_jobs')
            .then(response => {
                this.setState({jobs: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    validate = () => {
        const user = this.state;
        let nameError = "";
        let emailError = "";
        let bioError = "";
    
        if (!this.state.name) {
          nameError = "Name cannot be blank";
        }
    
        if (!this.state.email.includes("@")) {
          emailError = "Invalid email";
        }
    
        if (emailError || nameError) {
          this.setState({ emailError, nameError });
          return false;
        }

        if(user.role === "recruiter")
        {
            let num = this.state.bio.split(' ').length;
            if(num > 250)
            {
                bioError = "Bio cannot have more than 250 words.";
                this.setState({ bioError });
                return false;
            }
        }
    
        return true;
    };

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
        euser.skills = this.state.skillsstring.split(',');
        const editedUser = {
            name: euser.name,
            email: euser.email,
            password: euser.password,
            password2: euser.password2,
            role: euser.role,
            phone_number: euser.phone_number,
            bio: euser.bio,
            resume: euser.resume,
            skills: euser.skills
        };
        const isValid = this.validate();
        if (isValid) {
            axios
                .put('http://localhost:4000/user/edit_profile/' + user.id, editedUser)
                .then(response => {
                    console.log(editedUser);this.props.history.push('/profile');
                })
                .catch(function(error) {
                    console.log(error);
                })
            this.state.jobs.filter(item => item.recruiter === user.id).forEach((jobb) => 
            {
                const editJob = {
                    recruiterName: euser.name,
                    recruiterEmail: euser.email
                }
                axios
                    .put('http://localhost:4000/job/edit_job/' + jobb._id, editJob)
                    .then(response => {
                        console.log(editJob);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            })
        }
    };

    render() {
        const user = this.state;
        const userRole = user.role;
        user.skillsstring = user.skills.toString()
        let EditUserDetails;
        if(userRole === 'applicant') {
            EditUserDetails = 
            <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                    <label htmlFor="name">Name</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.name}
                        id="name"
                        type="text"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.nameError}
                    </div>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="email">Email</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.email}
                        id="email"
                        type="email"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
                    </div>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="skills">Skills</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.skillsstring}
                        id="skills"
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
        else if(userRole === 'recruiter') {
            EditUserDetails = 
            <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                    <label htmlFor="name">Name</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.name}
                        id="name"
                        type="text"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.nameError}
                    </div>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="bio">Bio.</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.bio}
                        id="bio"
                        type="text"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.bioError}
                    </div>
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
                        id="email"
                        type="email"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
                    </div>
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
            <div style={{ height: "75vh" }} className="valign-wrapper">
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
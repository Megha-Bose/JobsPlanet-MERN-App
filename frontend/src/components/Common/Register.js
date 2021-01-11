// import React, {Component} from 'react';
// import axios from 'axios';

// export default class Register extends Component {
    
//     constructor(props) {
//         super(props);

//         this.state = {
//             name: '',
//             email: '',
//             date:null
//         }

//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangeEmail = this.onChangeEmail.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }
    
//     onChangeUsername(event) {
//         this.setState({ name: event.target.value });
//     }

//     onChangeEmail(event) {
//         this.setState({ email: event.target.value });
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         const newUser = {
//             name: this.state.name,
//             email: this.state.email,
//             date: Date.now()
//         }
//         axios.post('http://localhost:4000/user/register', newUser)
//              .then(res => {alert("Created\t" + res.data.name);console.log(res.data)})
//              ;

//         this.setState({
//             name: '',
//             email: '',
//             date:null
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>Username: </label>
//                         <input type="text" 
//                                className="form-control" 
//                                value={this.state.name}
//                                onChange={this.onChangeUsername}
//                                />
//                     </div>
//                     <div className="form-group">
//                         <label>Email: </label>
//                         <input type="text" 
//                                className="form-control" 
//                                value={this.state.email}
//                                onChange={this.onChangeEmail}
//                                />  
//                     </div>
//                     <div className="form-group">
//                         <input type="submit" value="Register" className="btn btn-primary"/>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

var roles = ['applicant', 'recruiter'];

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            role: "",
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({role: event.target.value});
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
            errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            role: this.state.role
        };
        this.props.registerUser(newUser, this.props.history); 
        console.log(newUser);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left"><b>keyboard_backspace</b></i>
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                        <b>Register</b>
                        </h4>
                        <p className="grey-text text-darken-1">
                        Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <label htmlFor="name">Role</label><br></br>
                                <select 
                                    value={this.state.role} 
                                    onChange={this.handleChange}
                                    error={errors.role}
                                    id="role"
                                    className={classnames("", {
                                        invalid: errors.role
                                        })}className={classnames("", {
                                        invalid: errors.role
                                    })}
                                >
                                    <option value="">Select role</option>
                                    <option value="applicant">Applicant</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                                <span className="red-text">{errors.role}</span>
                            </div> 
                            <div className="input-field col s12">
                                <label htmlFor="name">Name</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
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
                                    value={this.state.email}
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
                                    value={this.state.password}
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
                                <label htmlFor="password2">Confirm Password</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <span className="red-text">{errors.password2}</span>
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
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
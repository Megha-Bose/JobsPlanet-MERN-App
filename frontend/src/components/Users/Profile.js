import React, { Component } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';

class Profile extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = 
        {
            userdetails: [], 
            showform: false,
            editing: "",
            school: "",
            degree: "",
            startdate: new Date(),
            file: null
            // enddate: new Date(),
        };
        this.delEducation = this.delEducation.bind(this);
        this.editEducation = this.editEducation.bind(this);
        this.editEducationSubmit = this.editEducationSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
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

    delEducation(ed) {
        const { user } = this.props.auth;
        const idToRemove = ed._id;
        this.state.userdetails.education = this.state.userdetails.education.filter((item) => item._id !== idToRemove);
        axios
            .put('http://localhost:4000/user/edit_profile/' + user.id, this.state.userdetails)
            .then(response => {
                console.log(this.state.userdetails);
            })
            .catch(function(error) {
                console.log(error);
            })
        // to refresh
        window.location.reload();
    }

    editEducation(ed) {
        let show = !this.state.showform;
        this.setState({showform: show});
        let editid = ed._id;
        this.setState({editing: editid});
        console.log(this.state.showform);
        this.setState({ school: ed.school });
        this.setState({ degree: ed.degree });
        if(ed.startdate)
        {
            ed.startdate = ed.startdate.toString();
            ed.startdate = ed.startdate.substring(0,10);
            this.setState({ startdate: ed.startdate });
        }
        if(ed.enddate)
        {
            ed.enddate = ed.enddate.toString();
            ed.enddate = ed.enddate.substring(0,10);
            this.setState({ enddate: ed.enddate });
        }
        
        // to refresh
        // this.props.history.push('/profile');
    }

    onBack() {
        let show = !this.state.showform;
        this.setState({ showform: show});
        this.setState({ editing: "" });
        
        // to refresh
        window.location.reload();
    }

    editEducationSubmit(ed) {
        const { user } = this.props.auth;
        const idToChange = ed._id;
        this.setState({ editing: "" });
        const ind = this.state.userdetails.education.findIndex(x => x._id === idToChange)
        if(this.state.school !== "")
            this.state.userdetails.education[ind].school = this.state.school;
        if(this.state.degree !== "")
            this.state.userdetails.education[ind].degree = this.state.degree;
        this.state.userdetails.education[ind].startdate = this.state.startdate;
        if(this.state.enddate && new Date(this.state.enddate) <= new Date(this.state.startdate))
        {
            alert("End date ahould be after start date.");
        }
        else {
            this.state.userdetails.education[ind].enddate = this.state.enddate;
            axios
                .put('http://localhost:4000/user/edit_profile/' + user.id, this.state.userdetails)
                .then(response => {
                    console.log(this.state.userdetails);
                })
                .catch(function(error) {
                    console.log(error);
                })
            // to refresh
        }
        let show = !this.state.showform;
        this.setState({ showform: show});
        // window.location.reload();
    }

    render() {
        const user = this.state.userdetails;
        const userRole = user.role;
        let UserDetails;
        if(userRole === 'applicant') {
            UserDetails = 
            <div>
                 <ul>
                    {/* <li>DP: {user.profile_image}</li> */}
                    <li>Email: {user.email}</li>
                    <li>Skills: 
                        <ul>
                            {user.skills.map(skill => (
                                <li>{skill}</li>
                            ))}
                        </ul>
                    </li>
                    {/* <li>Resume: {user.resume}</li> */}
                </ul>
                <hr></hr>
                <ul>
                    <li>Education:
                        <Tooltip title="Add Education" aria-label="added">
                            <Link style={{ color: '#009900', weight: 'bold' }} to="/addeducation"><i className="material-icons"><h2> add</h2></i></Link>
                        </Tooltip>
                        <ul>
                            {user.education.map(ed => (
                                <li>
                                    <ul>
                                        <li>School: {ed.school}</li>
                                        <li>Degree: {ed.degree}</li>
                                        <li>Start date: {ed.startdate ? ed.startdate.toString().substring(0, 10): "NA"}</li>
                                        <li>End date: {ed.enddate ? ed.enddate.toString().substring(0, 10):"NA"}</li>
                                    </ul>
                                    
                                    <div>
                                        { !this.state.showform || ed._id !== this.state.editing? 
                                            <div>
                                                <Tooltip title="Delete Above Education" aria-label="delete">
                                                <button
                                                style={{
                                                    color: "#FF0000",
                                                    }}
                                                    className="btn btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                    onClick={() => this.delEducation(ed)}>
                                                    <i className="material-icons">delete</i>
                                                </button>
                                                </Tooltip>
                                                <Tooltip title="Edit Above Education" aria-label="edit">
                                                <button
                                                    style={{
                                                    color: "#0000FF",
                                                    }}
                                                    className="btn btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                    onClick={() => this.editEducation(ed)}>
                                                    <i className="material-icons">edit</i>
                                                </button>
                                                </Tooltip>
                                            </div>
                                        : 
                                            <div>
                                                <br></br>
                                                <form noValidate onSubmit={this.onSubmit}>
                                                    <div className="input-field col s12">
                                                        <label htmlFor="school">School</label><br></br>
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.school}
                                                            id="school"
                                                            type="text"
                                                        />
                                                    </div>
                                                    <div className="input-field col s12">
                                                        <label htmlFor="degree">Degree</label><br></br>
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.degree}
                                                            id="degree"
                                                            type="text"
                                                        />
                                                    </div>
                                                    <div className="input-field col s12">
                                                        <label htmlFor="startdate">Start Date</label><br></br>
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.startdate}
                                                            id="startdate"
                                                            type="date"
                                                        />
                                                    </div>
                                                    <div className="input-field col s12">
                                                        <label htmlFor="enddate">End Date</label><br></br>
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.enddate}
                                                            id="enddate"
                                                            type="date"
                                                        />
                                                    </div>
                                                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                                    <button
                                                    style={{
                                                        color: "#0000FF",
                                                        }}
                                                        className="btn btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                        onClick={() => this.onBack()}>
                                                        <b>Back</b>
                                                    </button>
                                                    <button
                                                    style={{
                                                        color: "#009900",
                                                        }}
                                                        className="btn btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                        onClick={() => this.editEducationSubmit(ed)}>
                                                        <b>Save</b>
                                                    </button>
                                                    </div>
                                                </form>
                                            </div> 
                                            
                                         }
                                    </div>
                                    <br></br>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        }
        else if(userRole === 'recruiter') {
            UserDetails = 
            <ul>
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
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <p>
                                    <b>{user.name}: </b>
                                    <Tooltip title="Edit Profile" aria-label="edit">
                                        <Link to="/editprofile"><i className="material-icons"> edit</i></Link>
                                    </Tooltip>
                                </p>
                            </Card.Title>
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
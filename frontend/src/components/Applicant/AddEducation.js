import React, { Component } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddEducation extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = {
            newed:[],
            role: "",
            school: "",
            degree: "",
            startdate: new Date(),
            // enddate: new Date(),
            userDetails: [],
            errors: {}
        };
    }

    componentDidMount() {
        const { user } = this.props.auth;
        axios.get('http://localhost:4000/user/'+ user.id)
            .then(response => {
                this.setState({userDetails: response.data});
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
        const newEducation = {
            school: this.state.school,
            degree: this.state.degree,
            startdate: this.state.startdate,
            enddate: this.state.enddate
        };
        var g1,g2;
        if(newEducation.startdate && newEducation.enddate)
        {
            g1 = new Date(newEducation.startdate); 
            g2 = new Date(newEducation.enddate); 
        }
        if(!newEducation.startdate || newEducation.school === "" || newEducation.degree === "")
        {
            alert("School, Degree and Start Date are required!");
        }
        else if(newEducation.enddate && g2<g1)
        {
            alert("End date cannot be before start date.");
        }
        else{
            this.state.userDetails.education.push(newEducation);
            axios
                .put('http://localhost:4000/user/edit_profile/' + user.id, this.state.userDetails)
                .then(response => {
                    console.log(this.state.userDetails);this.props.history.push('/profile');
                })
                .catch(function(error) {
                    console.log(error);
                })
        }
    };

    render() {
        const userRole = this.state.userDetails.role;
        let AddEducation;
        if(userRole === 'applicant') {
            AddEducation = 
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
                            <Card.Body>
                                <Card.Text>
                                    {AddEducation}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

AddEducation.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(AddEducation);
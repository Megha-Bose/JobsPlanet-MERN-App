import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey {user.name.split(" ")[0]} !</b>
                        </h4>
                        <h6>
                            <p className="flow-text grey-text text-darken-1">
                            You are logged into the full-stack MERN app{" "}
                            <span style={{ fontFamily: "monospace" }}><b>JobsPlanet</b></span>
                            </p>
                        </h6>
                        <ul>
                            <li><a href="/profile">My Profile</a></li>
                            <li><a href="#">View Jobs</a></li>
                            <li><a href="#">My Applications</a></li>
                        </ul>
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
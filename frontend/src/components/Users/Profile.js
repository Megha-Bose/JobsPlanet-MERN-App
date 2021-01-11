import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
)(Dashboard);
import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import Rating from '@material-ui/lab/Rating';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";


class MyApplications extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userdetails: [],
            applications: [],
            rating: 0
        };
        this.giveRating = this.giveRating.bind(this);
        // this.renderIcon = this.renderIcon.bind(this);
        // this.sortChange = this.sortChange.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    giveRating(e) {
        this.setState({rating: e.target.value});
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
        axios.get('http://localhost:4000/job/get_jobs')
            .then(response => {
                this.setState({jobs: response.data, sortedJobs:response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
        axios.get('http://localhost:4000/application/get_applications')
            .then(response => {
                this.setState({applications: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
            errors: nextProps.errors
            });
        }
    }

    rated(application) {
        if(application.rating !== -1)return true;
        return false;
    }

    getjob(jobId)
    {
        let job = this.state.jobs.filter(item => item._id === jobId)[0];
        return job;
    }

    rate(application)
    {
        let job = this.getjob(application.jobId);
        let nrate = job.numrate;
        nrate = nrate + 1;
        let nrating = 0;
        if(job.rating === -1)
        {
            nrating = this.state.rating
        }
        else
        {
            nrating = ((+job.rating * (+nrate-1)) + +this.state.rating) / (+nrate);
        }

        const editJob = {
            rating: nrating,
            numrate: nrate
        };

        const editApplication = {
            rating: this.state.rating
        };

        axios
            .put('http://localhost:4000/job/edit_job/' + job._id, editJob)
            .then(response => {
                console.log(editJob);
                alert("Job rated successfully!");
            })
            .catch(function(error) {
                console.log(error);
                alert("Job could not be rated.");
            })

        axios
            .put('http://localhost:4000/application/edit_application/' + application._id, editApplication)
            .then(response => {
                console.log(editApplication);
            })
            .catch(function(error) {
                console.log(error);
            })

        window.location.reload();
    
    }

    render() 
    {
        const { user } = this.props.auth;
        const userRole = this.state.userdetails.role;
        let AppliedJobs;
        if(userRole === "applicant") {
            AppliedJobs =
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                            <h3>My Applications</h3>
                        </ListItem>
                    </List>
                </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Date of Joining</TableCell>
                                            <TableCell>Salary (per month)</TableCell>
                                            <TableCell>Recruiter</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.filter(item => item.applicantId === user.id).map((application,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{application.title}</TableCell>
                                            <TableCell>{application.status}</TableCell>
                                            <TableCell>{application.doj? application.doj.substring(0,10) : ""}</TableCell>
                                            <TableCell>{application.salary}</TableCell>
                                            <TableCell>{application.recruiterName}</TableCell>
                                           
                                            {!this.rated(application) && application.status === "Accepted"?
                                            
                                            <TableCell>
                                                <Rating
                                                    value={this.state.rating}
                                                    onChange={this.giveRating}
                                                />
                                                <Tooltip title="Rate this job" aria-label="apply">
                                                    <button
                                                        className="btn btn-primary btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                        onClick={() => this.rate(application)}>
                                                        Rate
                                                    </button> 
                                                </Tooltip>                                            
                                            </TableCell>

                                            :

                                            <TableCell>
                                                <div>{application.rating !== -1? "Rated" : ""}</div>                                           
                                            </TableCell>

                                            }
                                            
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
        }
        return (
            <div style={{ height: "75vh" }} className="valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Text>
                                    {AppliedJobs}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

MyApplications.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(MyApplications);
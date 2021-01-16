import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';



class JobsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userdetails: [],
            jobs: [],
            sortedJobs: [], 
            applications: [],
            sortName:true, 
            recruiterName: "",
            showForm: false,
            editing: "",
            enteredsop: "",
            sopError: ""
        };
        // this.renderIcon = this.renderIcon.bind(this);
        // this.sortChange = this.sortChange.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentDidMount() {
        const { user } = this.props.auth;
        this.state.showForm = false;
        this.state.editing = "";
        this.state.enteredsop = "";
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

    applied(job) {
        const { user } = this.props.auth;
        let num = 0;
        let arr = this.state.applications.filter(item => item.jobId === job._id && item.applicantId === user.id && (item.status !== "Rejected" || item.status != "Accepted"));
        num = arr.length;
        if(num>0) return true;
        else return false;
    }

    apply(job)
    {
        this.state.showForm = !this.state.showForm;
        this.state.editing = job._id;
        //this.setState({showform: ShowForm});
        console.log(this.state.showForm);
        this.props.history.push('/jobsList');
        this.props.history.push('/jobsList');
        this.props.history.goBack();
    }

    onSOPsubmit(job)
    {
        const { user } = this.props.auth;
        const newApplication = {
            jobId: job._id,
            applicantId: user.id,
            recruiterId:job.recruiter,
            stage: 0,
            status: "Applied",
            sop: this.state.enteredsop,
            salary: job.salary,
            recruiterName: job.recruiterName,
            rating: -1,
            title: job.title
        };

        let nnumapp = job.numapp + 1;

        const editJob = {
            numapp: nnumapp 
        }

        let num = this.state.enteredsop.split(' ').length;
        if(num <= 250)
        {
            axios
                .post('http://localhost:4000/application/add_application', newApplication)
                .then(response => {
                    console.log(newApplication);
                    alert("Application sent successfully!");
                })
                .catch(function(error) {
                    console.log(error);
                    alert("Applicantion could not be sent.");
                })
            axios
                .put('http://localhost:4000/job/edit_job/' + job._id, editJob)
                .then(response => {
                    console.log(editJob);
                })
                .catch(function(error) {
                    console.log(error);
                })
            this.state.editing = "";
            window.location.reload();
        }
        else{
            let soperror = "Maximum 250 words allowed.";
            this.setState({sopError: soperror});
        }
    }

    // sortChange(){
    //     var array = this.state.users;
    //     var flag = this.state.sortName;
    //     array.sort(function(a, b) {
    //         if(a.date != undefined && b.date != undefined){
    //             return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
    //         }
    //         else{
    //             return 1;
    //         }
    //       });
    //     this.setState({
    //         users:array,
    //         sortName:!this.state.sortName,
    //     })
    // }

    // renderIcon(){
    //     if(this.state.sortName){
    //         return(
    //             <ArrowDownwardIcon/>
    //         )
    //     }
    //     else{
    //         return(
    //             <ArrowUpwardIcon/>
    //         )            
    //     }
    // }

    render() 
    {
        const userRole = this.state.userdetails.role;
        let AllJobs;
        if(userRole === "applicant") {
            AllJobs =
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                            <h3>Active Jobs</h3>
                        </ListItem>
                    </List>
                </Grid>
                    {/* <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true}   
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        />
                    </List>
                    </Grid> */}
                </Grid>
                <Grid container>
                    {/* <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} />
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true}/>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.jobs}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Names" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid> */}
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            {/* <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date</TableCell> */}
                                            <TableCell>Title</TableCell>
                                            <TableCell>Recruiter</TableCell>
                                            <TableCell>Salary (per month)</TableCell>
                                            <TableCell>Duration(months)</TableCell>
                                            <TableCell>Deadline</TableCell>
                                            <TableCell>Rating</TableCell>
                                            
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.filter(item => (new Date()).getTime() <= (new Date(item.deadline.substring(0,10))).getTime()).map((job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.recruiterName}</TableCell>
                                            <TableCell>{job.salary}</TableCell>
                                            <TableCell>{job.duration}</TableCell>
                                            <TableCell>{job.deadline.substring(0,10)}</TableCell>
                                            <TableCell>{job.rating? job.rating.toFixed(1): ""}<i className="material-icons"><h6> star</h6></i></TableCell>
                                    
                                            {!this.applied(job) && job._id !== this.state.editing && !(job.numpos >= job.posmax || job.numapp >= job.appmax)?
                                            
                                            <TableCell>
                                                <Tooltip title="Apply for this job" aria-label="apply">
                                                    <button
                                                        className="btn btn-primary btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                        onClick={() => this.apply(job)}>
                                                        Apply
                                                    </button> 
                                                </Tooltip>                                            
                                            </TableCell>

                                            :

                                            <div></div>

                                            }
                                            {this.applied(job)?
                                            
                                            <TableCell>
                                                <Tooltip title="Applied for this job" aria-label="applied">
                                                    <button
                                                        className="btn btn-secondary btn-sm waves-effect waves-light hoverable blue accent-3">
                                                        Applied
                                                    </button> 
                                                </Tooltip>                                            
                                            </TableCell>

                                            : <div></div>

                                            }
                                            {(job.numpos >= job.posmax || job.numapp >= job.appmax) && !this.applied(job)?
                                            
                                            <TableCell>
                                                <Tooltip title="No vacancy" aria-label="full">
                                                    <button
                                                        className="btn btn-danger disabled btn-sm waves-effect waves-light hoverable blue accent-3">
                                                        Full
                                                    </button> 
                                                </Tooltip>                                            
                                            </TableCell>

                                            :
                                                <div></div>

                                            }

                                            {this.state.showForm === true && job._id === this.state.editing?
                                            <TableCell>
                                                <div>
                                                    <div className="input-field">
                                                        <label htmlFor="enteredsop">Enter SOP:</label><br></br>
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.enteredsop}
                                                            id="enteredsop"
                                                            type="text"
                                                        />
                                                    </div>
                                                    <button
                                                        className="btn btn-primary btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                        onClick={() => this.onSOPsubmit(job)}>
                                                        Submit
                                                    </button>
                                                </div>                                    
                                            </TableCell>
                                            : <TableCell></TableCell>
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
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Text>
                                    {AllJobs}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

JobsList.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(JobsList);
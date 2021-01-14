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



class MyActiveJobs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userdetails: [],
            jobs: [],
            sortedJobs: [], 
            sortName:true, 
            showform: false,
            posmax: -1,
            appmax: -1,
            deadline: new Date(),
            editing: ""
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
        this.state.showform = false;
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
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
            errors: nextProps.errors
            });
        }
    }

    deljob(id) {
        axios
            .delete('http://localhost:4000/job/del_job/' + id)
            .then(response => {
                console.log("Job deleted successfully.");
            })
            .catch(function(error) {
                console.log(error);
            })
        // to refresh
        this.props.history.push("/viewMyActiveJobs");
        this.props.history.push("/");
        this.props.history.goBack();
    }

    editJob(job) {
        this.state.showform = !this.state.showform;
        this.state.editing = job._id;
        console.log(this.state.showform);
        this.state.appmax = job.appmax;
        this.state.posmax = job.posmax;
        if(job.deadline)
        {
            job.deadline = job.deadline.toString();
            job.deadline = job.deadline.substring(0,10);
            this.state.deadline = job.deadline;
        }
        // to refresh
        this.props.history.push("/viewMyActiveJobs");
        this.props.history.push("/viewMyActiveJobs");
        this.props.history.goBack();
    }

    onBack() {
        const { user } = this.props.auth;
        this.state.showform = !this.state.showform;
        this.state.editing = "";
        
        // to refresh
        this.props.history.push("/viewMyActiveJobs");
        this.props.history.push("/");
        this.props.history.goBack();
    }

    editJobSubmit(job) {
        const idToChange = job._id;
        // alert(this.state.posmax);
        const ind = this.state.jobs.findIndex(x => x._id === idToChange)
        if(this.state.appmax)
            this.state.jobs[ind].appmax = this.state.appmax;
        if(this.state.posmax)
            this.state.jobs[ind].posmax = this.state.posmax;
        if(this.state.deadline)
            this.state.jobs[ind].deadline = this.state.deadline;
        // alert(this.state.jobs[ind].posmax);
        axios
            .put('http://localhost:4000/job/edit_job/' + idToChange, this.state.jobs[ind])
            .then(response => {
                console.log(this.state.jobs[ind]);
                this.state.editing = "";
            })
            .catch(function(error) {
                alert("Job couldn't be updated!");
                console.log(error);
            })
        // to refresh
        this.state.showform = !this.state.showform;
        this.props.history.push("/viewMyActiveJobs");
        this.props.history.push("/viewMyActiveJobs");
        this.props.history.goBack();
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
        const user = this.state;
        const userRole = this.state.userdetails.role;
        const userid = this.state.userdetails._id;
        let MyActiveJobs;
        if(userRole == "recruiter") {
            MyActiveJobs =
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
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
                                            <TableCell>Date of posting</TableCell>
                                            <TableCell>Number of Applicants</TableCell>
                                            <TableCell>Maximum Number of Positions</TableCell>
                                            <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.filter(item => item.recruiter == userid && (new Date()).getTime() <= (new Date(item.deadline.substring(0,10))).getTime()).map((job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.dateOfPost.substring(0,10)}</TableCell>
                                            <TableCell>{job.app}</TableCell>
                                            <TableCell>{job.posmax}</TableCell>
                                            <TableCell>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="secondary"/>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            <Tooltip title="Delete Job" aria-label="delete">
                                                                <button
                                                                    className="btn waves-effect waves-light hoverable blue accent-3" 
                                                                    onClick={() => this.deljob(job._id)}>
                                                                    <i 
                                                                    style={{
                                                                        color: "#FF0000",
                                                                        }}
                                                                        className="material-icons">delete</i> Delete
                                                                </button> 
                                                            </Tooltip>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <Tooltip title="Edit Job" aria-label="edit">
                                                                <button
                                                                    className="btn waves-effect waves-light hoverable blue accent-3" 
                                                                    onClick={() => this.editJob(job)}>
                                                                    <i 
                                                                    style={{
                                                                        color: "#0000FF",
                                                                        }}
                                                                        className="material-icons">edit</i>Edit
                                                                </button>
                                                            </Tooltip>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                 
                                            </TableCell>
                                            <TableCell>                   
                                            <div>
                                            { !this.state.showform ? 
                                                <div></div>
                                            : 
                                                <div>
                                                    <br></br>
                                                    <form noValidate onSubmit={this.onSubmit}>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="appmax">Maximum number of applications allowed</label><br></br>
                                                            <input
                                                                onChange={this.onChange}
                                                                value={this.state.appmax}
                                                                id="appmax"
                                                                type="number"
                                                            />
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="posmax">Maximum number of positions available</label><br></br>
                                                            <input
                                                                onChange={this.onChange}
                                                                value={this.state.posmax}
                                                                id="posmax"
                                                                type="number"
                                                            />
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="deadline">Deadline for application</label><br></br>
                                                            <input
                                                                onChange={this.onChange}
                                                                value={this.state.deadline}
                                                                id="deadline"
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
                                                            onClick={() => this.editJobSubmit(job)}>
                                                            <b>Save</b>
                                                        </button>
                                                        </div>
                                                    </form>
                                                </div>  
                                            }
                                            </div>
                                            </TableCell>
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
                                    {MyActiveJobs}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

MyActiveJobs.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(MyActiveJobs);
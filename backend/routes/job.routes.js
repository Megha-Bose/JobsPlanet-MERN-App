var express = require("express");
var router = express.Router();

// Load User model
const Job = require("../models/job.model");

// GET request 
// Getting all the jobs
router.get("/get_jobs", function(req, res) {
    Job.find(function(err, jobs) {
		if (err) {
			console.log(err);
		} else {
			res.json(jobs);
		}
	})
});

// Getting one job
router.get("/:id", function(req, res) {
    Job.findById(req.params.id).then(job => 
        res.json(job)
    )
    .catch(err => console.log(err));
});

// POST request 
// Add a job to db
router.post("/add_job", (req, res) => {
    const newJob = new Job({
        recruiter: req.body.recruiter,
        recruiterName: req.body.recruiterName,
        recruiterEmail: req.body.recruiterEmail,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        duration: req.body.duration,
        salary: req.body.salary,
        appmax: req.body.appmax,
        numapp: req.body.numapp,
        posmax: req.body.posmax,
        numpos: req.body.numpos,
        address: req.body.address,
        skills: req.body.skills,
        rating: req.body.rating,
        numrate: req.body.numrate,
        dateOfPost: req.body.dateOfPost,
        deadline: req.body.deadline,
    });

    newJob.save()
        .then(job => {
            res.status(200).json(job);
        })
        .catch(err => {
            res.status(400).send(job);
        });
});

// PUT Request
// Edit Job Details
router.put('/edit_job/:id', (req, res) => {
    Job.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.json(data)
            console.log('Job updated successfully !')
        }
    })
})

// DELETE request
// Delete a job from the db
router.delete('/del_job/:id', (req,res) => {
    Job.findById(req.params.id).then(job => 
        job.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;

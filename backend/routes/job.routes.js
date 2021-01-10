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

// POST request 
// Add a job to db
router.post("/add_job", (req, res) => {
    const newJob = new Job({
        recruiter: req.body.recruiter,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        duration: req.body.duration,
        salary: req.body.salary,
        address: req.body.address,
        skills: req.body.skills,
        rating: req.body.rating,
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

// DELETE request
// Delete a job from the db
router.delete('/:id', (req,res) => {
    Job.findById(req.params.id).then(job => 
        job.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;


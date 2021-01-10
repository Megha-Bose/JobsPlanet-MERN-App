var express = require("express");
var router = express.Router();

// Load Application model
const Application = require("../models/application.model");

// GET request 
// Getting all the applications
router.get("/get_applications", function(req, res) {
    Application.find(function(err, applications) {
		if (err) {
			console.log(err);
		} else {
			res.json(applications);
		}
	})
});

// POST request 
// Add an application to db
router.post("/add_application", (req, res) => {
    const newApplication = new Application({
        jobId: req.body.jobId,
        applicantId: req.body.applicantId,
        recruiterId: req.body.recruiterId,
        stage: req.body.stage,
        status: req.body.status,
        sop: req.body.sop
    });

    newApplication.save()
        .then(application => {
            res.status(200).json(application);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// DELETE request
// Delete an application from the db
router.delete('/:id', (req,res) => {
    Application.findById(req.params.id).then(application => 
        application.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;


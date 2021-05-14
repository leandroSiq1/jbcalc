const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  save(req, res) {
    // if jobs[jobs.length - 1] ? jobs[jobs.length - 1].id : 1;
    const jobs = Job.get();
    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now() // Atribuindo nova data
    });

    return res.redirect("/");
  },

  show(req, res) {
    const { id: jobId } = req.params;
    const jobs = Job.get();
    
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send('Job not found!');
    }

    const profile = Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  update(req, res) {
    const { id: jobId } = req.params;
    const jobs = Job.get();

    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send('Job not found!');
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    const newJobs = jobs.map(job => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJobs);

    return res.redirect('/job/' + jobId);
  },

  delete(req, res) {
    const { id: jobId } = req.params;

    Job.delete(jobId);

    return res.redirect('/');
  }
}
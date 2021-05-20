const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now() // Atribuindo nova data
    });

    return res.redirect("/");
  },

  async show(req, res) {
    const { id: jobId } = req.params;
    const jobs = await Job.get();
    
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send('Job not found!');
    }

    const profile = await Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const { id: jobId } = req.params; 

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    await Job.update(updatedJob, jobId);

    return res.redirect('/job/' + jobId);
  },

  async delete(req, res) {
    const { id: jobId } = req.params;

    await Job.delete(jobId);

    return res.redirect('/');
  }
}
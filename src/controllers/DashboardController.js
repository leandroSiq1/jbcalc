const Job = require('../model/Job');
const Profile = require('../model/Profile');

const JobUtils = require('../utils/JobUtils');

module.exports = {
  async index(req, res) {
    // datas
    const jobs = await Job.get();
    const profile = await Profile.get();
    
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // total de horas por dia de cada job em progress
    let jobTotalHours = 0;

    const updateJobs = jobs.map(job => {
      // ajustar no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      
      // somando a quantidade de status
      statusCount[status] += 1;

      jobTotalHours = status === "progress" ? Number(job["daily-hours"]) : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    });

    // qtd de horas que quero trabalhar (PROFILE)
    // -
    // qtd de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;


            // profile: profile, statusCount: statusCount, freeHours: freeHours
    return res.render("index", { jobs: updateJobs, profile, statusCount, freeHours });
  }
}
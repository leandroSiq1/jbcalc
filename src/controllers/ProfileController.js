const Profile = require('../model/Profile');

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    const data = req.body;
    
    // definir quantas semanas tem num ano
    const weeksPerYear = 52;
    // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    
    // quantas horas por semana estou trabalhando
    const weeksTotalHours = data["hours-per-day"] * data["days-per-week"];
    
    // total de horas trabalhadas no mês
    const monthlyTotalHours = weeksTotalHours * weeksPerMonth;

    // qual será o valor da minha hora ? 
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour
    });
    
    return res.redirect('/profile');
  }
}
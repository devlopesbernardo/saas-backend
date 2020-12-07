'use strict';
const User = use('App/Models/User');
const Company = use('App/Models/Company');
const Branch = use('App/Models/Branch');
const Appointment = use('App/Models/Appointment');
const moment = require('moment');

class AppointmentController {
  async store({ request, response }) {
    const { to_company, to_branch, hour, name } = request.all();

    const appointments = await Appointment.query()
      .with('branch', to_branch)
      .select('name', 'id', 'picked_date')
      .fetch();

    const createAppointment = async () =>
      await Appointment.create({
        branch_id: to_branch,
        company_id: to_company,
        name: name,
        picked_date: new Date(hour),
      });

    try {
      await createAppointment();
    } catch (e) {
      response.status(401).send(e.message);
    }
  }

  async checkAppointments({ request, response }) {
    const { to_branch } = request.all();
    let appointmentsArray = [];
    const appointments = await Appointment.query()
      .with('branch', to_branch)
      .select('name', 'id', 'picked_date')
      .fetch();

    await appointments.toJSON().map((appointment) => {
      appointmentsArray.push(moment(appointment.picked_date).toLocaleString());
    });
    return appointmentsArray;
  }
}
module.exports = AppointmentController;

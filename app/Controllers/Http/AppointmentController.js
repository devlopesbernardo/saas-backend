'use strict';
const User = use('App/Models/User');
const Company = use('App/Models/Company');
const Branch = use('App/Models/Branch');
const Appointment = use('App/Models/Appointment');
const moment = require('moment');

class AppointmentController {
  async store({ request, response }) {
    const { to_company, to_branch, hour, name } = request.all();
    var startLimit;
    var endLimit;
    // hour is like July 28 2020 07:30

    const appointments = await Appointment.query()
      .with('branch', to_branch)
      .select('name', 'id', 'picked_date')
      .fetch();

    const test = async () =>
      await Appointment.create({
        branch_id: to_branch,
        company_id: to_company,
        name: name,
        picked_date: new Date(hour),
      });

    try {
      await test();
    } catch (e) {
      response.status(401).send('Neste horário, já existem marcações');
    }
    // if (appointments.toJSON().length !== 0) {
    //   const currentAppointments = await Appointment.query()
    //     .with('branch', (builder) => {
    //       builder.where('id', to_branch).select('id', 'name');
    //     })
    //     .select('id', 'branch_id', 'picked_date')
    //     .fetch();

    //   async function checkHour(data_pega) {
    //     currentAppointments.toJSON().map((appointment) => {
    //       const picked = new Date(appointment.picked_date);
    //       const date = moment(picked);

    //       startLimit = moment(date).subtract(31, 'minutes');
    //       endLimit = moment(date).add(31, 'minutes');
    //       console.log(
    //         `inicio:${startLimit.toLocaleString()} final: ${endLimit.toLocaleString()}`,
    //       );
    //       if (moment(data_pega).isBetween(startLimit, endLimit)) {
    //         console.log(`${moment(data_pega)} Está no meio!`);
    //         response.status(403).send('Este horário já está tomado');
    //       } else {
    //         const newAppointment = Appointment.create({
    //           branch_id: to_branch,
    //           company_id: to_company,
    //           name: name,
    //           picked_date: new Date(hour),
    //         });
    //         response.status(200).send('Horário reservado');
    //       }
    //     });
    //   }
    //   console.log('rodando?');
    //   checkHour(hour);
    //   return currentAppointments.toJSON();
    // }
  }

  async checkAppointments({ request, response }) {
    const { to_branch } = request.all();
    let appointmentsArray = [];
    const appointments = await Appointment.query()
      .with('branch', to_branch)
      .select('name', 'id', 'picked_date')
      .fetch();

    await appointments.toJSON().map((appointment) => {
      appointmentsArray.push(moment.utc(appointment.picked_date));
    });
    return appointmentsArray;
  }
}
module.exports = AppointmentController;

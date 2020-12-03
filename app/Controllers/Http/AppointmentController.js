"use strict";
const User = use("App/Models/User");
const Company = use("App/Models/Company");
const Branch = use("App/Models/Branch");
const Appointment = use("App/Models/Appointment");
const moment = require("moment");

class AppointmentController {
  async store({ request, response }) {
    const { to_company, to_branch, hour, name } = request.all();
    // hour is like July 28 2020 07:30

    const appointments = await Appointment.query()
      .with("branch", to_branch)
      .select("name", "id", "picked_date")
      .fetch();
    if (appointments.toJSON().length === 0) {
      const newAppointment = Appointment.create({
        branch_id: to_branch,
        company_id: to_company,
        name: name,
        picked_date: new Date(hour),
      });
    }
    if (appointments.toJSON().length !== 0) {
      const currentAppointments = await Appointment.query()
        .with("branch", (builder) => {
          builder.where("id", to_branch).select("id", "name");
        })
        .select("id", "branch_id", "picked_date")
        .fetch();

      function checkHour(data_pega) {
        currentAppointments.toJSON().map((appointment) => {
          const picked = new Date(appointment.picked_date);
          const date = moment(picked);

          var startLimit = moment(date).subtract(30, "minutes");
          var endLimit = moment(date).add(30, "minutes");
          console.log(
            `inicio:${startLimit.toLocaleString()} final: ${endLimit.toLocaleString()}`
          );
          if (moment(data_pega).isBetween(startLimit, endLimit)) {
            console.log(`${moment(data_pega)} Está no meio!`);
            response.status(403).send("Não conseguiremos marcar");
          }
        });
      }
      console.log("rodando?");
      checkHour(hour);
      return currentAppointments.toJSON();
      //     const newAppointment = await Appointment.create({
      //       branch_id: to_branch,
      //       company_id: to_company,
      //       name: name,
      //       picked_date: new Date(hour),
      //     });
      //     return await Appointment.query()
      //       .with("branch", (builder) => {
      //         builder.select("id", "name", "location");
      //       })
      //       .select("name", "id", "picked_date", "branch_id")
      //       .fetch();
      //   }
      // }
    }
  }
}
module.exports = AppointmentController;

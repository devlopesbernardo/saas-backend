'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const moment = require('moment');

class Appointment extends Model {
  static boot() {
    super.boot();

    // const MeuErro = (message) => {
    //   this.name = 'MeuErro';
    //   this.message = message || 'Mensagem de erro padrão';
    //   this.stack = new Error().stack;
    // };
    // MeuErro.prototype = Object.create(MeuErro.prototype);
    // MeuErro.prototype.constructor = MeuErro;

    this.addHook('beforeSave', async (appointmentInstance) => {
      const delegateError = () => {
        throw new Error('Neste horário, já existem marcações');
      };
      var startLimit;
      var endLimit;
      // hour is like July 28 2020 07:30

      const appointments = await Appointment.query()
        .with('branch', appointmentInstance.branch_id)
        .select('name', 'id', 'picked_date')
        .fetch();

      const currentAppointments = await Appointment.query()
        .with('branch', (builder) => {
          builder
            .where('id', appointmentInstance.branch_id)
            .select('id', 'name');
        })
        .select('id', 'branch_id', 'picked_date')
        .fetch();

      currentAppointments.toJSON().map((appointment) => {
        const picked = new Date(appointment.picked_date);
        const date = moment(picked);

        startLimit = moment(date).subtract(0, 'minutes');
        endLimit = moment(date).add(60, 'minutes');

        moment(appointmentInstance.picked_date).isBetween(startLimit, endLimit)
          ? delegateError()
          : null;
      });
    });
  }

  company() {
    return this.belongsTo('App/Models/Company');
  }
  branch() {
    return this.belongsTo('App/Models/Branch');
  }
}

module.exports = Appointment;

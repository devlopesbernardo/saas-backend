"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Appointment extends Model {
  company() {
    return this.belongsTo("App/Models/Company");
  }
  branch() {
    return this.belongsTo("App/Models/Branch");
  }
}

module.exports = Appointment;

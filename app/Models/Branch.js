"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Branch extends Model {
  company() {
    return this.belongsTo("App/Models/Company");
  }
  appointment() {
    return this.hasMany("App/Models/Appointment");
  }
}

module.exports = Branch;

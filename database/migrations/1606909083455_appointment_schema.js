"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AppointmentSchema extends Schema {
  up() {
    this.create("appointments", (table) => {
      table.increments();
      table.integer("company_id").notNullable();
      table.integer("branch_id").notNullable();

      table.string("name").notNullable();
      table.datetime("picked_date").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("appointments");
  }
}

module.exports = AppointmentSchema;

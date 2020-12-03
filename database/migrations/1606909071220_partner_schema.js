"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PartnerSchema extends Schema {
  up() {
    this.create("partners", (table) => {
      table.increments();
      table.integer("company_id").notNullable();
      table.integer("name").notNullable();
      table.json("hours_to").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("partners");
  }
}

module.exports = PartnerSchema;

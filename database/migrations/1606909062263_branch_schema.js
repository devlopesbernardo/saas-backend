"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BranchSchema extends Schema {
  up() {
    this.create("branches", (table) => {
      table.increments();
      table.integer("company_id").notNullable();
      table.integer("name").notNullable();
      table.json("hours_to").notNullable();
      table.string("location").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("branches");
  }
}

module.exports = BranchSchema;

"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanySchema extends Schema {
  up() {
    this.create("companies", (table) => {
      table.increments();
      table.string("company_name").notNullable();
      table.string("location").notNullable();
      table.string("cnpj").notNullable().unique();
      table.string("manager_mail").notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("companies");
  }
}

module.exports = CompanySchema;

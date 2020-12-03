"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("username", 80).notNullable().unique();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.integer("role").notNullable();
      table.boolean("is_manager").notNullable();
      table.integer("company_id").notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;

"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class Company extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (companyInstance) => {
      if (companyInstance.dirty.managerPassword) {
        companyInstance.managerPassword = await Hash.make(
          companyInstance.managerPassword
        );
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  user() {
    //Defines relation between a single company with multiple users
    return this.hasMany("App/Models/User");
  }
  appointment() {
    return this.hasMany("App/Models/Appointment");
  }
  partner() {
    return this.hasMany("App/Models/Partner");
  }
  branch() {
    return this.hasMany("App/Models/Branch");
  }
}

module.exports = Company;

"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const User = use("App/Models/User");
const Company = use("App/Models/Company");
const Branch = use("App/Models/Branch");

class CompanyController {
  async store({ request, response }) {
    const {
      email,
      password,
      username,
      company_name,
      location,
      cnpj,
    } = request.all();
    const company = await Company.create({
      company_name,
      location,
      cnpj,
      manager_mail: email,
    });
    const company_id = company.toJSON().id;
    if (company) {
      const manager = await User.create({
        email,
        username,
        password,
        company_id,
        is_manager: true,
        role: "manager",
      });
      const branch = await Branch.create({
        company_id,
        name: company_name,
        hours_to: {},
        location,
      });
    } else {
      response.status(401).send("Cheque os credenciais");
    }
  }

  async listUsersOnCompany({ request, response }) {
    const { company } = request.all();
    const users = await Company.query()
      .with("user", (builder) => {
        builder.where("company_id", company);
      })
      .where("id", company)
      .fetch();
    await response.send(users);
  }

  async managerLogin({ request, response, auth }) {
    const { email, password } = request.all();
    const checkForManager = await User.query()
      .where("email", email)
      .where("role", "manager")
      .first();
    if (checkForManager) {
      const user = await auth.attempt(email, password);
      if (user) {
        return user;
      }
    } else {
      return "Not Logged In";
    }
  }
  async checkForBranches({ request, response }) {
    const { company } = request.all();
    const branch = await Company.query()
      .with("branch", (builder) => builder.where("company_id", company))
      .where("id", company)
      .fetch();
    await response.send(branch);
  }
}

module.exports = CompanyController;

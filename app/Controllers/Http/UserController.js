"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} response */

const User = use("App/Models/User");
const Company = use("App/Models/Company");

class UserController {
  async store({ request, response }) {
    const { email, password, username, company_id } = request.all();
    const insert = await User.create({ email, password, username, company_id });
  }

  async listCompany({ response, params }) {
    const user_id = params.user_id;
    const user = await User.find(user_id);
    const company_id = user.toJSON().company_id;
    const { name, location } = await Company.find(company_id);
    return { name, location };
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();
    const user = await auth.attempt(email, password);
    if (user) {
      return user;
    } else {
      return "Not Logged In";
    }
  }
}

module.exports = UserController;

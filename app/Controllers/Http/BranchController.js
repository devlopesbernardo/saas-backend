"use strict";
const User = use("App/Models/User");
const Company = use("App/Models/Company");
const Branch = use("App/Models/Branch");

class BranchController {
  async store({ request, response }) {
    const { company_id, name, hours_to, location } = request.all();
    const branch = await Branch.create({
      company_id,
      name,
      hours_to,
      location,
    });
  }
}

module.exports = BranchController;

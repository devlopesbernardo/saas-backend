"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/user/signup", "UserController.store");
Route.get("/user/company/:user_id", "UserController.listCompany");

Route.post("/branches/register", "BranchController.store");

Route.post("/company/register", "CompanyController.store");
Route.post("/company/list", "CompanyController.listUsersOnCompany");
Route.post("/company/branches", "CompanyController.checkForBranches");
Route.post("/company/login", "CompanyController.managerLogin");

Route.post("/appointments/register", "AppointmentController.store");

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var queries_1 = require("@wasp/queries");
var actions_1 = require("@wasp/actions");
var getDepartments_1 = __importDefault(require("@wasp/queries/getDepartments"));
var getEmissions_1 = __importDefault(require("@wasp/queries/getEmissions"));
function Dashboard() {
    var _a = (0, queries_1.useQuery)(getDepartments_1.default), departments = _a.data, departmentsLoading = _a.isLoading, departmentsError = _a.error;
    var _b = (0, queries_1.useQuery)(getEmissions_1.default), emissions = _b.data, emissionsLoading = _b.isLoading, emissionsError = _b.error;
    if (departmentsLoading || emissionsLoading)
        return 'Loading...';
    if (departmentsError || emissionsError)
        return 'Error: ' + (departmentsError || emissionsError);
    return (<div>
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Departments</h2>

          {departments.map(function (department) { return (<div key={department.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{department.name}</h3>
              <p>Total Emissions: {department.emissions.reduce(function (acc, emission) { return acc + emission.quantity; }, 0)}</p>
            </div>); })}
        </div>

        <div className="p-4 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Emissions</h2>

          {emissions.map(function (emission) { return (<div key={emission.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
              <p>Source: {emission.source}</p>
              <p>Type: {emission.type}</p>
              <p>Quantity: {emission.quantity}</p>
            </div>); })}
        </div>
      </div>
    </div>);
}
exports.Dashboard = Dashboard;

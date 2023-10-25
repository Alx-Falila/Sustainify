"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var queries_1 = require("@wasp/queries");
var actions_1 = require("@wasp/actions");
var getDepartments_1 = __importDefault(require("@wasp/queries/getDepartments"));
var createEmission_1 = __importDefault(require("@wasp/actions/createEmission"));
function Department() {
    var departmentId = (0, react_router_dom_1.useParams)().departmentId;
    var _a = (0, queries_1.useQuery)(getDepartments_1.default), departments = _a.data, departmentsLoading = _a.isLoading, departmentsError = _a.error;
    var createEmissionFn = (0, actions_1.useAction)(createEmission_1.default);
    var _b = (0, react_1.useState)(''), source = _b[0], setSource = _b[1];
    var _c = (0, react_1.useState)(''), type = _c[0], setType = _c[1];
    var _d = (0, react_1.useState)(''), quantity = _d[0], setQuantity = _d[1];
    if (departmentsLoading)
        return 'Loading...';
    if (departmentsError)
        return 'Error: ' + departmentsError;
    var department = departments.find(function (dept) { return dept.id === Number(departmentId); });
    if (!department)
        return 'Department not found.';
    var handleCreateEmission = function () {
        createEmissionFn({
            source: source,
            type: type,
            quantity: quantity,
            departmentId: department.id
        });
        setSource('');
        setType('');
        setQuantity('');
    };
    return (<div className='p-4'>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold mb-2'>{department.name}</h2>
        <p className='text-gray-500'>User: {department.user.username}</p>
      </div>
      <div className='mb-4'>
        <h3 className='text-xl font-bold mb-2'>Emissions</h3>
        {department.emissions.map(function (emission) { return (<div key={emission.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>Source: {emission.source}</div>
            <div>Type: {emission.type}</div>
            <div>Quantity: {emission.quantity}</div>
          </div>); })}
      </div>
      <div>
        <h3 className='text-xl font-bold mb-2'>New Emission</h3>
        <div className='flex gap-x-4'>
          <input type='text' placeholder='Source' className='px-1 py-2 border rounded' value={source} onChange={function (e) { return setSource(e.target.value); }}/>
          <input type='text' placeholder='Type' className='px-1 py-2 border rounded' value={type} onChange={function (e) { return setType(e.target.value); }}/>
          <input type='text' placeholder='Quantity' className='px-1 py-2 border rounded' value={quantity} onChange={function (e) { return setQuantity(e.target.value); }}/>
          <button onClick={handleCreateEmission} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Add Emission
          </button>
        </div>
      </div>
    </div>);
}
exports.Department = Department;

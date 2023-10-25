"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Login_1 = require("@wasp/auth/forms/Login");
function Login() {
    return (<div className="w-full h-full bg-white">
      <div className="min-w-full min-h-[75vh] flex items-center justify-center">
        <div className="w-full h-full max-w-sm p-5 bg-white">
          <div>
            <Login_1.LoginForm appearance={{
            colors: {
                brand: 'var(--auth-form-brand)',
                brandAccent: 'var(--auth-form-brand-accent)',
                submitButtonText: 'var(--auth-form-submit-button-text-color)',
            }
        }}/>
            <div className="mt-4 text-center">
              If you don't have an account go to{" "}
              <react_router_dom_1.Link to="/signup" className="text-primary-500 hover:text-primary-800 underline">
                sign up
              </react_router_dom_1.Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>);
}
exports.default = Login;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var react_router_dom_1 = require("react-router-dom");
var useAuth_1 = __importDefault(require("@wasp/auth/useAuth"));
var logout_1 = __importDefault(require("@wasp/auth/logout"));
require("./Main.css");
var Layout = function (_a) {
    var children = _a.children;
    var user = (0, useAuth_1.default)().data;
    return (<div className="flex flex-col min-h-screen">
      <header className="bg-primary-800 text-white p-4">
        <div className="container mx-auto px-4 py-2 flex justify-between">
          <react_router_dom_1.Link to="/">
            <h1 className="text-xl2 font-semibold">Sustainify</h1>
          </react_router_dom_1.Link>
          {user ? (<span>
              Hi, {user.username}!{' '}
              <button onClick={logout_1.default} className="text-xl2 underline">
                (Log out)
              </button>
            </span>) : (<react_router_dom_1.Link to="/login">
              <h1 className="text-xl2 underline">Log in</h1>
            </react_router_dom_1.Link>)}
        </div>
      </header>
      <main className="container mx-auto px-4 py-2 flex-grow">
        {children}
      </main>
      <footer>
        <div className="container mx-auto p-4">
          <p className="text-center text-gray-500 text-sm">
            Sustainify ~ Powered by Wasp
          </p>
        </div>
      </footer>
    </div>);
};
exports.Layout = Layout;

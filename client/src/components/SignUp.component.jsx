import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../utils/mutations";

import p_logo_dark from "../assets/p_logo_dark.svg";

import Auth from "../utils/auth";

export default function SignUpComponent() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [register, { error }] = useMutation(REGISTER_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value.trim() });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await register({
        variables: { ...formState },
      });
      const token = data.register.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }

    setFormState({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Link to="/"> 
        <img
          className="mx-auto h-14 w-auto"
          src={p_logo_dark}
          alt="Prestissimo Logo"
        />
      </Link>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account to get started
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="block w-full bg-white/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            {/* <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div> */}
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              required
              className="block w-full bg-white/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            {/* <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div> */}
          </div>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              required
              className="block w-full bg-white/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gray-900 hover:bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-50 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-50"
          >
            Create Account
          </button>
        </div>
      </form>
      {error && (
        <div className="my-4 bg-red-200 rounded-md border-0 py-3.5 px-2">
          <p className="text-red-500 text-center font-semibold">
            An error occurred. Please try again!
          </p>
        </div>
      )}
    </div>
  </div>
  );
}

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { ADD_STUDENT } from "../utils/mutations";
import { GET_STUDENTS } from "../utils/queries";



export default function AddStudent() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");

  const [addStudent] = useMutation(ADD_STUDENT, {
    variables: { firstName, lastName, email, phone, grade },
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    addStudent(firstName, lastName, email, phone, grade);

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setGrade("");

    navigate("/students");
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-12 sm:space-y-16">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New Student
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-6 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  First name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={(event) => setFirstName(event.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-6 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Last name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={(event) => setLastName(event.target.value)}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-6 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Email address
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-6 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Phone
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={(event) => setPhone(event.target.value)}
                    autoComplete="phone-number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-6 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Grade
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="grade"
                    id="grade"
                    onChange={(event) => setGrade(event.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/"
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

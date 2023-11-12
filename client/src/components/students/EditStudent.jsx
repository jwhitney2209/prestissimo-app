/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { GET_STUDENT, GET_STUDENTS } from "../../utils/queries";
import { UPDATE_STUDENT } from "../../utils/mutations";

EditStudent.propTypes = {
  student: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default function EditStudent(props) {
  const student = props.student;
  // add onSubmit prop to handle saving the form
  const onSubmit = props.onSubmit;

  const [studentData, setStudentData] = useState({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phone: student.phone,
    grade: student.grade,
    instrument: student.instrument,
  });

  const [updateStudent] = useMutation(UPDATE_STUDENT);

  const handleInputChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent({
        variables: {
          studentId: student.id,
          input: studentData,
        },
      });
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-4 sm:px-0 sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Student Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Student details and contact information.
          </p>
        </div>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Link
            to="students"
            type="button"
            className="inline-flex items-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            Back to Students
          </Link>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              First Name
            </dt>
            <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                <input
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={studentData.firstName}
                  onChange={handleInputChange}                />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last Name
            </dt>
            <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                <input
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={studentData.lastName}
                  onChange={handleInputChange} 
                />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                <input
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  type="text"
                  name="email"
                  id="email"
                  value={studentData.email}
                  onChange={handleInputChange}
                />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone
            </dt>
            <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                <input
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  type="text"
                  name="phone"
                  id="phone"
                  value={studentData.phone}
                  onChange={handleInputChange}
                />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Grade
            </dt>
            <dd className="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                <input
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                  type="text"
                  name="phone"
                  id="phone"
                  value={studentData.grade}
                  onChange={handleInputChange}
                />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Section
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {student.instrument ? student.instrument : "No section assigned"}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Uniforms
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex flex-col">
                {student.uniforms.length
                  ? student.uniforms.map((uniform) => (
                      <span key={uniform.id}>{uniform.name}</span>
                    ))
                  : "No uniforms assigned"}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="flex items-center rounded-md text-sm text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-2"
      >
        <span>
          <FaSave className="h-4 w-4 mr-2" />
        </span>
        Save
      </button>
    </>
  );
}

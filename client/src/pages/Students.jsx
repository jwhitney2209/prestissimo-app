import { useState, Fragment, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Transition, Dialog } from "@headlessui/react";
import { ADD_STUDENT } from "../utils/mutations";
import { GET_STUDENTS } from "../utils/queries";

import { Link } from "react-router-dom";

import StudentTable from "../components/StudentTable";

export default function Students() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    document.title = "Students";
  }, []);

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
  };
  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Students
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            Create New Student
          </button>
          <Link
            to="/import-students"
            type="button"
            className="inline-flex items-center rounded-md ml-2 bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            Import Students
          </Link>
        </div>
      </div>
      <StudentTable />
      {/* Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        New Student
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Enter student details below. All fields are required.
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="space-y-6 sm:space-y-8">
                      <div>
                        <div className="mt-2 space-y-2 border-b border-gray-900/10 pb-4 sm:space-y-0 sm:pb-0">
                          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-2 sm:py-2">
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
                                onChange={(event) =>
                                  setFirstName(event.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-2 sm:py-2">
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
                                onChange={(event) =>
                                  setLastName(event.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-2 sm:py-2">
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
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-md sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-2 sm:py-2">
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
                                onChange={(event) =>
                                  setPhone(event.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-2 sm:py-2">
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
                                onChange={(event) =>
                                  setGrade(event.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        onClick={() => setOpen(false)}
                      >
                        Save
                      </button>
                      <button
                        className="inline-flex mt-2 w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

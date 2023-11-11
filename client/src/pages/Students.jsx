import { useEffect } from "react";
import { Link } from "react-router-dom";

import StudentTable from "../components/students/StudentTable";

export default function Students() {
  useEffect(() => {
    document.title = "Students";
  }, []);

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Students
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Link
            to="add"
            type="button"
            className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            Create New Student
          </Link>
          <Link
            to="import"
            type="button"
            className="inline-flex items-center rounded-md ml-2 bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            Import Students
          </Link>
        </div>
      </div>
      <StudentTable /> 
    </>
  );
}



import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "../../utils/queries";

import Spinner from "../Spinner";

export default function StudentTable() {
  const { loading, error, data } = useQuery(GET_STUDENTS);



  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div className="">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the students in your program including their
                  name, grade, email, ensemble and section.
                </p>
              </div>
            </div>

            <div className="mt-8 sm:-mx-0 ">
              <table className="w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                      Email
                    </th>
                    <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                      Phone
                    </th>
                    <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                      Grade
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.getStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {student.lastName}, {student.firstName}
                        <dl className="font-normal md:hidden">
                          <dt className="sr-only">Email</dt>
                          <dd className="mt-1 truncate text-gray-700">{student.email}</dd>
                        </dl>
                        <dl className="font-normal md:hidden">
                          <dt className="sr-only">Phone</dt>
                          <dd className="mt-1 truncate text-gray-700">{student.phone}</dd>
                        </dl>
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {student.email}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {student.phone}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {student.grade}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Link
                          to={`${student.id}`}
                          className="text-white rounded-md bg-gray-800 px-4 py-2 hover:bg-gray-700"
                        >
                          Edit<span className="sr-only">, {student.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

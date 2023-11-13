import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_STUDENT } from "../../utils/queries";
import { FaEdit, FaTrash } from "react-icons/fa";

import EditSingleStudent from "./EditStudent";
import Spinner from "../Spinner";
import DeleteModal from "../DeleteModal";

export default function Student() {
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { loading, error, data } = useQuery(GET_STUDENT, {
    variables: { studentId: id },
  });

  const student = useMemo(() => data?.getStudent || {}, [data]);

  useEffect(() => {
    const originalTitle = document.title;

    if (!loading && student) {
      document.title = `${originalTitle} | ${student.firstName} ${student.lastName}`;
    }

    return () => {
      document.title = originalTitle;
    };
  }, [loading, student]);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <>
      {!loading && !error && (
        <>
          {isEditing ? (
            <>
              <EditSingleStudent student={student} onSubmit={handleSave} />
            </>
          ) : (
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
                    to="/dashboard/students"
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
                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{student.firstName}</span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Last Name
                    </dt>
                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{student.lastName}</span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Email
                    </dt>
                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{student.email}</span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Phone
                    </dt>
                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{student.phone}</span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Grade
                    </dt>
                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">{student.grade}</span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Section
                    </dt>
                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex-grow">
                        {student.instrument
                          ? student.instrument
                          : "No section assigned"}
                      </span>
                    </dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Uniforms
                    </dt>
                    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="flex flex-grow flex-col">
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
                type="button"
                onClick={handleEdit}
                className="rounded-md text-sm flex items-center px-3 py-2 text-white bg-emerald-500 hover:bg-emerald-600"
              >
                <span className="mr-2">
                  <FaEdit className="h-4 w-4" />
                </span>
                Edit Student
              </button>
              <div className="mt-2">
                <button
                  className="flex items-center rounded-md px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <FaTrash className="text-white mr-2" />
                  <p>Delete Student</p>
                </button>

                {showDeleteModal && (
                  <DeleteModal studentId={id} state={showDeleteModal} closeModal={() => setShowDeleteModal(false)}/>
                )}
              </div>
              {/* <DeleteStudentButton studentId={id} /> */}
            </>
          )}
        </>
      )}
    </>
  );
}

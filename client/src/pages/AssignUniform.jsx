import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_STUDENTS, GET_UNIFORM, GET_UNIFORMS } from "../utils/queries";
import { ASSIGN_UNIFORM_TO_STUDENT } from "../utils/mutations";

import Spinner from "../components/Spinner";

export default function AssignUniform() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const {
    loading: uniformLoading,
    error: uniformError,
    data: uniformData,
  } = useQuery(GET_UNIFORM, {
    variables: { uniformId: id },
  });

  const {
    loading: studentLoading,
    error: studentError,
    data: studentData,
  } = useQuery(GET_STUDENTS);

  const [assignUniformToStudent] = useMutation(ASSIGN_UNIFORM_TO_STUDENT, {
    refetchQueries: [{ query: GET_UNIFORMS }],
  });

  const uniform = uniformData?.getUniform || {};
  const students = studentData?.getStudents || {};

  const handleAssignUniform = async () => {
    try {
      const { data } = await assignUniformToStudent({
        variables: { studentId: selectedStudentId, uniformId: id },
      });
      console.log(data); // handle response

      navigate("/uniforms");
    } catch (err) {
      console.error(err); // handle error
    }
  };

  if (uniformLoading || studentLoading) return <Spinner />;
  if (uniformError || studentError) return <p>Error</p>;

  return (
    <>
      {!uniformLoading && !uniformError && (
        <>
          <p>{uniform.name}</p>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Assign To
            </label>
            <select
              id="student"
              name="student"
              defaultValue={"Select Student"}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="mt-2 block rounded-md w-full sm:max-w-[250px] border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option disabled>Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="mt-1 text-sm font-normal w-full sm:w-auto rounded-md px-4 py-2 bg-amber-500 text-white hover:bg-amber-600"
              onClick={handleAssignUniform}
            >
              Assign Uniform
            </button>
          </div>
        </>
      )}
    </>
  );
}

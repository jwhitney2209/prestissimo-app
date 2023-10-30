import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_STUDENTS } from "../utils/queries";
import { DELETE_STUDENT } from "../utils/mutations";

import { FaTrash } from "react-icons/fa";
// eslint-disable-next-line
export default function DeleteStudentButton({ studentId }) {
  const navigate = useNavigate();

  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    variables: { studentId: studentId },
    onCompleted: () => navigate('/students'),
    refetchQueries: [{ query: GET_STUDENTS }],

  });
  return (
    <>
      <div className="mt-2">
        <button className="flex items-center rounded-md px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm" onClick={deleteStudent}>
          <FaTrash className="text-white mr-2" />
          <p>Delete Student</p>
        </button>
      </div>
    </>
  );
}

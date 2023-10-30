import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { GET_UNIFORMS } from "../utils/queries";
import { DELETE_UNIFORM } from "../utils/mutations";

import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";

UniformTable.propTypes = {
  uniforms: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string,
};

export default function UniformTable(props) {
  const navigate = useNavigate();
  const { uniforms, category } = props;
  const [deleteUniform] = useMutation(DELETE_UNIFORM, {
    refetchQueries: [{ query: GET_UNIFORMS }],
  });

  const sizeOrder = ["0","2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28"]
  function sortedUniforms(a, b) {
    return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
  }

  const handleDelete = async (uniformId) => {
    try {
      await deleteUniform({
        variables: { uniformId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavToAssign = async (uniformId) => {
    try {
      navigate(`/assign-uniform/${uniformId}`);
    } catch (err) {
      console.error(err);
    }
  }
  // const handleModal = async (uniformId) => {
  //   console.log(`${uniformId} is being sent!`);
  //   try {
  //     setOpenModal(true);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <>
      <div className="">
        <button
          onClick={() => window.location.reload()}
          className="flex rounded-md text-white text-sm font-medium py-2.5 px-3 bg-amber-600 hover:bg-amber-500"
        >
          <ArrowSmallLeftIcon className="h-5 w-5 text-white" />
          &nbsp; Return to View Categories
        </button>
        <div className="sm:flex sm:items-center mt-8">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all {category} in your inventory. From here you can
              edit, assign, or delete these items.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:-mx-0 ">
          <table className="w-full table-auto divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Name
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                  Size
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                  Assigned To
                </th>
                <th scope="col" className="hidden relative py-3.5 sm:pr-0">
                  <span className="sr-only">Assigned To Student</span>
                </th>
                <th scope="col" className="hidden relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {uniforms.sort(sortedUniforms).map((uniform) => (
                <tr key={uniform.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {uniform.name}
                    <dl className="font-normal sm:hidden">
                      <dt className="sr-only">Size</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {uniform.size}
                      </dd>
                    </dl>
                    <dl className="font-normal sm:hidden">
                      <dt className="sr-only">Assigned To</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {uniform.assignedTo
                          ? `${
                              uniform.assignedTo.firstName ?? "Not Assigned"
                            } ${uniform.assignedTo.lastName ?? ""}`
                          : "Not Assigned"}
                      </dd>
                    </dl>
                    <dl className="font-normal sm:hidden">
                      <dt className="sr-only">Assigned To</dt>
                      <dd className="mt-1 truncate">
                        <button
                          onClick={() => handleNavToAssign(uniform.id)}
                          type="button"
                          className="text-white text-center w-full rounded-md bg-amber-600 px-4 py-2 hover:bg-amber-500"
                        >
                          Assign to Student
                        </button>
                      </dd>
                    </dl>
                    <dl className="font-normal sm:hidden">
                      <dt className="sr-only">Delete</dt>
                      <dd className="mt-1 truncate">
                        <button
                          onClick={() => handleDelete(uniform.id)}
                          className="text-white w-full rounded-md bg-red-600 px-4 py-2 hover:bg-red-700"
                        >
                          Delete
                          <span className="sr-only">, {uniform.name}</span>
                        </button>
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {uniform.size}
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {uniform.assignedTo
                      ? `${uniform.assignedTo.firstName ?? "Not Assigned"} ${
                          uniform.assignedTo.lastName ?? ""
                        }`
                      : "Not Assigned"}
                  </td>
                  <td className="hidden whitespace-nowrap py-4 text-center text-sm font-medium sm:pr-0 sm:table-cell">
                    <button
                      onClick={() => handleNavToAssign(uniform.id)}
                      type="button"
                      className="text-white rounded-md bg-amber-600 px-4 py-2 hover:bg-amber-500"
                    >
                      Assign to Student
                    </button>
                  </td>
                  <td className="hidden whitespace-nowrap py-4 text-center text-sm font-medium sm:pr-0 sm:table-cell">
                    <button
                      onClick={() => handleDelete(uniform.id)}
                      className="text-white rounded-md bg-red-600 px-4 py-2 hover:bg-red-700"
                    >
                      Delete<span className="sr-only">, {uniform.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

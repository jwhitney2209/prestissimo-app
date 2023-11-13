import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CONVERT_CSV_TO_JSON } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import { GET_STUDENTS } from "../../utils/queries";

export default function UploadStudents() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  //eslint-disable-next-line
  const [convertCSV, { data, loading, error }] =
    useMutation(CONVERT_CSV_TO_JSON, {
      refetchQueries: [{ query: GET_STUDENTS }],
    })

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (file === null) {
      console.log("no file selected");
      return;
    } else {
      formData.append("file", file);
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error during upload");
        }

        const data = await response.json();
        // Now you can use data.url to send to your GraphQL mutation

        // Split the url by '/' and take the last two parts
        const parts = data.url.split("/");
        const url = parts.slice(parts.length - 2).join("/");

        await convertCSV({ variables: { url } });

        navigate("/dashboard/students");
      } catch (error) {
        console.error("Error:", error);
        // Handle error appropriately in your app
      }
    }
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button
          className="rounded-md bg-amber-600 text-gray-50 py-2 px-3 hover:bg-amber-500"
          onClick={handleUpload}
        >
          Import
        </button>
      </div>
    </>
  );
}

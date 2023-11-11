/* eslint-disable no-unused-vars */
import { useMutation } from "@apollo/client";
import { VERIFY_USER } from "../utils/mutations";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Auth from "../utils/auth";

export default function Verify() {
  console.log("verify page visited");
  const navigate = useNavigate();
  const { token } = useParams();
  const [verifyUser, { loading, error, data }] = useMutation(VERIFY_USER);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (token) {
      verifyUser({
        variables: {
          token,
        },
      }).then((response) => {
        if (response.data && response.data.verifyUser) {
          const newToken = response.data.verifyUser.token;
          Auth.login(newToken, navigate);

          setIsRedirecting(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 5000);
        }
      });
    }
  }, [token, verifyUser, navigate]);

  if (loading) return <p>Verifying...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <>
      <div className="bg-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Thank you for verifying your email!
              <br />
              You will automatically be redirected to your dashboard in 5
              seconds.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Click the button below if you are not automatically redirected.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/dashboard"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

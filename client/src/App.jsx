import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

import { Routes, Route } from "react-router-dom";



// Pages Imports
import Home from "./pages/Home";
import Console from "./pages/Console";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Uniforms from "./pages/Uniforms";
import AddUniform from "./pages/AddUniform";
import Financials from "./pages/Financials";
import AssignUniform from "./pages/AssignUniform";
import Verify from "./pages/Verify";
// Components Imports
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./components/landing-page/SignIn";
import SignUp from "./components/landing-page/SignUp";
import Student from "./components/students/Student";
import AddStudentForm from "./components/students/AddStudentForm";
import UploadStudents from "./components/students/UploadStudents";

const httpLink = createUploadLink({
  // uri: `${import.meta.env.VITE_APP_API_URL}/graphql` || "http://localhost:3001/graphql",
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify/:token" element={<Verify />} />

        {/* Private Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Console />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* Nesting add-student inside students */}
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<Student />} />
          <Route path="students/add" element={<AddStudentForm />} />
          <Route path="students/import" element={<UploadStudents />} />
          <Route path="financials" element={<Financials />} />
          <Route path="add-uniform" element={<AddUniform />} />
          <Route path="assign-uniform/:id" element={<AssignUniform />} />
          <Route path="uniforms" element={<Uniforms />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;

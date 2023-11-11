import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import Console from "./pages/Console";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Uniforms from "./pages/Uniforms";
import AddStudent from "./pages/AddStudent";
import AddUniform from "./pages/AddUniform";
import SingleStudent from "./pages/SingleStudent";
import ImportStudent from "./pages/ImportStudent";
import AssignUniform from "./pages/AssignUniform";
import Verify from "./pages/Verify";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getUniformCategories: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

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
  cache,
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
          <Route path="students/:id" element={<SingleStudent />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/import" element={<ImportStudent />} />

          <Route path="add-uniform" element={<AddUniform />} />
          <Route path="assign-uniform/:id" element={<AssignUniform />} />
          <Route path="students/import-students" element={<ImportStudent />} />
          <Route path="uniforms" element={<Uniforms />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;

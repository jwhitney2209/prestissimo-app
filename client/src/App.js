import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { Routes, Route } from "react-router-dom";

import Auth from "./utils/auth";

// Pages and Components
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import Console from "./pages/Console";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Uniforms from "./pages/Uniforms";
import AddStudent from "./pages/AddStudent";
import About from "./pages/About";

const loggedIn = Auth.loggedIn();

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" element={<Console />}>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="add-student" element={<AddStudent />} />
              <Route path="uniforms" element={<Uniforms />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Home />}>
              <Route path="about" element={<About />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </ApolloProvider>
  );
}

export default App;

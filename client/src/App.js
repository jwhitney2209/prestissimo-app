import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Header from "./components/Header";
import CallToAction from "./components/CallToAction";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="mx-auto max-w-7xl">
        <Header />
        <CallToAction />
      </div>
    </ApolloProvider>
  );
}

export default App;

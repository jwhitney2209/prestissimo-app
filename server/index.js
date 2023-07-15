const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

const path = require("path");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  cors: {
    origin: "*",
    credentials: true,
  },
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: ({ req }) => ({ req }),
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();

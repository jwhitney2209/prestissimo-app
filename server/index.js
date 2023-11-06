const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const multer = require("multer");
const AWS = require("aws-sdk");

const path = require("path");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const db = require("./config/connection");
const { authMiddleware } = require("./utils/check-auth");

const PORT = process.env.PORT || 3001;
const app = express();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new AWS.S3();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  cors: {
    origin: "*",
    credentials: true,
  },
  context: ({ req }) => {
    return { req };
  },
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  app.post("/upload", upload.single("file"), async (req, res) => {
    const { originalname, buffer } = req.file;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `csv/${originalname}`,
      Body: buffer,
    };

    try {
      const uploaded = await s3.upload(params).promise();
      res.status(200).json({ url: uploaded.Location });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();

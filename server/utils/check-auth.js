const { GraphQLError } = require("graphql");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split('Bearer ')[1];

    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, process.env.SECRET, { maxAge: "5h" });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ email, _id }) {
    const payload = { email, _id };

    return jwt.sign({ data: payload }, process.env.SECRET, { expiresIn: "5h" });
  },
};


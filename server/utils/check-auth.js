const { GraphQLError } = require('graphql');

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if(authHeader){
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if(token){
      try{
        const user = jwt.verify(token, process.env.SECRET);
        return user;
      } catch(err){
        throw new GraphQLError('Invalid/Expired token');
      }
    } 
    throw new Error('Authentication token must be \'Bearer [token]\'');
  }
  throw new Error('Authorization header must be provided');
}
const { AuthenticationError } = require("apollo-server");

const Person = require("../../models/Person");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPersons() {
      try {
        const persons = await Person.find().sort({ createdAt: -1 });
        return persons;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPerson(_, { personId }) {
      try {
        const person = await Person.findById(personId);
        if (person) {
          return person;
        } else {
          throw new Error("Student not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPerson(
      _,
      {
        personInput: {
          role,
          firstName,
          lastName,
          email,
          phone,
          grade,
        },
      },
      context
    ) {
      const user = checkAuth(context);
      const newPerson = new Person({
        role,
        firstName,
        lastName,
        email,
        phone,
        grade,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });

      const person = await newPerson.save();

      return person;
    },
    async deletePerson(_, { personId }, context) {
      const user = checkAuth(context);

      try {
        const person = await Person.findById(personId);
        const personUserId = person.userId.toHexString();
        if (user.id === personUserId) {
          await person.deleteOne();
          return `${person.firstName} ${person.lastName} deleted successfully`;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }

    },
  },
};

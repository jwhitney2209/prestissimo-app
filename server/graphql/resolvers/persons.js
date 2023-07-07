const { AuthenticationError } = require("apollo-server");

const Person = require("../../models/Person");
const Ensemble = require("../../models/Ensemble");
const Section = require("../../models/Section");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPersons(_, args, context) {
      const user = checkAuth(context);
      try {
        const persons = await Person.find({ userId: user.id }).sort({
          createdAt: -1,
        });
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
      { personInput: { role, firstName, lastName, email, phone, grade } },
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
      try {
        const person = await Person.findByIdAndDelete(personId);
        return `${person.firstName} ${person.lastName} was deleted successfully.`;
      } catch (err) {
        throw new Error(err);
      }
    },
    async updatePerson(
      _,
      {
        personId,
        personInput: {
          role,
          firstName,
          lastName,
          email,
          phone,
          grade,
          accountBalance,
        },
      },
      context
    ) {
      try {
        const person = await Person.findOneAndUpdate(
          { _id: personId },
          {
            $set: {
              role: role,
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              grade: grade,
              accountBalance: accountBalance,
            },
          },
          { new: true }
        );
        return person;
      } catch (err) {
        throw new Error(err);
      }
    },
    async updatePersonWithEnsemble(_, { personId, ensembleId }, context) {
      const ensemble = await Ensemble.findById(ensembleId);
      const ensembleArgs = { id: ensembleId, name: ensemble.name };
      console.log("ensembleArgs: ", ensembleArgs);
      try {
        const person = await Person.findOneAndUpdate(
          { _id: personId },
          {
            $set: {
              ensemble: ensembleArgs,
            },
          },
          { new: true }
        );
        return person;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
};

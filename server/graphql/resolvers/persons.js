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
        const persons = await Person.find({ userId: user.id })
          .sort({
            createdAt: -1,
          })
          .populate('ensembles')
          .populate('section');
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
    async getPersonsByEnsemble(_, { ensembleId }) {
      try {
        const ensemble = await Ensemble.findById(ensembleId);
        if (ensemble) {
          const persons = await Person.find({ ensemble: ensemble });
          return persons;
        } else {
          throw new Error("Ensemble not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPersonsBySection(_, { sectionId }) {
      try {
        const section = await Section.findById(sectionId);
        const sectionName = section.name;
        console.log(sectionName);
        if (section) {
          const persons = await Person.find({ section: { $eq: sectionName } });
          return persons;
        } else {
          throw new Error("Section not found");
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
    async updatePersonEnsemble(_, { personId, ensembleId }, context) {
      const ensemble = await Ensemble.findById(ensembleId);
      try {
        const person = await Person.findOneAndUpdate(
          { _id: personId },
          {
            $push: {
              ensembles: ensemble,
            },
          },
          { new: true }
        ).populate('ensembles');
        return person;
      } catch (err) {
        throw new Error(err);
      }
    },
    async updatePersonSection(_, { personId, sectionId }, context) {
      const section = await Section.findById(sectionId);
      try {
        const person = await Person.findOneAndUpdate(
          { _id: personId },
          {
            $set: {
              section: section,
            },
          },
          { new: true }
        ).populate('section');
        return person;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

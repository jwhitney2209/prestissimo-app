const { AuthenticationError } = require("apollo-server");

const Person = require("../../models/Person");
const Ensemble = require("../../models/Ensemble");
const Section = require("../../models/Section");
const Uniform = require("../../models/Uniform");
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
          .populate("ensembles")
          .populate("section")
          .populate("uniforms");
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
          const persons = await Person.find({ ensembles: ensemble }).populate(
            "section"
          );
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
        if (section) {
          const persons = await Person.find({ section: section }).populate(
            "ensembles"
          );
          return persons;
        } else {
          throw new Error("Section not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPersonsByUniform(_, { uniformId }) {
      try {
        const uniform = await Uniform.findById(uniformId);
        if (uniform) {
          const persons = await Person.find({ uniforms: uniform });
          return persons;
        } else {
          throw new Error("Uniform not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPerson(
      _,
      { firstName, lastName, email, phone, grade },
      context
    ) {
      const user = checkAuth(context);
      const newPerson = new Person({
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
        firstName,
        lastName,
        email,
        phone,
        grade,
        accountBalance,
      },
      context
    ) {
      try {
        const person = await Person.findOneAndUpdate(
          { _id: personId },
          {
            $set: {
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
    async assignEnsembleToPerson(_, { personId, ensembleId }, context) {
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
        ).populate("ensembles");
        return person;
      } catch (err) {
        throw new Error(err);
      }
    },
    async assignSectionToPerson(_, { personId, sectionId }, context) {
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
        ).populate("section");
        return person;
      } catch (err) {
        throw new Error(err);
      }
    },
    async assignUniformToPerson(_, { personId, uniformId }, context) {
      const uniform = await Uniform.findById(uniformId);
      try {
        const person = await Person.findOneAndUpdate(
          { _id: personId },
          {
            $push: {
              uniforms: uniform,
            },
          },
          { new: true }
        ).populate("uniforms");
        return person;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

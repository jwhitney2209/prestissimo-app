const Ensemble = require("../../models/Ensemble");
const Person = require("../../models/Person");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getEnsembles(_, args, context) {
      const user = checkAuth(context);
      try {
        const ensembles = await Ensemble.find({ userId: user.id }).sort({
          createdAt: -1,
        });
        return ensembles;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getEnsemble(_, { ensembleId }) {
      try {
        const ensemble = await Ensemble.findById(ensembleId);
        if (ensemble) {
          return ensemble;
        } else {
          throw new Error("Ensemble not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getEnsembleMembers(_, { ensembleId }) {
      try {
        const ensemble = await Ensemble.findById(ensembleId);
        console.log(ensemble);
        if (ensemble) {
          return ensemble.members;
        } else {
          throw new Error("Ensemble not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createEnsemble(_, { ensembleInput: { name } }, context) {
      const user = checkAuth(context);
      const newEnsemble = new Ensemble({
        name,
        userId: user.id,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      });
      const ensemble = await newEnsemble.save();
      return ensemble;
    },
    async deleteEnsemble(_, { ensembleId }, context) {
      const user = checkAuth(context);
      try {
        const ensemble = await Ensemble.findById(ensembleId);
        const ensembleUserId = ensemble.userId.toHexString();
        if (user.id === ensembleUserId) {
          await ensemble.deleteOne();
          return `${ensemble.name} deleted successfully`;
        } else {
          throw new Error("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateEnsemble(_, { ensembleId, ensembleInput: { name } }, context) {
      try {
        const ensemble = await Ensemble.findOneAndUpdate(
          { _id: ensembleId },
          { $set: { name: name } },
          { new: true }
        );
        return ensemble;
      } catch (err) {
        throw new Error(err);
      }
    },
    async addEnsembleToPerson(_, { ensembleId, personId }, context) {
      console.log("ensembleId: " + ensembleId + " // personId: " + personId)
      try {
        if (ensembleId && personId) {
          const person = await Person.findByIdAndUpdate(
            { _id: personId },
            { $set: { ensemble: ensembleId } },
            { new: true }
          );
          return person;
        } else {
          throw new Error("Ensemble or Person not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
};

const Ensemble = require('../../models/Ensemble');
const checkAuth = require('../../utils/check-auth');

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
    getEnsemble: async (_, { ensembleId }) => {
      try {
        const ensemble = await Ensemble.findById(ensembleId);
        if (ensemble) {
          return ensemble;
        } else {
          throw new Error('Ensemble not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
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
          throw new Error('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateEnsemble(_, { ensembleId, ensembleInput: { name } }, context) {
      const ensemble = (await Ensemble.updateOne({ _id: ensembleId }, { name: name })).modifiedCount;
      return ensemble; // 1 if something was edited, 0 if nothing was edited.
    }
  },
}
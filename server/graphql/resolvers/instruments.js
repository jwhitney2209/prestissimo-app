const Instrument = require("../../models/Instrument");
const { authMiddleware } = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getSections(_, args, context) {
      const user = context.user;
      try {
        const sections = await Instrument.find({ userId: user._id }).sort({
          createdAt: -1,
        });
        return sections;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSection(_, { sectionId }) {
      try {
        const section = await Instrument.findById(sectionId);
        if (section) {
          return section;
        } else {
          throw new Error("Section not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addSection(_, { name }, context) {
      const user = context.user;
      const newSection = new Section({
        name,
        userId: user._id,
        createdAt,
      });
      const section = await newSection.save();
      return section;
    },
    async deleteSection(_, { sectionId }, context) {
      try {
        const section = await Section.findByIdAndDelete(sectionId);
        return `${section.name} was deleted successfully.`;
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateSection(_, { sectionId, name }, context) {
      try {
        const section = await Section.findOneAndUpdate(
          { _id: sectionId },
          { $set: { name: name } },
          { new: true }
        );
        return section;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

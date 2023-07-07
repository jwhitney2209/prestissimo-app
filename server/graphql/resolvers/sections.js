const Section = require("../../models/Section");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getSections(_, args, context) {
      const user = checkAuth(context);
      try {
        const sections = await Section.find({ userId: user.id }).sort({
          createdAt: -1,
        });
        return sections;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSection(_, { sectionId }) {
      try {
        const section = await Section.findById(sectionId);
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
    async createSection(_, { sectionInput: { name } }, context) {
      const user = checkAuth(context);
      const newSection = new Section({
        name,
        userId: user.id,
        createdAt: new Date().toISOString(),
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
    async updateSection(_, { sectionId, sectionInput: { name } }, context) {
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

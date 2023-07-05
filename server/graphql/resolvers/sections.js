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
      const user = checkAuth(context);
      try {
        const section = await Section.findById(sectionId);
        const sectionUserId = section.userId.toHexString();
        if (user.id === sectionUserId) {
          await section.deleteOne();
          return `${section.name} deleted successfully.`;
        } else {
          throw new Error("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateSection(_, { sectionId, sectionInput: { name } }, context) {
      const section = (await Section.updateOne({ _id: sectionId }, { name: name })).modifiedCount;
      return section; // 1 if something was edited, 0 if nothing was edited.
    },
  },
};

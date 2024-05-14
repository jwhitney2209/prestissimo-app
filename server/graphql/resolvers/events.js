const Event = require('../../models/Event');
const Student = require('../../models/Student');

module.exports = {
  Query: {
    async getEvents(_, args, context) {
      const user = context.user;

      if (!user) {
        throw new Error("You must be logged in to perform this action.");
      }
      try {
        const events = await Event.find({ userId: user._id }).sort({ createdAt: -1 });
        return events;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getEvent(_, { eventId }) {
      try {
        const event = await Event.findById(eventId);
        if (event) {
          return event;
        } else {
          throw new Error('Event not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addEvent(_, { input }, context) {
      const user = context.user;

      if (!user) {
        throw new Error("You must be logged in to perform this action.");
      }

      const { title, date, description, cost, participants } = input;

      const newEvent = new Event({
        userId: user._id,
        title,
        date,
        description,
        cost,
        participants,
        createdAt: new Date().toISOString(),
      });

      const event = await newEvent.save();
      return event;
    },
    async updateEvent(_, { eventId, input }, context) {
      const user = context.user;

      if (!user) {
        throw new Error("You must be logged in to perform this action.");
      }

      const { title, date, description, cost, participants } = input;

      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          title,
          date,
          description,
          cost,
          participants,
        },
        { new: true }
      );

      return updatedEvent;
    },
    async deleteEvent(_, { eventId }, context) {
      const user = context.user;

      if (!user) {
        throw new Error("You must be logged in to perform this action.");
      }

      try {
        const event = await Event.findById(eventId);
        if (user._id.toString() === event.userId.toString()) {
          await event.delete();
          return "Event deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  }
}
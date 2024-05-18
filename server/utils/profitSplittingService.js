const Student = require("../models/Student");
const Event = require("../models/Event");
const Payment = require("../models/Payment");
const User = require("../models/User");

async function handleFundraiserPayment(studentId, eventId, amount, vendorPercentage, schoolPercentage, studentPercentage) {
  const event = await Event.findById(eventId);
  const student = await Student.findById(studentId);
  
}
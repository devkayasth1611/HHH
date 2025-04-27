const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    alternativePhone: {
      type: String,
      trim: true,
      // required: true, 
    },
    alternativeAddress: {
      type: String,
      trim: true,
      // required: true,
    },
    serviceIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    }],    
    userId: {  
      type: Schema.Types.ObjectId,
      ref: 'User',  
      required: true,
    },
    assignedProviders: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
        },
        providerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ServiceProvider',
        }
      }
    ],
    date: { type: Date, required: true }, // 🛑 Important to add this field
    bookingStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);

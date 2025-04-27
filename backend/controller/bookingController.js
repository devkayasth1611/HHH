const Booking = require("../model/bookingModel");
const nodemailer = require("nodemailer");
const ServiceProvider = require("../model/serviceProviderModel");
const Service = require("../model/serviceModel");
const User = require("../model/userModel"); // Import the User model  

exports.addBooking = async (req, res) => {
  const {
    userId,
    serviceIds,
    address,
    alternativeAddress,
    phoneNumber,
    alternativePhone,
    date, // 🛑 receive date from body
  } = req.body;

  try {
    const newBooking = new Booking({
      userId,
      serviceIds,
      address,
      alternativeAddress,
      phoneNumber,
      alternativePhone,
      date,
    });

    await newBooking.save();

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("userId")
      .populate("serviceIds", "serviceName"); // Populate service names as well

    // Send confirmation email
    const userEmail = populatedBooking.userId.email;
    const userName = populatedBooking.userId.fullName;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "devkayasth1611@gmail.com", // Your email here
        pass: "fatd kdha mlbu kpja",   // Your email password here
      },
    });

    const mailOptions = {
      from: "devkayasth1611@gmail.com",  // Your email here
      to: userEmail,
      subject: "Booking Confirmation",
      text: `Dear ${userName},\n\nYour booking has been confirmed.\n\nBooking Details:\n\nService(s): ${populatedBooking.serviceIds
        .map((service) => service.serviceName)
        .join(", ")}\nAddress: ${populatedBooking.address}\nPhone: ${populatedBooking.phoneNumber}\nAlternative Address: ${populatedBooking.alternativeAddress}\nAlternative Phone: ${populatedBooking.alternativePhone}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(200).json({
      status: "success",
      data: populatedBooking,
    });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add booking",
    });
  }
};


exports.getAllBookings = (req, res) => {
  Booking.find()
    .populate("userId", "fullName email phoneNumber") // Populate the user's phone number, email, and full name
    .populate("serviceIds", "serviceName _id") // Populate the services by serviceName and _id
    .then((data) => {
      res.json({
        message: "Bookings fetched successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while fetching bookings",
        status: 400,
        error: err,
      });
    });
};

exports.getBookingById = (req, res) => {
  Booking.findById(req.params.id)
    .populate("userId", "fullName email phoneNumber") // Add phoneNumber for service provider detail
    .populate("serviceIds", "serviceName _id") // Include _id to identify the services clearly
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Booking not found",
          status: 404,
        });
      }

      res.status(200).json({
        message: "Booking fetched successfully",
        status: 200,
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong while fetching the booking",
        status: 400,
        error: err.message,
      });
    });
};


exports.updateBookingById = (req, res) => {
  Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.json({
        message: "Booking updated successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while updating the booking",
        status: 400,
        error: err,
      });
    });
};

exports.deleteBookingById = (req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json({
        message: "Booking deleted successfully",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while deleting the booking",
        status: 400,
        error: err,
      });
    });
};

exports.getBookingHistoryByUserId = (req, res) => {
  Booking.find({ userId: req.params.userId })
    .populate("userId", "fullName email")
    .populate("serviceIds", "serviceName")
    .then((data) => {
      res.json({
        message: "Booking history fetched successfully",
        status: 200,
        history: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong while fetching booking history",
        status: 400,
        error: err,
      });
    });
};

exports.assignProvidersToBooking = async (req, res) => {
  const { providers } = req.body; // { serviceId: providerId }

  try {
    const assignedProviders = Object.entries(providers).map(([serviceId, providerId]) => ({
      serviceId,
      providerId,
    }));

    await Booking.findByIdAndUpdate(req.params.bookingId, {
      $set: { assignedProviders },
    });

    res.status(200).json({ status: 200, message: "Providers assigned successfully" });
  } catch (error) {
    console.error("Error assigning providers:", error);
    res.status(500).json({ status: 500, message: "Failed to assign providers", error });
  }
};

exports.getAssignedProviders = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId).lean();

    if (!booking || !booking.assignedProviders) {
      return res.status(404).json({
        status: 404,
        message: "Booking not found or no assigned providers",
      });
    }

    const providers = await Promise.all(
      booking.assignedProviders.map(async (assignment) => {
        const provider = await ServiceProvider.findById(assignment.providerId).lean();
        const service = await Service.findById(assignment.serviceId).lean();

        return {
          userId: booking.userId,           // Add userId here
          serviceId: assignment.serviceId,  // Add serviceId
          providerId: assignment.providerId,// Add providerId
          fullName: provider?.fullName || "N/A",
          phoneNumber: provider?.phoneNumber || "N/A",
          email: provider?.email || "N/A",
          serviceName: service?.serviceName || "Unknown Service",
          date: assignment.date || "N/A",    // <-- Also return assigned date if available
        };
      })
    );

    // 🛠️ Here: Return booking date as well
    res.status(200).json({
      status: 200,
      providers,
      bookingDate: booking.date || null,  // <-- Add booking date here
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
};



// Get bookings assigned to a specific service provider
exports.getBookingsByProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;

    const bookings = await Booking.find({
      [`assignedProviders`]: {
        $elemMatch: { providerId: providerId },
      },
    })
      .populate("userId", "fullName phoneNumber email") // Populate user details
      .populate("serviceIds", "serviceName") // Populate service details
      .lean(); // Use lean() for faster querying if you don't need Mongoose documents

    // Optionally, you might want to further process the data to structure
    // it in a way that's easier to use on the frontend.
    const formattedBookings = bookings.map((booking) => ({
      ...booking,
      assignedServices: booking.serviceIds.map((service) => {
        const assigned = booking.assignedProviders.find(
          (ap) => ap.serviceId === service._id && ap.providerId === providerId
        );
        return assigned ? service : null;
      }).filter(Boolean),
    }));

    res.status(200).json({ status: 200, data: formattedBookings });
  } catch (error) {
    console.error("Error fetching provider bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// Fetch users assigned to a specific service provider
exports.getUsersByProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;

    const bookings = await Booking.find({
      assignedProviders: { $elemMatch: { providerId: providerId } },
    })
      .populate("userId", "fullName email phoneNumber")
      .lean();

    if (!bookings.length) {
      return res.status(404).json({
        status: 404,
        message: "No users found for this provider",
      });
    }

    const users = bookings.map((booking) => ({
      userId: booking.userId._id,
      fullName: booking.userId.fullName,
      email: booking.userId.email,
      phoneNumber: booking.userId.phoneNumber,
    }));

    // Optional: Remove duplicate users if same user booked multiple services
    const uniqueUsers = users.filter(
      (user, index, self) =>
        index === self.findIndex((u) => u.userId.toString() === user.userId.toString())
    );

    res.status(200).json({ status: 200, users: uniqueUsers });
  } catch (error) {
    console.error("Error fetching users by provider:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

exports.completeBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Logic to mark booking as completed
    booking.status = "completed";  // Assuming you want to add a 'status' field for the booking
    await booking.save();

    res.status(200).json({ message: "Booking completed successfully", data: booking });
  } catch (error) {
    console.error("Error completing booking:", error);
    res.status(500).json({ message: "Failed to complete booking", error });
  }
};

const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");

router.post("/booking", bookingController.addBooking); // Add booking
router.get("/booking", bookingController.getAllBookings); // Get all bookings
router.get("/booking/:id", bookingController.getBookingById); // Get booking by ID
router.put("/booking/:id", bookingController.updateBookingById); // Update booking
router.delete("/booking/:id", bookingController.deleteBookingById); // Delete booking
router.get('/booking/history/:userId', bookingController.getBookingHistoryByUserId);
// Route to assign provider to booking
router.post("/assign-provider/:bookingId", bookingController.assignProvidersToBooking);
router.get("/assigned-providers/:bookingId", bookingController.getAssignedProviders);
router.get("/provider/:providerId", bookingController.getBookingsByProvider);
router.get("/users-by-provider/:providerId", bookingController.getUsersByProvider);
router.put("/complete/:id", bookingController.completeBooking); // Complete booking

module.exports = router;

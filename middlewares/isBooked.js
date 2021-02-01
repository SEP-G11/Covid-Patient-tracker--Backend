module.exports = {
  isBooked: (req, res, next) => {
    if (req.seat_data) {
      next();
    } else {
      res.json({
        success: 0,
        message: "Seat is already booked",
      });
    }
  },
};

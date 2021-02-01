module.exports = {
  isBooked: (req, res, next) => {
    if (req.params.seat_id) {
      next();
    } else {
      res.json({
        success: 0,
        message: "Seat is already booked",
      });
    }
  },
};

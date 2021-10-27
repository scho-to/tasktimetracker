import getDB from "../../../database/db";

export default function bookingsHandler(req, res) {
      if (req.method === "POST") {
          const newBooking = {
              id: new Date().getTime(),
              description: req.body.description,
              datetime: req.body.datetime,
              trackedtime: req.body.trackedtime
          }
          getDB().get("bookings").push(newBooking).save();
          res.status(200).json({message: "success", booking: newBooking});

      }
}
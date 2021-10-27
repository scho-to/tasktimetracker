import getDB from "../../../../../database/db";

import pagination from "../../../../../helper/pagination";

export default function BookingsDescHandler(req, res) {
      if (req.method === "GET"){
        const bookings = getDB().get('bookings').value();
        const filteredBookings = bookings.filter(booking => {
            return booking.description.includes(req.query.desc);
        })
        const paginatedBookings = pagination(filteredBookings, 5, req.query.page);
        const pages = Math.ceil(filteredBookings.length / 5);
        res.status(200).json({ message: 'success', bookings: filteredBookings, pages: pages});
      }
}
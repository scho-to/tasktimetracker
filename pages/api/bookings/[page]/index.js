import getDB from "../../../../database/db";

import pagination from "../../../../helper/pagination";

export default function BookingsPageHandler(req, res) {
    if (req.method === "GET"){
        const bookings = getDB().get('bookings').value();
        const paginatedBookings = pagination(bookings, 5, req.query.page);
        const pages = Math.ceil(bookings.length / 5);
        res.status(200).json({ message: 'success', bookings: paginatedBookings, pages: pages});
    }
}
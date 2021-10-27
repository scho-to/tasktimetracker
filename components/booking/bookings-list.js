import { resolveHref } from "next/dist/shared/lib/router/router";
import { useEffect, useState } from "react"

import classes from './bookings-list.module.css';

export default function BookingsList(props) {
    
    // Format of the date vaue in the DB to be human-readable (english)
    function _getHumanReadableDate(date) {
        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }

    if (props.bookings.length === 0){
        return <p>Add some bookings. They will appear here.</p>
    }

    return (
        <div>
            <ul className={classes.listbox}>
                {props.bookings.map(booking => {
                    return (
                        <li className={classes.listboxitem} key={booking.id}>
                            <div className="classes.listboxitem_header">
                                {_getHumanReadableDate(booking.datetime)}, tracked time: {booking.trackedtime}
                            </div>
                            <hr />
                            <h5>Description:</h5>
                            <p>{booking.description}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
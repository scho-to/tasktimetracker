import { Fragment, useEffect, useRef, useState } from "react";
import Link from 'next/link';

import CustomButton from "../ui/custom-button";
import TimeBooker from "../booking/time-booker";
import BookingsList from "../booking/bookings-list";

import classes from './tracker.module.css';

//Contant for the RESET_TIME-State
const RESET_TIME = {
    seconds: 0,
    minutes: 0,
    hours: 0
}

export default function TrackerItem(props) {
    const [time, setTime] = useState(RESET_TIME);
    const [isStarted, setIsStarted] = useState(false);
    const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState([1]);

    const inputSearch = useRef("");

    let formattedSeconds = "";
    let formattedMinutes = "";
    let formattedHours = "";

    let formattedTime = "";

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(calculateTime());
        }, 100);

        return () => {
            clearTimeout(timer);
        }
    });

    useEffect(() => {
        fetch("/api/bookings/" + page)
        .then(res => {
            return res.json();
        })
        .then(resJson => {
            setBookings(resJson.bookings);
            const pages = [];
            for(let i = 1; i <= resJson.pages; i++){
                pages.push(i);
            }
            setMaxPages(pages);
        })
    },[isBookingFormVisible, page])

    //Calculates the time for the timer.
    function calculateTime(){
        let seconds = time.seconds;
        let minutes = time.minutes;
        let hours = time.hours;
        if(isStarted){

            seconds++;
    
            if (seconds == 60){
                minutes++;
                seconds = 0;
            }
    
            if (minutes == 60) {
                hours++;
                minutes = 0;
            }
        }

        return {
            seconds: seconds,
            minutes: minutes,
            hours: hours
        };
    }
    
    // toggles the Timer to run/resume or to stop.
    function toggleTimer(){
        setIsStarted(!isStarted);
    }

    // resets the timer to the initial state.
    function resetTimer(){
        setTime(RESET_TIME);
    }

    // toggles the Booking Form, to book a timer value.
    function toggleBookingForm(doReset = false) {
        if (doReset === true){
            resetTimer();
        }
        setIsBookingFormVisible(!isBookingFormVisible);
    }

    // Sets the current page for the displayed bookings. Max 5 at a time.
    function setPageHandler(page) {
        setPage(page);
    }

    // Creates the Pagination
    function getPagination(){
        return (
            <Fragment>
                <hr />
                <p>Pages:</p>
                {maxPages.map(page => (
                    <CustomButton isPagination={true} key={page} clickHandler={() => setPageHandler(page)}>{page}</CustomButton>
                ))}
            </Fragment>
        )
    }

    function searchBookingsHandler(){
        const valueSearchbar = inputSearch.current.value;
        fetch ("/api/bookings/" + page + "/" + valueSearchbar)
        .then(res => res.json())
        .then(resJson => {
            setBookings(resJson.bookings);
            const pages = [];
            for(let i = 1; i <= resJson.pages; i++){
                pages.push(i);
            }
            setMaxPages(pages);
        })
    }

    // Formats the seconds, minutes and hours to be always 2-digit long.
    function _pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }

    formattedSeconds = _pad(time.seconds, 2);
    formattedMinutes = _pad(time.minutes, 2);
    formattedHours = _pad(time.hours, 2);

    formattedTime = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

    //Displays the Booking Form
    if (isBookingFormVisible){
        return (
            <div className={classes.container}>
                <TimeBooker displayTime={formattedTime} closeHandler={toggleBookingForm} />
                <div className={classes.group}>
                    <CustomButton clickHandler={toggleBookingForm}>Close Form</CustomButton>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.container}>
            <div className={classes.timer}>
                <h1 onClick={toggleTimer}>{formattedTime}</h1>
            </div>
            <div className={classes.controls}>
                {!isStarted && (
                    <Fragment>
                        <div className={classes.group}>
                            <CustomButton clickHandler={toggleTimer}>Start</CustomButton>
                            <CustomButton clickHandler={toggleBookingForm}>Book Time</CustomButton>
                        </div>
                        <div className={classes.group}>
                            <CustomButton clickHandler={resetTimer}>Reset</CustomButton>
                        </div>
                    </Fragment>
                )}
                {isStarted && (
                    <Fragment>
                        <CustomButton clickHandler={toggleTimer}>Stop</CustomButton>
                    </Fragment>
                )}
                
            </div>
            <hr />
            <input className={classes.searchbar} type="text" id="search" name="search" placeholder="description like..." ref={inputSearch} onChange={searchBookingsHandler} />
            <BookingsList bookings={bookings}></BookingsList>
            {bookings.length === 0 ? null : getPagination()}
        </div>
    )
}
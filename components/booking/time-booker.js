import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import CustomButton from '../ui/custom-button';

import classes from './time-booker.module.css';

export default function TimeBooker(props) {
    const[trackedTime, setTrackedTime] = useState(props.displayTime);

    const inputDescription = useRef("");
    const inputDateTime = useRef("");
    const inputTrackedTime = useRef("");

    const router = useRouter();

    useEffect(() => {
        inputTrackedTime.current.value = trackedTime;
    });

    //Submits the form to execute an ajax call via the built-in fetch method
    function submitFormHandler(e){
        e.preventDefault();
        
        const valueDescrition = inputDescription.current.value;
        const valueDateTime = inputDateTime.current.value;
        const valueTrackedTime = inputTrackedTime.current.value;

        fetch('/api/bookings', {
            method: "POST",
            body: JSON.stringify({
                description: valueDescrition,
                datetime: valueDateTime,
                trackedtime: valueTrackedTime
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(rawResult => rawResult.json())
        .then(jsonResult => {
            props.closeHandler(true);
        });
    }

    // Clientside Validation of the Input-Fields. Booking button will be disabled,
    // if validation fails
    function _validateInput(){
        if(!inputDescription || !inputTrackedTime || !inputDateTime){
            return <CustomButton isDisabled={true}>Book this Task</CustomButton>;
        }
        const valueDescrition = inputDescription.current.value || "";
        const valueDateTime = inputDateTime.current.value || "";
        const valueTrackedTime = inputTrackedTime.current.value || "";

        if (valueDescrition === "" || valueDateTime === "" || valueTrackedTime === ""){
            return <CustomButton isSubmitDisabled={true}>Book this Task</CustomButton>
        }
        return <CustomButton isSubmit={true}>Book this Task</CustomButton>
    }

    return (
        <Fragment>
            <div className={classes.header}>
                <h1>Book your Time</h1>
                <hr />
            </div>
            <div className={classes.form_body} >
                <form onSubmit={submitFormHandler}>
                    <div className={classes.form_group}>
                        <label htmlFor="description">Description: </label>
                        <textarea id="description" name="description" ref={inputDescription} rows="5" required/>
                    </div>
                    <div className={classes.form_group}>
                        <label htmlFor="datetime">Date and Time: </label>
                        <input type="datetime-local" name="datetime" ref={inputDateTime} id="datetime" required/>
                    </div>
                    <div className={classes.form_group}>
                        <label htmlFor="time">Tracked time: </label>
                        <input type="time" name="time" id="time" step="1" ref={inputTrackedTime} required/>
                    </div>
                    <div className={classes.form_group}>
                        {_validateInput()}
                    </div>
                </form>
                <hr />
            </div>
        </Fragment>
    )
}
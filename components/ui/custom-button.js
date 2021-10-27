import classes from './custom-button.module.css';

export default function CustomButton(props) {
    if (props.isDisabled){
        return (
            <button onClick={props.clickHandler} className={classes.btn} disabled>
                {props.children}
            </button>
        )
    }

    if (props.isSubmit){
        return (
            <button type="submit" onClick={props.clickHandler} className={classes.btn}>
                {props.children}
            </button>
        )
    }

    if (props.isSubmitDisabled){
        return (
            <button type="submit" onClick={props.clickHandler} className={classes.btn} disabled>
                {props.children}
            </button>
        )
    }

    if (props.isPagination){
        return (
            <button onClick={props.clickHandler} className={classes.pagination_btn}>
                {props.children}
            </button>
        )
    }

    return (
        <button onClick={props.clickHandler} className={classes.btn}>
            {props.children}
        </button>
    )
}
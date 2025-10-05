import styles from './Toast.module.css';
import { Link } from "react-router";


interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    icon?: string;
    linkTo?: string;
}


function Toast(props: ToastProps) {
    const isClickable = props.onClick || props.linkTo;
    const className = `${props.className ?? ""} ${styles.toast} ${isClickable ? styles.toast_clickable : ""}`.trim();

    const divProps: ToastProps = {...props, className};
    delete divProps.title;
    delete divProps.icon;
    delete divProps.linkTo;

    const toast = (
        <div {...divProps}>
            {props.icon ? <img className={styles.toast_icon} src={props.icon} alt="toast icon" /> : undefined}
                
            <div className={styles.text_content}>
                <span className={styles.text_title}>{props.title}</span>
                <span className={styles.user_text}>{props.children}</span>
            </div>
        </div>
    );

    return (
        // The toast uses the ``outline`` css property,
        // meaning it uses up more space than it has.
        // To remedy this, we wrap it in a spacer.
        <div className={styles.toast_spacer}>
            {props.linkTo ? <Link to={props.linkTo}>{toast}</Link> : toast}
        </div>
    );
}


export default Toast;

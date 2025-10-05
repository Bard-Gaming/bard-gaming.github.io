import styles from './Toast.module.css';


interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    icon?: string;
}


function Toast(props: ToastProps) {
    const className = `${props.className ?? ""} ${styles.toast} ${props.onClick ? styles.toast_clickable : ""}`.trim();

    const divProps: ToastProps = {...props, className};
    delete divProps.title;
    delete divProps.icon;

    return (
        // The toast uses the ``outline`` css property,
        // meaning it uses up more space than it has.
        // To remedy this, we wrap it in a spacer.
        <div className={styles.toast_spacer}>
            <div {...divProps}>
                {props.icon ? <img className={styles.toast_icon} src={props.icon} alt="toast icon" /> : undefined}
                
                <div className={styles.text_content}>
                    <span className={styles.text_title}>{props.title}</span>
                    <span className={styles.user_text}>{props.children}</span>
                </div>
            </div>
        </div>
    );
}


export default Toast;

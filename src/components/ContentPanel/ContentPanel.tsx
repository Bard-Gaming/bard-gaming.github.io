import styles from './ContentPanel.module.css';


interface ContentPanelProps {
    title?: string;

    width?: number | string;
    height?: number | string;

    children?: React.ReactNode;
}


function ContentPanel({ title = "<Unnamed>", width, height, children }: ContentPanelProps) {
    return (
        <div className={styles.content_panel} style={{ width, height }}>
            <div className={styles.panel_header}>
                <h1>{title}</h1>
            </div>

            <div className={styles.panel_content}>
                {children}
            </div>
        </div>
    );
}


export default ContentPanel;

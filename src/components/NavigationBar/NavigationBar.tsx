import { Link } from "react-router";
import styles from './NavigationBar.module.css';
import Logo from '/teadore.jpg';


interface NavigationBarProps {
    title: string;
}


function NavigationBar({ title }: NavigationBarProps) {
    return (
        <nav className={styles.navigation_bar}>
            {/* Left */}
            <div className={styles.navbar_aligner}>
                <Link to="/"><img className={styles.navbar_logo} src={Logo} /></Link>
                <Link to="/"><h1 className={styles.navbar_title}>{title}</h1></Link>
            </div>

            {/* Right */}
            <div className={styles.navbar_aligner}>
            </div>
        </nav>
    );
}


export default NavigationBar;

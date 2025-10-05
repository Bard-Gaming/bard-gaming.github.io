import { useContext } from "react";
import styles from './NavigationBar.module.css';
import Logo from '/teadore.jpg';
import CurrentPageContext from "../../hooks/CurrentPageContext";
import HomePage from "../../pages/HomePage/HomePage";


interface NavigationBarProps {
    title: string;
}


function NavigationBar({ title }: NavigationBarProps) {
    const [_currentPage, setCurrentPage] = useContext(CurrentPageContext);

    return (
        <nav className={styles.navigation_bar}>
            {/* Left */}
            <div className={styles.navbar_aligner}>
                <img className={styles.navbar_logo} onClick={() => setCurrentPage(<HomePage />)} src={Logo} />
                
                <h1 className={styles.navbar_title} onClick={() => setCurrentPage(<HomePage />)}>
                    {title}
                </h1>
            </div>

            {/* Right */}
            <div className={styles.navbar_aligner}>
            </div>
        </nav>
    );
}


export default NavigationBar;

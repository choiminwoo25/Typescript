import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout() {
    return(
        <div className={styles.container}>
        <div className={styles.menuBox}>
            <Link to={"/"}>
                 <div className={styles.menu}></div>
            </Link>
             <Link to={"/profile"}>
                 <div className={styles.menu}></div>
            </Link>
             <Link to={"/settings"}>
                 <div className={styles.menu}></div>
            </Link>
        </div>
        <Outlet/>
    </div>
    )
     
}

export default Layout;
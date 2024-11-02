import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaMedium,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["social-icons"]}>
        <Link to="/">
          <FaFacebook />
        </Link>
        <Link to="/">
          <FaInstagram />
        </Link>
        <Link to="/">
          <FaYoutube />
        </Link>
        <Link to="/">
          <FaLinkedin />
        </Link>
        <Link to="/">
          <FaMedium />
        </Link>
        <Link to="/">
          <FaTiktok />
        </Link>
      </div>
      <div className={styles["footer-logo"]}>
        <p>BUYCYCLE</p>
        <p>Copyright© Стефан Кирилов 2024</p>
      </div>
      <div className={styles["links-section"]}>
        <Link to="/">Общи условия</Link>
        <Link to="/">Политика за поверителност</Link>
        <Link to="/">Съвети за сигурност</Link>
        <Link to="/">Помощ и връзка с нас</Link>
      </div>
    </div>
  );
}

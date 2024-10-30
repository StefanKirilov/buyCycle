import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["links-section"]}>
        <div className={styles["column"]}>
          <p>Мобилни приложения</p>
          <p>Помощ и връзка с нас</p>
          <p>Промо обяви</p>
          <p>OLX за твоя бизнес</p>
          <p>OLX блог</p>
          <p>Общи условия</p>
          <p>Политика за поверителност</p>
          <p>Реклама</p>
          <p>OLX Доставка</p>
        </div>
        <div className={styles["column"]}>
          <p>Съвети за сигурност</p>
          <p>Карта на категориите</p>
          <p>Обяви по градове</p>
          <p>Карта на бизнес страниците</p>
          <p>Популярни търсения</p>
          <p>Кариера в OLX</p>
          <p>Как работи?</p>
          <p>Политика за бисквитки</p>
          <p>Настройки за бисквитките</p>
        </div>
        <div className={styles["app-buttons"]}>
          <img src="google-play-badge.png" alt="Google Play" />
          <img src="app-store-badge.png" alt="App Store" />
          <p>Свали приложението на OLX за твоя телефон!</p>
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <p>Copyright© Стефан Кирилов 2024</p>
        <div className={styles["country-links"]}>
          <a href="#">OLX.pl</a>
          <a href="#">OLX.ro</a>
          <a href="#">OLX.ua</a>
          <a href="#">OLX.pt</a>
        </div>
      </div>
    </div>
  );
}

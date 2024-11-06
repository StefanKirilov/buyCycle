import profileIcon from "../../assets/profile-icon.png";

import Update from "../Update/Update";

import styles from "./detail.module.css";
import heart from "../../assets/red_heart.svg";
import fillHeart from "../../assets/red_fill_heart.svg";

import { useContext, useEffect, useState } from "react";
import * as apiService from "../../services/apiService";
import * as userService from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { getImageURL } from "../../utils/image-util";
import moment from "moment";

type Cycle = {
  name: string;
  description: string;
  price: string;
  condition: string;
  place: string;
  phone: string;
  type: string;
  image: string[];
  email: string;
  date: string;
  reviews: string[];
  likes: string[];
  owner: string;
  commentList: string[];
  _id: string;
};

type User = {
  email: "";
  image: [];
  username: "";
  _id: "";
};

export default function Cycle() {
  const [cycle, setCycle] = useState<Cycle>();
  const [owner, setOwner] = useState<User>();
  const [isLike, setLike] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setFullscreen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const [update, setUpdate] = useState(false);

  const { userId, isAuthenticated }: any = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .getOneCycle(id)
      .then((data) => setCycle(data))
      .catch((error) => console.log(error));
  }, [isLike]);

  useEffect(() => {
    if (cycle) {
      userService
        .getOwner(cycle?.owner)
        .then((data) => setOwner(data))
        .catch((error) => console.log(error));
    }
  }, [cycle]);

  const goToNextSlide = () => {
    if (!cycle) return;
    setCurrentIndex((currentIndex + 1) % cycle.image.length);
  };

  const goToPrevSlide = () => {
    if (!cycle) return;
    setCurrentIndex(
      (currentIndex - 1 + cycle.image.length) % cycle.image.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const like = (id: any) => {
    apiService
      .like(id)
      .then(() => setLike(!isLike))
      .catch();
  };

  const unlike = (id: any) => {
    apiService
      .unlike(id)
      .then(() => setLike(!isLike))
      .catch();
  };

  const deleteItem = (id: any) => {
    apiService
      .del(id)
      .then(() => navigate("/"))
      .catch();
  };

  const editItem = (id: any) => {
    setUpdate(true);
  };

  const toggleFullscreen = () => {
    const carouselElement = document.querySelector(`.${styles.carousel}`);
    if (!carouselElement) return;

    if (!document.fullscreenElement) {
      carouselElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const toggleShowPhone = () => {
    setShowPhone((state) => !state);
  };

  return (
    <>
      {!update ? (
        <div className={styles.topWrapper}>
          <div className={styles.top}>
            <div className={styles.carousel}>
              <div className={styles["carousel-inner"]}>
                <img
                  src={getImageURL(cycle?.image[currentIndex]!)}
                  alt={`Slide ${currentIndex}`}
                  className={styles["carousel-image"]}
                />
              </div>

              <button
                className={`${styles["carousel-nav"]} ${
                  styles["carousel-nav-left"]
                } ${currentIndex == 0 ? styles.disable : ""}`}
                onClick={goToPrevSlide}
                disabled={currentIndex == 0}
              >
                &#10094;
              </button>
              <button
                className={`${styles["carousel-nav"]} ${
                  styles["carousel-nav-right"]
                } ${
                  currentIndex + 1 == cycle?.image.length ? styles.disable : ""
                }`}
                onClick={goToNextSlide}
                disabled={currentIndex + 1 == cycle?.image.length}
              >
                &#10095;
              </button>

              <div className={styles["carousel-dots"]}>
                {cycle?.image.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.dot} ${
                      index === currentIndex ? styles.active : ""
                    }`}
                    onClick={() => goToSlide(index)}
                  ></span>
                ))}
              </div>

              <button
                className={styles["carousel-fullscreen"]}
                onClick={toggleFullscreen}
              >
                {isFullscreen ? "⛶" : "⛶"}
              </button>
            </div>
            {cycle?.owner == userId ? (
              <div className={styles.ownerBtn}>
                <button
                  onClick={() => deleteItem(cycle?._id)}
                  className={styles.delete}
                >
                  Изтрий обявата
                </button>
                <button
                  onClick={() => editItem(cycle?._id)}
                  className={styles.edit}
                >
                  Промени обявата
                </button>
              </div>
            ) : null}
            <div className={styles["under-carousel-container"]}>
              <div className={styles.other}>
                <div className={styles.type}>
                  <p>Type:</p>
                  <p>{cycle?.type}</p>
                </div>
                <div className={styles.condition}>
                  <p>Condition:</p>
                  <p>{cycle?.condition}</p>
                </div>
              </div>
              <h2>Описание</h2>
              <p>{cycle?.description}</p>
            </div>
            <div className={styles.contact}>
              <div className={styles.user}>
                <h3>КОНТАКТ С ПРОДАВАЧА</h3>
                <div className={styles.owner}>
                  <img src={profileIcon} alt="profileIcon" />
                  <div>
                    <p>Username: {owner?.username}</p>
                    <p>Email: {owner?.email}</p>
                  </div>
                </div>
              </div>

              <div className={styles.contactButtons}>
                <button className={styles.msg}>Съобщение</button>
                <div className={styles["phone-container"]}>
                  <p className={styles.phone}>
                    {showPhone ? `0${cycle?.phone}` : "xxx-xxx-xxx"}
                  </p>
                  <button onClick={toggleShowPhone} className={styles.view}>
                    Покажи
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["right-container"]}>
            <div>
              <div className={styles["first-container-items"]}>
                <div className={styles["date"]}>
                  <span>{moment(cycle?.date).format("D MMM, YYYY")}</span>
                  <div className={styles.heart}>
                    {cycle?.likes.find((id) => id == userId) ? (
                      <img
                        onClick={() => unlike(cycle?._id)}
                        src={fillHeart}
                        alt=""
                      />
                    ) : (
                      <img
                        onClick={() => like(cycle?._id)}
                        src={heart}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <h1 className={styles.name}> {cycle?.name} </h1>
                <p className={styles.price}>{cycle?.price} лв.</p>
                <div className={styles.btnMsg}>
                  <button>Съобщение</button>
                </div>
              </div>
            </div>

            <div>
              <div className={styles["first-container-items"]}>
                <h2>Локация</h2>
                <div className={styles.location}></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Update cycle={cycle} />
      )}
    </>
  );
}

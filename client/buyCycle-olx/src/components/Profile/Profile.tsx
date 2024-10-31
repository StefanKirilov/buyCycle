import profileIcon from "../../assets/profile.png";

import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import * as userService from "../../services/userService";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import Dialog from "../Dialog/Dialog";

const formInitialState = {
  email: "",
  username: "",
};

const userInitialState = {
  email: "",
  image: [],
  username: "",
  _id: "",
};

type formInitialType = {
  email: string;
  username: string;
};

type userType = {
  email: string;
  image: string[];
  username: string;
  _id: string;
};

export default function Profile() {
  const [user, setUser] = useState<userType>(userInitialState);
  const [isEdit, setEdit] = useState(true);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const [formState, setFormState] = useState<formInitialType>(formInitialState);
  const { editProfileSubmitHandler }: any = useContext(AuthContext);

  useEffect(() => {
    userService
      .getProfile()
      .then((data) => {
        setUser(data);
        setFormState({ email: data.email, username: data.username });
      })
      .catch((error) => console.log(error));
  }, []);

  const userChangeHandler = (e: any) => {
    setFormState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const edit = () => {
    setEdit(!isEdit);
  };

  console.log(user);

  const handleDialog = (message: any, isLoading: any) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const save = (e: any) => {
    e.preventDefault();
    handleDialog("Сигурни ли сте, че искате да запазите промените?", true);
  };

  const areUSureSave = (choose: any) => {
    if (choose) {
      editProfileSubmitHandler(formState);

      userService
        .getProfile()
        .then((data) => setUser(data))
        .catch((error) => console.log(error));

      setEdit(!isEdit);

      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  return (
    <>
      {user && (
        <div className={styles.wrap}>
          <div>
            <div className={styles.profile}>
              <div className={styles.image}>
                <img src={profileIcon} alt="img8" />
              </div>
              {isEdit ? (
                <div>
                  <div className={styles.email}>
                    <p>Имейл:</p>
                    <p>{user?.email}</p>
                  </div>
                  <div className={styles.username}>
                    <p>Име:</p>
                    <p>{user?.username}</p>
                  </div>
                  <button className={styles.btnChange} onClick={edit}>
                    Промени
                  </button>
                </div>
              ) : (
                <div>
                  <form>
                    <div className={styles.email}>
                      <p>Имейл:</p>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={userChangeHandler}
                        placeholder="Напиши имейл..."
                      />
                    </div>
                    <div className={styles.username}>
                      <p>Име:</p>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={formState.username}
                        onChange={userChangeHandler}
                        placeholder="Напиши име..."
                      />
                    </div>
                    <div className={styles["wrap-btn"]}>
                      <button className={styles.btnChange} onClick={edit}>
                        Отмени
                      </button>
                      <button className={styles.btnChange} onClick={save}>
                        {" "}
                        Запази
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {dialog.isLoading && (
        <Dialog onDialog={areUSureSave} message={dialog.message} />
      )}
    </>
  );
}

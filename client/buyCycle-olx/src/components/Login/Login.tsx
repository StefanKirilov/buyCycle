
import styles from './login.module.css';
import { SyntheticEvent, useContext, useState } from 'react';
import * as userService from '../../services/userService';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

type formInitialState = {
    email: string,
    password: string,
};

type Errors = Partial<Record<keyof any, string>>

const formInitialState: formInitialState = {
    email: '',
    password: '',
};

const domains = ['bg', 'com'];
const domainStrings = domains.join("|");
const regEx = new RegExp(`[^@]{3,}@(gmail|abv)\.(${domainStrings})`);

export default function Login() {

    const [formState, setFormState] = useState(formInitialState);
    const [errors, setErrors] = useState<Errors>({});

    const navigate = useNavigate();
    const { loginSubmitHandler }: any = useContext(AuthContext)

    const userChangeHandler = (e: SyntheticEvent) => {
        setFormState(state => ({
            ...state,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        }))
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        console.log(formState);

        loginSubmitHandler(formState);
        setFormState(formInitialState);
    }

    const validator = () => {
        if (!formState.password) {
            setErrors(state => ({
                ...state,
                password: 'Password must be required!'
            }))
        }
        if (formState.password) {
            if (formState.password.length < 4 || formState.password.length > 8) {
                setErrors(state => ({
                    ...state,
                    password: 'Password must be between 4 and 8 characters!'
                }))
            }
            else {
                setErrors(state => ({
                    ...state,
                    password: ''
                }))
            }
        }
        if (!formState.email) {
            setErrors(state => ({
                ...state,
                email: 'Email must be required!'
            }))
        }
        if (formState.email) {
            if (!regEx.test(formState.email)) {
                setErrors(state => ({
                    ...state,
                    email: 'Email is not valid!'
                }))
            }
            else {
                setErrors(state => ({
                    ...state,
                    email: ''
                }))
            }
        }
    }

    return (
        <div className={styles["login-container"]}>
            <section className={styles["login-page"]} >
                <form className={styles["login-form"]} onSubmit={submitHandler}>
                    <div className={styles.container}>
                        <h1>Вход</h1>
                        <label>Имейл</label>
                        <input name='email' type="text" id="email" placeholder='Напиши имейл...' value={formState.email} onKeyUp={validator} onChange={userChangeHandler} />

                        {errors.email && (
                            <p className={styles.errorMsg}>{errors.email}</p>
                        )}

                        <label>Парола</label>
                        <input name='password' type="password" id="password" placeholder='Напиши парола...' value={formState.password} onKeyUp={validator} onChange={userChangeHandler} />

                        {errors.password && (
                            <p className={styles.errorMsg}>{errors.password}</p>
                        )}

                        <input className={styles.btn} type='submit' value="ВХОД" />

                        <p className={styles.field}>
                            <span>Ако нямаш регистрация натисни <Link to='/register'>тук</Link></span>
                        </p>
                    </div >
                </form >
            </section >
        </div >
    );
}


import styles from './register.module.css';
import { useContext, useState } from 'react';
import * as userService from '../../services/userService';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';


type formInitialState = {
    username: string,
    email: string,
    password: string,
    rePassword: string,
};

type Errors = Partial<Record<keyof any, string>>

const formInitialState: formInitialState = {
    username: '',
    email: '',
    password: '',
    rePassword: '',
};

const domains = ['bg', 'com'];
const domainStrings = domains.join("|");
const regEx = new RegExp(`[^@]{3,}@(gmail|abv)\.(${domainStrings})`);

export default function Register() {

    const [formState, setFormState] = useState(formInitialState);
    const [errors, setErrors] = useState<Errors>({});
    const { registerSubmitHandler }: any = useContext(AuthContext)

    const userChangeHandler = (e: any) => {
        setFormState(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        
        registerSubmitHandler(formState);
        setFormState(formInitialState);
    }

    const validator = () => {
        if (!formState.username) {
            setErrors(state => ({
                ...state,
                username: 'Username must be required!'
            }))
        }
        if (formState.username) {
            if (formState.username.length < 3) {
                setErrors(state => ({
                    ...state,
                    username: 'Username must be bigger than 3 characters!'
                }))
            }
            else {
                setErrors(state => ({
                    ...state,
                    username: ''
                }))
            }
        };

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
        };

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
        };

        if (!formState.rePassword) {
            setErrors(state => ({
                ...state,
                rePassword: 'Repassword must be required!'
            }))
        }
        if (formState.rePassword) {
            if (formState.password !== formState.rePassword) {
                setErrors(state => ({
                    ...state,
                    rePassword: 'Password and repassword is not the same!'
                }))
            }
            else {
                setErrors(state => ({
                    ...state,
                    rePassword: ''
                }))
            }
        };
    }

    return (
        <div className={styles["register-container"]}>
            <section className={styles["register-page"]} >
                <form className={styles["register-form"]} onSubmit={submitHandler}>
                    <div className={styles.container}>
                        <h1>Регистрация</h1>
                        <label>Име</label>
                        <input type="text" id="username" name="username" value={formState.username} onChange={userChangeHandler} onKeyUp={validator} placeholder='Напиши имейл...' />
                        {errors.username && (
                            <p className={styles.errorMsg}>{errors.username}</p>
                        )}
                        <label>Имейл</label>
                        <input type="text" id="email" name="email" value={formState.email} onChange={userChangeHandler} onKeyUp={validator} placeholder='Напиши имейл...' />
                        {errors.email && (
                            <p className={styles.errorMsg}>{errors.email}</p>
                        )}
                        <label>Парола</label>
                        <input type="password" id="password" name="password" value={formState.password} onChange={userChangeHandler} onKeyUp={validator} placeholder='Напиши парола...' />
                        {errors.password && (
                            <p className={styles.errorMsg}>{errors.password}</p>
                        )}
                        <label>Повтори парола</label>
                        <input type="password" id="rePassword" name="rePassword" value={formState.rePassword} onChange={userChangeHandler} onKeyUp={validator} placeholder='Напиши парола...' />
                        {errors.rePassword && (
                            <p className={styles.errorMsg}>{errors.rePassword}</p>
                        )}
                        <input className={styles.btn} type='submit' value="РЕГИСТРАЦИЯ" disabled={Object.values(errors).some(x => x)}/>

                        <p className={styles.field}>
                            <span>Ако имаш профил натисни <Link to='/login'>тук</Link></span>
                        </p>
                    </div >
                </form >
            </section >
        </div >
    );
}
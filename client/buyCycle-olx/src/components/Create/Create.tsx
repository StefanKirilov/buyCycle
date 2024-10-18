import { useState, MouseEvent, useEffect, SyntheticEvent, FormEvent } from 'react';
import styles from './create.module.css';
import * as apiService from '../../services/apiService';
import * as userService from '../../services/userService';
import { Link, useNavigate } from 'react-router-dom';

import camera from '../../assets/camera.svg';
import bin from '../../assets/bin.svg';

import { getImageURL } from '../../utils/image-util';
import { log } from 'console';

type formInitialState = {
    name: string,
    description: string,
    price: string,
    condition: string,
    place: string,
    phone: string,
    type: string,
    image: string[] | undefined,
    email: string,
    date: string,
    reviews: string[],
    likes: string[],
    owner: string,
    commentList: commentList[],
};

type commentList = {
    user: string,
    username: string,
    comment: string,
    date: string,
}

type userDetail = {
    email: string,
    image: string[],
    username: string,
    id: string,
}

type Errors = Partial<Record<keyof any, string>>

const formInitialState: formInitialState = {
    name: '',
    description: '',
    price: '',
    condition: '',
    place: '',
    phone: '',
    type: '',
    image: [],
    email: '',
    date: '',
    reviews: [],
    likes: [],
    owner: '',
    commentList: [],
};

const userDetail: userDetail = {
    email: '',
    image: [],
    username: '',
    id: '',
}

export default function Create() {

    const [file, setFile] = useState<File | null>(null);
    const [images, setImage] = useState<string[] | undefined>([]);
    const [userDetailsState, setUserDetailsState] = useState(userDetail);
    const [formState, setFormState] = useState(formInitialState);

    const [errors, setErrors] = useState<Errors>({});

    const [refresh, setRefresh] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        userService.getProfile()
            .then((data) => setUserDetailsState(data))
            .catch()
    }, [refresh])

    useEffect(() => {
        userService.getProfile()
            .then((data) => setImage(data.image))
            .catch()
    }, [refresh])

    useEffect(() => {
        if (file) {
            handleUpload()
        }
    }, [file])

    const handleUpload = (): void => {
        const formData: any = new FormData();
        formData.append("file", file);

        // console.log(file);

        apiService.uploadFile(formData)
            .then((data) => setImage(data.image))
            .catch();

    }

    const deleteUploadImage = (name: any): void => {
        userService.deleteFile(name)
            .then((data) => setRefresh(!refresh))
            .catch();
    }

    // 

    const userChangeHandler = (e: SyntheticEvent) => {
        setFormState(state => ({
            ...state,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        }))
    };

    const submitHandler = async (e: any) => {
        e.preventDefault();

        console.log(formState);

        await apiService.createBike(formState, images, userDetailsState.email);
        setFormState(formInitialState);
        setImage([]);
        navigate("/");
    }

    const validator = () => {
        if (!formState.name) {
            setErrors(state => ({
                ...state,
                name: 'Name must be required!'
            }))
        }
        if (formState.name) {
            if (formState.name.length < 3) {
                setErrors(state => ({
                    ...state,
                    name: 'Name must be at least 3 letters!'
                }))
            }
            else {
                setErrors(state => ({
                    ...state,
                    name: ''
                }))
            }
        }
        if (!formState.description) {
            setErrors(state => ({
                ...state,
                description: 'Description must be required!'
            }))
        }
        if (!formState.price) {
            setErrors(state => ({
                ...state,
                price: 'Price must be required!'
            }))
        }
        if (!formState.condition) {
            setErrors(state => ({
                ...state,
                condition: 'Condition must be required!'
            }))
        }
        if (!formState.place) {
            setErrors(state => ({
                ...state,
                place: 'Place must be required!'
            }))
        }
        if (!formState.phone) {
            setErrors(state => ({
                ...state,
                phone: 'Phone must be required!'
            }))
        }
        if (!formState.type) {
            setErrors(state => ({
                ...state,
                type: 'Type must be required!'
            }))
        }
        if (!formState.image) {
            setErrors(state => ({
                ...state,
                image: 'Image must be required!'
            }))
        }
    }

    return (
        <>
            <div className={styles.newcontainer}>
                <div className={styles.title}>
                    <h1>Добави обява</h1>
                </div>
                <form className={styles.form} onSubmit={submitHandler}>
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <h1>Какво колело предлагаш?</h1>
                            <label>Заглавие*</label>
                            <input type="text" id="name" name="name" placeholder='Пример: DRAG' onKeyUp={validator} onChange={userChangeHandler} />

                            {errors.name && (
                                <p className={styles.errorMsg}>{errors.name}</p>
                            )}

                        </div >
                        <div className={styles.container}>
                            <label>Категория*</label>
                            <input type="text" id="location" name="type" placeholder='Пример: Планински бегач' onKeyUp={validator} onChange={userChangeHandler} />

                            {errors.type && (
                                <p className={styles.errorMsg}>{errors.type}</p>
                            )}

                        </div >
                        <div className={styles.container}>
                            <label >Цена*</label>
                            <input type="text" id="price" name="price" placeholder='Цена...(в лева)' onKeyUp={validator} onChange={userChangeHandler} />
                            {errors.price && (
                                <p className={styles.errorMsg}>{errors.price}</p>
                            )}
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <h1>Снимки</h1>
                            <label>Първата снимка ще бъде основната в обявата ти.</label>
                            <div className={styles.imageContainer}>
                                {images && images.length < 9 &&
                                    <div className="uploadWrapper">
                                        <label htmlFor='file' className={styles.btnImage}>Добави снимка</label>
                                        <input className={styles.upload} type="file" id='file' name='file1' onChange={(e) => setFile(e.target.files![0])} />
                                    </div>
                                }
                                {images && images?.map(name => (
                                    <div key={name} className={styles.imgArea}>
                                        <div className={styles.innerImageContrainer}>
                                            <div className={styles.bin}>
                                                <img onClick={() => deleteUploadImage(name)} src={bin} alt="bin" />
                                            </div>
                                        </div>
                                        <img src={getImageURL(name)} alt="image" />
                                    </div>
                                ))}
                                {images && images.length < 8 && [...Array(8 - images.length)].map((elementInArray, index) => (
                                    <div key={index}>
                                        <div className="uploadWrapper">
                                            <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                            <input className={styles.upload} type="file" id='file' name='file2' onChange={(e) => setFile(e.target.files![0])} />
                                        </div>
                                    </div>
                                ))}
                            </div >
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <label>Описание*</label>
                            <textarea id="name" name="description" placeholder='Напиши това, което ти се иска да прочетеш, ако ти гледаше обявата' onKeyUp={validator} onChange={userChangeHandler} />
                            {errors.description && (
                                <p className={styles.errorMsg}>{errors.description}</p>
                            )}
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <label>Състояние*</label>
                            <select name="condition" onKeyUp={validator} onChange={userChangeHandler}>
                                <option value="defaut"></option>
                                <option value="used">Използвано</option>
                                <option value="new">Ново</option>
                            </select>
                            {errors.condition && (
                                <p className={styles.errorMsg}>{errors.condition}</p>
                            )}
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <label>Локация*</label>
                            <input type="text" id="name" name="place" placeholder='Населено място' onKeyUp={validator} onChange={userChangeHandler} />
                            {errors.place && (
                                <p className={styles.errorMsg}>{errors.place}</p>
                            )}
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <h1>Данни за контакт</h1>
                            <label>Лице за контакт*</label>
                            <input type="text" id="name" name="owner" onChange={userChangeHandler} />
                        </div >
                        <div className={styles.container}>
                            <label>Имейл адрес</label>
                            <input type="text" id="location" name="email" value={userDetailsState.email} readOnly={true} />
                        </div >
                        <div className={styles.container}>
                            <label >Телефонен номер*</label>
                            <input type="text" id="price" name="phone" onKeyUp={validator} onChange={userChangeHandler} />
                            {errors.phone && (
                                <p className={styles.errorMsg}>{errors.phone}</p>
                            )}
                        </div >
                    </section >
                    <button className={styles.submit}>Добави обява</button>
                </form >
            </div >
        </>
    )
}
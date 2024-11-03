import { useState, MouseEvent, useEffect, SyntheticEvent, FormEvent } from 'react';
import styles from './create.module.css';
import * as apiService from '../../services/apiService';

import { Link } from 'react-router-dom';

import camera from '../../assets/camera.svg';

export default function Create() {

    // const [file, setFile] = useState<File | null>(null);

    // useEffect(() => {
    //     if (file) {
    //         handleUpload()
    //     }
    // }, [file])

    const [url, setUrl] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null | undefined>(null);

    console.log(url);
    console.log(file);
    console.log(preview);
    

    const handleUploadForm = (e: SyntheticEvent): void => {
        e.preventDefault();
        const formData: any = new FormData();
        formData.append("file", file);
        
        apiService.uploadFile(formData)
            .then((data) => console.log(data?.url)
            
            )
            .catch();
    }

    const handleUploadImage = (): void => {

    }

    const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }

        setFile(target.files[0]);


        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);            
        }
        

        reader.readAsDataURL(target.files[0]);
    }

    return (
        <>
            <div className={styles.newcontainer}>
                <div className={styles.title}>
                    <h1>Добави обява</h1>
                </div>
                <form className={styles.form} onSubmit={handleUploadForm}>
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <h1>Какво колело предлагаш?</h1>
                            <label>Заглавие*</label>
                            <input type="text" id="name" name="name" placeholder='Пример: DRAG' />
                        </div >
                        <div className={styles.container}>
                            <label>Категория*</label>
                            <input type="text" id="location" name="location" placeholder='Пример: Планински бегач' />
                        </div >
                        <div className={styles.container}>
                            <label >Цена*</label>
                            <input type="text" id="price" name="price" placeholder='Цена...(в лева)' />
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <h1>Снимки</h1>
                            <label>Първата снимка ще бъде основната в обявата ти.</label>
                            <div className={styles.imageContainer}>
                                {(preview) ? <div className="uploadWrapper">
                                    <img className='imgArea' src={preview} alt="" />
                                </div> : null}
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnImage}>Добави снимка</label>
                                    <input className={styles.upload} type="file" id='file' name='file1' onChange={handleOnChange} />
                                </div>
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                    <input className={styles.upload} type="file" id='file' name='file2' onChange={handleOnChange} />
                                </div>
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                    <input className={styles.upload} type="file" id='file' name='file3' onChange={handleOnChange} />
                                </div>
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                    <input className={styles.upload} type="file" id='file' name='file4' onChange={handleOnChange} />
                                </div>
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                    <input className={styles.upload} type="file" id='file' name='file5' onChange={handleOnChange} />
                                </div>
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                    <input className={styles.upload} type="file" id='file' name='file6' onChange={handleOnChange} />
                                </div>
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                    <input className={styles.upload} type="file" id='file' name='file7' onChange={handleOnChange} />
                                </div>
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                    <input className={styles.upload} type="file" id='file' name='file8' onChange={handleOnChange} />
                                </div>
                                <div className="uploadWrapper">
                                    <label htmlFor='file' className={styles.btnPhoto}><img src={camera} alt="photo" /></label>
                                    <input className={styles.upload} type="file" id='file' name='file9' onChange={handleOnChange} />
                                </div>
                            </div >
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <label>Описание*</label>
                            <textarea id="name" name="name" placeholder='Напиши това, което ти се иска да прочетеш, ако ти гледаше обявата' />
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <label>Състояние*</label>
                            <select name="conditional">
                                <option value="used">Използвано</option>
                                <option value="new">Ново</option>
                            </select>
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <label>Локация*</label>
                            <input type="text" id="name" name="name" placeholder='Населено място' />
                        </div >
                    </section >
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <h1>Данни за контакт</h1>
                            <label>Лице за контакт*</label>
                            <input type="text" id="name" name="name" />
                        </div >
                        <div className={styles.container}>
                            <label>Имейл адрес</label>
                            <input type="text" id="location" name="location" />
                        </div >
                        <div className={styles.container}>
                            <label >Телефонен номер*</label>
                            <input type="text" id="price" name="price" />
                        </div >
                    </section >
                    <button className={styles.submit}>Добави обява</button>
                </form >
            </div >
        </>
    )
}
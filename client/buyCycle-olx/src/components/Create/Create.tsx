import { useState, MouseEvent, useEffect } from 'react';
import styles from './create.module.css';
import * as apiService from '../../services/apiService';

import { Link } from 'react-router-dom';

export default function Create() {

    const [file, setFile] = useState<File | null>(null);

    useEffect(()=>{
        if(file){
            handleUpload()
        }
    },[file])

    const handleUpload = (): void => {
        
        console.log(file);

        const formData: any = new FormData();
        formData.append("file", file);

        apiService.uploadFile(formData)
            .then(() => console.log('ready'))
            .catch();
    }

    return (
        <>
            <div className={styles.newcontainer}>
                <div className={styles.title}>
                    <h1>Добави обява</h1>
                </div>
                <form className={styles.form}>
                    {/* dsfsfds */}
                    <section className={styles.newpage} >
                        <div className={styles.container}>
                            <h1>Снимки</h1>
                            <label>Първата снимка ще бъде основната в обявата ти.</label>
                            <div className="uploadWrapper">
                                <label htmlFor='file' className={styles.btnImage}>Добави снимка</label>
                                <input className={styles.upload} type="file" id='file' onChange={(e) => setFile(e.target.files![0])} />
                            </div>
                        </div >
                    </section >
                    {/* dsfsd */}
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
                    {/* <section className={styles.newpage} >
                        <div className={styles.container}>
                        <h1>Снимки</h1>
                            <label>Първата снимка ще бъде основната в обявата ти.</label>
                            <input type="file" onChange={e => setFile(e.target.files![0])}/>
                            <button onClick={handleUpload} className={styles.btnImage}>Добави снимка</button>
                        </div >
                    </section > */}
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
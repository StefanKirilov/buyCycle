import styles from './catalog.module.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as apiService from '../../services/apiService';
import { getImageURL } from '../../utils/image-util';
import moment from 'moment';

type Cycle = {
    name: string,
    description: string,
    price: string,
    condition: string,
    place: string,
    phone: string,
    type: string,
    image: string[],
    email: string,
    date: string,
    reviews: string[],
    likes: string[],
    owner: string,
    commentList: string[],
    _id: string,
};


export default function Catalog() {
    const [cycles, setSCycles] = useState<Cycle[]>([]);

    useEffect(() => {
        apiService.getAllCycles()
            .then(data => setSCycles(data))
            .catch(error => console.log(error));

            return () => console.log('Unmount component!');
    }, [])
    return (
        <div className={styles.top}>
            <h1 className={styles['category-name']}>Всички обяви</h1>
            <div className={styles['container-top']}>
                {cycles?.map(data => (
                    <div key={data._id} className={styles['container-second']}>
                        <Link to={`/${data._id}`}>
                        <div className={styles["container-img"]}>
                            {/* <img className={styles.image} src={data?.image[0]} /> */}
                            <img className={styles.image} src={getImageURL(data?.image[0])} />
                        </div>
                        <div className={styles["container-items"]}>
                            <p className={styles.name}>{data.name}</p>
                            <p className={styles.price}>{data.price} лв.</p>
                            <p className={styles.place}>{data.place}</p>
                            <p className={styles.data}>{moment(data.date).format('D MMM, YYYY')}</p>
                        </div>
                        </Link>
                    </div>
                ))}
            </div >
        </div >
    );
}
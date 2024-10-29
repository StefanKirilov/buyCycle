import styles from './catalog.module.css';

import heart from '../../assets/red_heart.svg'
import fillHeart from '../../assets/red_fill_heart.svg'

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as apiService from '../../services/apiService';
import { getImageURL } from '../../utils/image-util';
import moment from 'moment';
import AuthContext from '../../contexts/authContext';

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
    const { userId, isAuthenticated }: any = useContext(AuthContext);

    const [cycles, setSCycles] = useState<Cycle[]>([]);
    const [isLiked, setLike] = useState(false);

    useEffect(() => {
        apiService.getAllCycles()
            .then(data => setSCycles(data))
            .catch(error => console.log(error));

        return () => console.log('Unmount component!');
    }, [isLiked])


    const like = (id: any) => {

        apiService.like(id)
            .then(() => setLike(!isLiked))
            .catch();
    }

    const unlike = (id: any) => {
        
        apiService.unlike(id)
            .then(() => setLike(!isLiked))
            .catch();
    }

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
                        </Link>
                        <div className={styles["container-items"]}>
                            <div>
                                <p className={styles.name}>{data.name}</p>
                                {
                                    (data.likes.find(id => id == userId)) ?
                                        <img onClick={() => unlike(data._id)} className={styles.bin} src={fillHeart} alt="" />
                                        :
                                        <img onClick={() => like(data._id)} className={styles.bin} src={heart} alt="" />
                                }
                            </div>
                            <p className={styles.price}>{data.price} лв.</p>
                            <p className={styles.place}>{data.place}</p>
                            <p className={styles.data}>{moment(data.date).format('D MMM, YYYY')}</p>
                        </div>
                    </div>
                ))}
            </div >
        </div >
    );
}
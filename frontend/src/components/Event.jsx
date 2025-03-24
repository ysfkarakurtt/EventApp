import React, { useState, useEffect } from 'react';
import '../css/Event.css';
import { TbCategoryFilled } from "react-icons/tb";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import axios from 'axios';
import moment from 'moment';
import { setRemove, setUpdatedRemove } from '../redux/eventSlice';


function Event({ event, flag }) {

    const dispatch = useDispatch();
    const { id, name, date, description, category, img, time } = event;
    const [dateFormated, setDateFormated] = useState('');
    const [flag2, setFlag2] = useState('');
    const { is_join, is_remove, dates, times } = useSelector(store => store.event);
    const { login_id } = useSelector(store => store.login);
    const navigate = useNavigate();

    useEffect(() => {

        const dateObj = new Date(date);
        const formattedDate = dateObj.toISOString().split('T')[0];
        setDateFormated(formattedDate);

        for (let i = 0; i < 3; i++) {

            if (dates[i] == date && times[i] == time) {
                setFlag2(true);
            }
        }

    }, [date, time, dates]);

    const eventDelete = async () => {
        try {
            await axios.post('http://localhost:8081/delete', { id });
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    };

    const eventRemove = async (removeId) => {
        try {
            await axios.post('http://localhost:8081/delete_participant', { id: removeId });
            const updatedRemoveArray = is_remove.filter(item => item !== removeId);
            dispatch(setUpdatedRemove(updatedRemoveArray));
            alert("Başarıyla Etkinlikten Ayrıldınız...")

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (login_id.payload <= 0) {
                alert("Etkinliğe katılmadan önce lütfen giriş yapınız.")
                return;
            }
            if (flag2) {
                alert("Belirtilen tarih ve saatte daha önceden katılmış olduğunuz etkinliğiniz bulunuyor. Lütfen tekrar deneyin. ")
                return;
            } else {
                await axios.post('http://localhost:8081/save_participant', { eventID: id, userID: login_id.payload });
                dispatch(setRemove(id));

                const currentDate = moment().format();
                const date = new Date(currentDate);
                const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
                const point = 10;

                await axios.post('http://localhost:8081/save_point', { userID: login_id.payload, point, date: formattedDate });

                alert("Etkinlik başarıyla katıldınız. Tebrikler! 10 puan kazandınız.");

                navigate("/profile")
            }
        } catch (err) {
            console.log(err);
            alert("Etkinliğe katılırken bir hata oluştu.");
        }

    };

    return (
        <div className='container-event'>
            <form onSubmit={handleSubmit}>
                <div className='header'>
                    <span className='icon-detail-edit'>
                        {
                            flag && (
                                <>
                                    <a onClick={() => navigate("/event-edit/" + id)} className='icon-click' id='icon-edit' style={{ cursor: 'pointer' }}>
                                        <FaEdit />
                                    </a>
                                    <a onClick={eventDelete} className='icon-click'>
                                        <MdRemoveCircle />
                                    </a>

                                </>
                            )
                        }

                    </span>
                    <div className='text'>{name}</div>
                    <div className="underline">
                        {
                            Array.isArray(is_remove) ? ((() => {
                                const elements = is_remove.map((removeId, i) => {
                                     if (removeId === id) {
                                        return (<a key={i} onClick={() => eventRemove(removeId)} className='icon-container'>
                                            <div className='icon-align-right'>
                                                <span className='out-text'>Çık</span>
                                                <MdRemoveCircle className='out' />
                                            </div>
                                        </a>
                                        );
                                    } return null;
                                }).filter(element => element !== null); return elements.length > 0 ? elements : null;
                            })()) : (console.error('is_remove not a array'))
                        }

                        <div className="img">
                            <img src={`http://localhost:8081/upload/${img}`} alt="resim yüklenemedi" />
                        </div>
                    </div>
                    <div className="body-detail">
                        <div className="list-group list-group-flush" id='detail'>
                            <div className="item">
                                <div className="icon-detail">
                                    <TbCategoryFilled />
                                </div>
                                <span className='detail-item'>Kategori:</span>
                                <span className='text-detail'>{category}</span>
                            </div>
                            <div className="item">
                                <div className="icon-detail">
                                    <MdOutlineDescription />
                                </div>
                                <span className='detail-item'>Açıklama:</span>
                                <span className='text-detail'>{description}</span>
                            </div>
                            <div className="item">
                                <div className="icon-detail">
                                    <MdOutlineDateRange />
                                </div>
                                <span className='detail-item'>Tarih:</span>
                                <span className='text-detail'>{dateFormated}</span>
                            </div>
                            <div className="item">
                                <div className="icon-detail"><MdAccessTime /></div>
                                <span className="detail-item">Saat:</span>
                                <span className='text-detail'>{time}</span>
                            </div>
                        </div>
                    </div>
                    <div className="submit-container">
                        <button type='submit' className='submit' onClick={() => navigate("/event-details/" + id)}>
                            {is_join === 1 ? "Etkinliğe Katıl" : "Etkinlik Detayı"}
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
}

export default Event;

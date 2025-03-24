import React, { useEffect, useState } from 'react';
import { TbCategoryFilled } from "react-icons/tb";
import { MdOutlineDescription, MdOutlineDateRange } from "react-icons/md";
import axios from 'axios';
import '../css/AddEvent.css';
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Event from './Event';
import { setMyEvents } from '../redux/loginSlice';
import moment from 'moment';

function AddEvent() {

    const { login_id } = useSelector(store => store.login);
    const { my_events } = useSelector(store => store.login);
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState([]);
    const [myEventID, setMyEventID] = useState('');
    const [img, setImg] = useState('');

    let imgPath = ' ';

    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [value, setValue] = useState('');

    const categories = [
        { label: "Kategori Seç", value: '' },
        { label: "Müzik", value: 'Müzik' },
        { label: "Spor", value: 'Spor' },
        { label: "Seyahat", value: 'Seyahat' },
        { label: "Tiyatro", value: 'Tiyatro' },
        { label: "Sinema", value: 'Sinema' }
    ];

    const navigate = useNavigate();

    const handleSelect = (event) => {
        setValue(event.target.value);
        setCategory(event.target.value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        setImg(file.name);

        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            const uploadRes = await axios.post('http://localhost:8081/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const uploadedImagePath = uploadRes.data.imageUrl;
            imgPath = uploadedImagePath;
            setImg(img);

        }

        await axios.post('http://localhost:8081/add', { eventName, imgPath, category, description, date, time, location, login_id: login_id.payload })
            .then(res => {
                const currentDate = moment().format();
                const point = 15;

                axios.post('http://localhost:8081/save_point', { userID: login_id.payload, point, date: currentDate })
                    .then(res => { })
                    .catch(err => console.log(err));

                alert("Etkinlik başarıyla oluşturuldu. ");
                navigate("/events");
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {

        axios.post('http://localhost:8081/my_event', {
            login_id: login_id.payload
        })
            .then(res => {
                setEvents(res.data.user);
                dispatch(setMyEvents(true));

            })
            .catch(err => console.log(err));

        if (events && events.length > 0)
            my_events.payload = true;
    }, []);


    return (
        <div className='card'>
            <div className="add-event">
                <div className='text-event'>Etkinlik Oluştur</div>
                <form className='' onSubmit={handleSubmit}>
                    <div className='header'>
                        <div className='underline-event'></div>
                        <div className='underline-event'></div>
                        <div className="name">
                            <div className=''>
                                <input type="text" className='input-add-event' placeholder='Etkinlik Adı' value={eventName}
                                    onChange={e => setEventName(e.target.value)} required />
                            </div>
                        </div>
                        <div className="image-upload">
                            {
                                imagePreview ? (
                                    <img src={imagePreview} alt="Seçilen görsel" className="image-preview-event" />
                                ) : (
                                    <div className="img-placeholder">Görsel seçilmedi</div>
                                )
                            }
                            <label className="upload-btn" htmlFor="file-upload">Görsel Seç</label>
                            <input id="file-upload" type="file" onChange={handleImageUpload} />
                        </div>

                        <div className="body-detail-add">
                            <div className="item" id='detail'>
                                <div className="">
                                    <div className="icon-detail"><TbCategoryFilled /></div>
                                    <span className='detail-item'>Kategori:</span>
                                    <select
                                        className='input-add-event'
                                        name="category"
                                        onChange={handleSelect}>
                                        {
                                            categories.map(category => (
                                                <option key={category.value} value={category.value}>{category.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="item">
                                    <div className="icon-detail"><MdOutlineDescription /></div>
                                    <span className='detail-item'>Açıklama:</span>
                                    <input type="text" id='description' className='input-add-event' value={description}
                                        onChange={e => setDescription(e.target.value)} required />
                                </div>
                                <div className="item">
                                    <div className="icon-detail"><MdOutlineDateRange /></div>
                                    <span className='detail-item'>Tarih:</span>
                                    <input type="date" id='date' className='input-add-event' value={date}
                                        onChange={e => setDate(e.target.value)} required />
                                </div>
                                <div className="item">
                                    <div className="icon-detail"><MdAccessTime /></div>
                                    <span className="detail-item">Saat:</span>
                                    <input
                                        type="time"
                                        id="time"
                                        className="input-add-event"
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="item">
                                    <div className="icon-detail"><FaLocationDot /></div>
                                    <span className='detail-item'>Konum:</span>
                                    <input type="text" id='location' className='input-add-event' value={location}
                                        onChange={e => setLocation(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                        <div className='' style={{
                            textAlign: 'center',
                            marginTop: '10px', marginBottom: '10px'
                        }}>
                            <iframe width="500" height="300"
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>
                        </div>
                        <div className="submit-container">
                            <button type='submit' className='submit'>Etkinliği Oluştur</button>
                        </div>
                    </div>
                </form>
            </div >

            <div className='text-event'>Oluşturduğum Etkinlikler</div>
            <div className="my-event">

                {
                    events && events.length > 0 ?

                        (

                            events.map((event) => (

                                <Event key={event.id} event={event} flag={true} />
                            ))
                        ) : (
                            <p >Etkinlik bulunamadı.</p>
                        )
                }

            </div>
        </div >
    );
}

export default AddEvent;

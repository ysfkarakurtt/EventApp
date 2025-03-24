import React, { useEffect, useState } from 'react';
import { TbCategoryFilled } from "react-icons/tb";
import { MdOutlineDescription, MdOutlineDateRange } from "react-icons/md";
import axios from 'axios';
import '../css/EditEvent.css';
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Event from './Event';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditEvent() {

    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [eventName, setEventName] = useState('');
    const [events, setEvents] = useState([]);
    const [myEventID, setMyEventID] = useState('');
    const [img, setImg] = useState('test');

    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('20.00');
    const [location, setLocation] = useState('');
    const [value, setValue] = useState('');

    const categories = [
        { label: "Kategori Seç", value: '' },
        { label: "Müzik", value: 'Müzik' },
        { label: "Spor", value: 'Spor' }
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
            const img = uploadRes.data.imageUrl;
        }

        await axios.post('http://localhost:8081/edit', { eventName, img, category, description, date, time, location, id })
            .then(res => {
                alert("Etkinlik başarıyla düzenlendi. ");
                navigate("/add");
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {

        axios.post('http://localhost:8081/event_detail', { id })
            .then(res => {

                setEventName(res.data.user[0].name);
                setImg(res.data.user[0].img);
                setImagePreview(res.data.user[0].img);
                setCategory(res.data.user[0].category);
                setDescription(res.data.user[0].description);
                setDate(res.data.user[0].date);
                setTime(res.data.user[0].time);
                setLocation(res.data.user[0].location);
            })
            .catch(err => console.log(err));


    }, []);


    return (
        <div>
            <div className="edit-event">
                <form className='container-edit-event' onSubmit={handleSubmit}>
                    <div className='header'>
                        <div className="name">
                            <div className=''>
                                <input type="text" className='input-add-event' placeholder='Etkinlik Adı' value={eventName}
                                    onChange={e => setEventName(e.target.value)} required />
                            </div>
                        </div>
                        <div className="image-upload">
                            {imagePreview ? (
                                <img src={`http://localhost:8081/upload/${img}`} alt="Seçilen görsel" className="image-preview-event" />
                            ) : (
                                <div className="img-placeholder">Görsel seçilmedi</div>
                            )}
                            <label className="upload-btn" htmlFor="file-upload">Görsel Seç</label>
                            <input id="file-upload" type="file" onChange={handleImageUpload} />
                        </div>
                        <div className="body-detail-add">
                            <div className="list-group" id='detail'>
                                <div className="list-group-item">
                                    <div className="icon-detail"><TbCategoryFilled /></div>
                                    <span className='detail-item'>Kategori:</span>
                                    <select
                                        className='input-add-event'
                                        name="category"
                                        onChange={handleSelect}
                                        value={
                                            category
                                        }>
                                        {
                                            categories.map(category => (
                                                <option key={category.value} value={category.value}>{category.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="list-group-item">
                                    <div className="icon-detail"><MdOutlineDescription /></div>
                                    <span className='detail-item'>Açıklama:</span>
                                    <input type="text" id='description'
                                        className='input-add-event' value={description}
                                        onChange={e => setDescription(e.target.value)} required />
                                </div>
                                <div className="input">
                                    <div className="icon">
                                        <i className="fa-solid fa-calendar-days fa-sm"></i>
                                    </div>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Etkinlik Tarihi"

                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={200}
                                        isClearable
                                        className="date-picker-input"
                                    />
                                </div>

                                <div className="list-group-item">
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
                                <div className="list-group-item">
                                    <div className="icon-detail"><FaLocationDot /></div>
                                    <span className='detail-item'>Konum:</span>
                                    <input type="text" id='location' className='input-add-event' value={location}
                                        onChange={e => setLocation(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                        <div className="submit-container">
                            <button type='submit' className='submit'>Etkinliği Oluştur</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEvent
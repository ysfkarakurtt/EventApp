import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Profile.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Event from './Event';

function Profile() {

    const { login_id } = useSelector(store => store.login);
    const { is_remove } = useSelector(store => store.event);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name_surname, setName_surname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [img, setImg] = useState('test');
    const [totalPoints, setTotalPoints] = useState('');
    const [location, setLocation] = useState('');
    const [birth, setBirth] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [flag, setFlag] = useState(false);
    const [events, setEvents] = useState([]);
    let imgPath = "";

    const genders = [
        { label: "Cinsiyet", value: '' },
        { label: "Erkek", value: 'Erkek' },
        { label: "Kadın", value: 'Kadın' }
    ];

    const categoriesList = ['Spor', 'Müzik', 'Seyahat', 'Tiyatro', 'Sinema'];
    const [selectedCategories, setSelectedCategories] = useState([])

    const handleSelect = (event) => {
        setGender(event.target.value);
    };

    const handleChange = (event) => {
        const value = event.target.name;
        setSelectedCategories(prev => {
            if (!Array.isArray(prev)) {
                prev = [];
            }
            return prev.includes(value) ? prev.filter(cat => cat !== value) : [...prev, value];
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
        }

        const selectedCategoriesString = Array.isArray(selectedCategories) ? selectedCategories.join(',') : null
        const date = new Date(birth);
        const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

        await axios.post('http://localhost:8081/update_profile', { username, password, email, name_surname, birth: formattedDate, gender, imgPath, location, selectedCategoriesString, login_id: login_id.payload, })
            .then(res => {
                alert("Başarıyla güncellendi")
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.post('http://localhost:8081/user', { login_id: login_id.payload })
            .then(res => {

                setUsername(res.data.user.username);
                setPassword(res.data.user.password);
                setName_surname(res.data.user.name_surname);
                setGender(res.data.user.gender);
                setBirth(res.data.user.birth);
                setEmail(res.data.user.email);
                setLocation(res.data.user.location)
                setImg(res.data.user.img)
                imgPath = res.data.user.img;
                setSelectedCategories(res.data.user.interest);
            })
            .catch(err => console.log(err));

        axios.post('http://localhost:8081/points', {
            userID: login_id.payload
        })
            .then(res => {
                setTotalPoints(res.data.total_points);
            })
            .catch(err => console.log(err));

        axios.post('http://localhost:8081/join_event', {
            userID: login_id.payload
        })
            .then(res => {
                setEvents(res.data.events);
            })
            .catch(err => console.log(err));

    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        setImg(file.name);
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className='header'>
            <form onSubmit={handleSubmit}>
                <div className='text-profile'>Profilim</div>
                <div className="underline"></div>
                <div className="inputs">
                    <div className="image-upload">

                        {
                            imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Seçilen görsel"
                                    className="image-preview"
                                />
                            ) : img ? (
                                <img
                                    src={`http://localhost:8081/upload/${img}`}
                                    alt="Resim yüklenemedi" className='image-preview'
                                />
                            ) : (
                                <div className="img-placeholder">Görsel seçilmedi</div>
                            )
                        }

                        <label className="upload-btn" htmlFor="file-upload">Görsel Seç</label>
                        <input id="file-upload" type="file" onChange={handleImageUpload} />
                    </div>
                    <div className="input">
                        <div className="icon">
                            <i className="fa-regular fa-id-card fa-sm"></i>
                        </div>
                        <input type="text"
                            placeholder="Ad Soyad"
                            value={name_surname}
                            onChange={(e) => setName_surname(e.target.value)}
                        />
                    </div>
                    <hr className='line' />
                    <div className="input">
                        <div className="icon" id='icon-gender'>
                            <i className="fa-solid fa-venus-mars fa-sm"></i>
                        </div>
                        <select
                            className='input-gender'
                            name="gender"

                            onChange={handleSelect}
                            value={gender}
                        >
                            {genders.map(gender => (
                                <option key={gender.value} value={gender.value}>{
                                    gender.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <hr className='line' />
                    <div className="input">
                        <div className="icon">
                            <i className="fa-solid fa-calendar-days fa-sm"></i>
                        </div>
                        <DatePicker
                            selected={birth}
                            onChange={(date) => setBirth(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Doğum Tarihi"
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            isClearable
                            className="date-picker-input"
                        />
                    </div>
                    <hr className='line' />
                    <div className="input">
                        <div className='icon'>
                            <i className="fa-solid fa-envelope fa-sm"></i>
                        </div>
                        <input type="text" placeholder='E-Posta' value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <hr className='line' />
                    <div className='input'>
                        <div className="icon">
                            <i className="fa-solid fa-location-dot fa-sm"></i>
                        </div>
                        <input type="text" placeholder='Konum giriniz' value={location}
                            onChange={e => setLocation(e.target.value)} />
                    </div>
                    <hr className='line' />
                    <h5>İlgi Alanlarınızı Seçin</h5> {categoriesList.map((category, index) => (<div key={index}> <label> <input type="checkbox" name={category} checked={selectedCategories ? selectedCategories.includes(category) : false} onChange={handleChange} /> {category} </label> </div>))}
                    <hr className='line' />
                    <div className="input">
                        <div className='icon'>
                            <i className="fa-solid fa-user fa-sm"></i>
                        </div>
                        <input type="text" placeholder='Kullanıcı Adı' value={username}
                            onChange={e => setUsername(e.target.value)} />
                    </div>
                    <hr className='line' />
                    <div className="input">
                        <div className="icon">
                            <i className="fa-solid fa-lock fa-sm"></i>
                        </div>
                        <input type="password" placeholder='Şifre' value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <hr className='line' />
                </div>
                <div className="submit-container">
                    <button type='submit' className='submit' >
                        Kaydet
                    </button>
                </div>
            </form>
            <div className='text-profile'>Puanım</div>
            <h2> {totalPoints}</h2>
            <div className="underline"></div>
            <div className='text-event'>Katıldığım Etkinlikler</div>

            {
                <div className="my-event">

                    {
                        events && events.length > 0 ?

                            (
                                events.map((event) => (
                                    <Event key={event.id} event={event} flag={false} />
                                ))
                            ) : (
                                <p >Etkinlik bulunamadı.</p>
                            )
                    }

                </div>
            }

        </div>

    )
}

export default Profile
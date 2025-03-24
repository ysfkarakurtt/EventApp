import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { setLoginID } from '../redux/loginSlice';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name_surname, setName_surname] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState(null);
    const [action, setAction] = useState('Giriş Yap');
    const [value, setValue] = useState('');

    const genders = [
        { label: "Cinsiyet", value: '' },
        { label: "Erkek", value: 'Erkek' },
        { label: "Kadın", value: 'Kadın' }
    ];

    const handleSelect = (event) => {
        setValue(event.target.value);
        setGender(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (action === "Giriş Yap") {
            if (!username || !password) {
                alert("Lütfen tüm alanları doldurun.");
            } else {
                await axios.post('http://localhost:8081/login', { username, password })
                    .then(res => {
                        const userID = res.data.id;

                        if (res.data == "login failed") {
                            alert("Kullanıcı adı veya şifre hatalı");
                            setUsername('');
                            setPassword('');
                        }
                        else {
                            dispatch(setLoginID(userID));
                            alert("Başarıyla giriş yaptınız");
                            navigate('/profile');
                        }

                    })
                    .catch(err => console.log(err));
            }
        } else {

            if (!name_surname || !gender || !birth || !username || !password) {
                alert("Lütfen tüm alanları doldurun.");
            } else {
                const date = new Date(birth);
                const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
                setBirth(formattedDate);

                await axios.post('http://localhost:8081/register', {
                    name_surname,
                    gender,
                    birth,
                    username,
                    password
                })
                    .then(res => {
                        const userID = res.data.userID;
                        const currentDate = moment().format();
                        const date = new Date(currentDate);
                        const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
                        const point = 20;

                        axios.post('http://localhost:8081/save_point', { userID, point, date: formattedDate })
                            .then(res => { })
                            .catch(err => console.log(err));
                        alert("Kayıt başarılı!");
                    })
                    .catch(err => console.log(err));
            }
        }
    };

    return (
        <div className='container' style={action === "Giriş Yap" ? {} : { paddingBottom: "600px" }}>
            <div className='header'>
                <form onSubmit={handleSubmit}>
                    <div className='text'>{action}</div>
                    <div className="underline"></div>
                    <div className="inputs">

                        {
                            action === "Giriş Yap" ? null : (
                                <>
                                    <div className="input">
                                        <div className="icon">
                                            <i className="fa-regular fa-id-card fa-sm"></i>
                                        </div>
                                        <input type="text" placeholder='Ad Soyad' value={name_surname}
                                            onChange={e => setName_surname(e.target.value)} />
                                    </div>
                                    <div className="input">
                                        <div className="icon" id='icon-gender'>
                                            <i className="fa-solid fa-venus-mars fa-sm"></i>
                                        </div>
                                        <select
                                            className='input-gender'
                                            name="gender"
                                            onChange={handleSelect}>
                                            {genders.map(gender => (
                                                <option key={gender.value} value={gender.value}>{gender.label}</option>
                                            ))}
                                        </select>
                                    </div>
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
                                </>
                            )
                        }

                        <div className="input">
                            <div className='icon'>
                                <i className="fa-solid fa-user fa-sm"></i>
                            </div>
                            <input type="text" placeholder='Kullanıcı Adı' value={username}
                                onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="input">
                            <div className="icon">
                                <i className="fa-solid fa-lock fa-sm"></i>
                            </div>
                            <input type="password" placeholder='Şifre' value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>

                    {
                        action === "Kayıt Ol" ? null : (
                            <div className="forgot-password">
                                {/* Şifreni Mi Unuttun? <span>Buraya Tıkla!</span> */}
                            </div>
                        )
                    }

                    <div className="submit-container">
                        <button type={action === "Giriş Yap" ? "button" : "submit"} className={action === "Giriş Yap" ? "submit gray" : "submit"} onClick={() => setAction("Kayıt Ol")} >
                            Kayıt Ol
                        </button>
                        <button type={action === "Kayıt Ol" ? "button" : "submit"} className={action === "Kayıt Ol" ? "submit gray" : "submit"} onClick={() => setAction("Giriş Yap")}>
                            Giriş Yap
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

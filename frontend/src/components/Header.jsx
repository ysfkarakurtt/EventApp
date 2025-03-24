import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { RiLoginBoxFill } from "react-icons/ri";
import { SiReaddotcv } from "react-icons/si";
import { useSelector, useDispatch } from 'react-redux';
import { setLoginID } from '../redux/loginSlice';
import { resetRemove } from '../redux/eventSlice';

function Header() {

    const dispatch = useDispatch();
    const { login_id } = useSelector((store) => store.login);

    const logout = () => {
        dispatch(setLoginID(0));
        dispatch(resetRemove());
        alert("Başarıyla Çıkış Yaptınız...");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg  fixed-top" >
                <a className="navbar-brand" href="/">
                    <img src="" alt="" />
                    <h3 id="header-title">Akıllı Etkinlik Planlama</h3>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="header collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto ">
                        <li className="nav-item active">
                            <div className="icon-navbar"> <FaHome className='icon' id='icon-home' />
                                <a className="nav-link" href="/">Anasayfa</a>
                            </div>
                        </li>
                        
                        {
                            login_id.payload > 0 ? (
                                <>
                                    <li className="nav-item">
                                        <div className="icon-navbar"><IoChatbox className='icon' id='icon-chat' />
                                            <Link className="nav-link" to="/chat">Mesajlarım</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="icon-navbar"><SiReaddotcv className='icon' id='icon-add-event' />
                                            <Link className="nav-link" to="/add">Etkinlik Ekle</Link>
                                        </div>
                                    </li><li className="nav-item">
                                        <div className='icon-navbar'><CgProfile className='icon' />
                                            <Link className="nav-link" to="/profile">Profilim</Link>
                                        </div>
                                    </li>

                                    <button className='button-logout'>
                                        <div className="icon-navbar" id='logout-navbar'>
                                            <RiLoginBoxFill className='icon' id='icon-logut' />
                                            <Link className="nav-link" to="/" onClick={logout}>Çıkış Yap</Link>
                                        </div>

                                    </button>
                                </>) : <li className="nav-item" id='li-login'>
                                <button className='button-login'>
                                    <div className="icon-navbar" id='login-navbar'>
                                        <RiLoginBoxFill className='icon' id='icon-login' />
                                        <Link className="nav-link" to="/login">Giriş Yap / Kayıt Ol</Link>
                                    </div>

                                </button>
                            </li>

                            }

                    </ul>
                </div>
            </nav>
        </div >
    );
}

export default Header;

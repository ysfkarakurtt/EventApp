import React, { useState, useEffect } from 'react';
import Event from './Event';
import axios from 'axios';
import '../css/EventList.css';
import { useSelector } from 'react-redux';

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [option, setOption] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [historyCategory, setHistoryCategory] = useState('');
    const { login_id } = useSelector((store) => store.login);

    const options = [
        { label: "Filtrele", value: '' },
        { label: "Hepsi", value: 'Hepsi' },
        { label: "Öneriler", value: 'Öneriler' }
    ];

    const handleSelect = (event) => {
        setOption(event.target.value);

    };

    const handleSubmit = async (e) => {

        if (option == 'Öneriler') {

            axios.get('http://localhost:8081/interest_events', { category, location, historyCategory })
                .then(res => {
                    setEvents(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setError('Etkinlikler alınırken bir hata oluştu.');
                    setLoading(false);
                });

        } else {
            axios.get('http://localhost:8081/events')
                .then(res => {
                    setEvents(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setError('Etkinlikler alınırken bir hata oluştu.');
                    setLoading(false);
                });
        }
    }

    useEffect(() => {

        axios.get('http://localhost:8081/events')
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('Etkinlikler alınırken bir hata oluştu.');
                setLoading(false);
            });

        axios.post('http://localhost:8081/user', { login_id: login_id.payload })
            .then(res => {
                setCategory(res.data.user.interest);
                setLocation(res.data.user.location);
            })
            .catch(err => console.log(err));

        axios.post('http://localhost:8081/join_event', {
            userID: login_id.payload
        })
            .then(res => {
                setHistoryCategory(res.data.events[0].category);
            })
            .catch(err => console.log(err));
    }, []);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className='tab-title'>
                <div className="title">
                    <h1>Etkinlikler</h1>
                    <div className="underline-title"></div>
                </div>
                {login_id.payload ? <div className='option'>
                    <select
                        className='input-option'
                        name="option"

                        onChange={handleSelect}
                        value={option}
                    >
                        {
                            options.map(option => (
                                <option key={option.value} value={option.value}>{
                                    option.label}
                                </option>
                            ))
                        }

                    </select>
                    <div className="submit-container">
                        <form action="" onSubmit={handleSubmit}>
                            <button type='submit' className='submit'>Ara</button>
                        </form>
                    </div>
                </div> : false}
            </div>
            <div className="event-list-container">
                {events && events.length > 0 ? (
                    events.map((event) => (
                        <Event key={event.id} event={event} />
                    ))
                ) : (
                    <p className='text-center'>Etkinlik bulunamadı.</p>
                )}
            </div>
        </div>
    );
}

export default EventList;

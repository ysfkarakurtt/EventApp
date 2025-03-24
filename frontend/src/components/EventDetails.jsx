import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from './Event';
import { useSelector, useDispatch } from 'react-redux';
import { setDate, setJoin, setTime } from '../redux/eventSlice';

function EventDetails() {

    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { login_id } = useSelector(store => store.login)
    const dispatch = useDispatch();

    useEffect(() => {
        axios.post('http://localhost:8081/join_event', {
            userID: login_id.payload
        })
            .then(res => {
                for (let i = 0; i < 3; i++) {
                    dispatch(setDate(res.data.events[i].date))
                    dispatch(setTime(res.data.events[i].time))
                }

                setEvents(res.data.events);

            })
            .catch(err => console.log(err));


        axios.get('http://localhost:8081/events')
            .then(res => {
                const foundEvent = res.data.find(ev => ev.id == id);
                setEvent(foundEvent);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('Etkinlik alınırken bir hata oluştu.');
                setLoading(false);
            });

        dispatch(setJoin(1));

    }, [id]);

    if (loading) {
        return <div className='text-center'>Yükleniyor...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!event) {
        return <div className='text-center'>Etkinlik bulunamadı.</div>;
    }

    return (
        <div>
            <Event key={event.id} event={event} />
            <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '200px' }}>
                <iframe width="500" height="300"
                    frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${event.location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>
            </div>
        </div>
    );
}

export default EventDetails;

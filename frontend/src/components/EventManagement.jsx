import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventManagement() {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:8081/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error("Etkinlikleri yüklerken bir hata oluştu:", error);
            });
    }, []);

    const eventDelete = async (deleteId) => {
        try {
            await axios.post('http://localhost:8081/delete', { id: deleteId });
            alert("Başarıyla etkinliği sildiniz")
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="event-management">
            <h2>Etkinlik Yönetimi</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <span>Etkinlik Adı:</span>
                        <span>{event.name}</span>
                        <span>Kategori:</span>
                        <span>{event.category}</span>
                        <button className='delete-btn'
                            onClick={() => eventDelete(event.id)}>Sil</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventManagement;

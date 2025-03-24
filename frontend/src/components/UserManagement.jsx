import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserManagement() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Etkinlikleri yüklerken bir hata oluştu:", error);
            });
    }, []);

    const deleteUser = async (deleteId) => {
        try {
            await axios.post('http://localhost:8081/delete_user', { id: deleteId });
            alert("Başarıyla kullanıcıyı sildiniz")
            navigate(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="user-management">
            <h2>Kullanıcı Yönetimi</h2>
            <ul>
                {Array.isArray(users) && users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        <button className='delete-btn' onClick={() => deleteUser(user.id)}>Sil</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;

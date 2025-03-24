import React from 'react';
import EventManagement from './EventManagement';
import UserManagement from './UserManagement';
import '../css/Admin.css';

function Admin() {
    return (
        <div className="admin-dashboard">
            <h1 className='text-center'>Admin Paneli</h1>
            <div className="admin-sections">
                <EventManagement />
                <UserManagement />

            </div>
        </div>
    );
}

export default Admin;

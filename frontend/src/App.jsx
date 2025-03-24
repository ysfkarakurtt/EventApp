import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Login from './components/Login'
import './index.css'
import EventList from './components/EventList';
import AddEvent from './components/AddEvent';
import NotFoundPage from './components/NotFoundPage';
import EventDetails from './components/EventDetails';
import Profile from './components/Profile';
import Chat from './components/Chat';
import EditEvent from './components/EditEvent';
import Admin from './components/Admin';
import Homepage from './components/Homepage';

function App() {

  return (

    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path='/events' element={<EventList />} />
        <Route path='/add' element={<AddEvent />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/event-details/:id' element={<EventDetails />}></Route>
        <Route path='/event-edit/:id' element={<EditEvent />}></Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>

  )
}

export default App

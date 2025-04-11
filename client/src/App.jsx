import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/home';
import About from './routes/About/about';
import Header from './components/Header';
import Footer from './components/Footer';
import Event from './routes/Event/events';
import SingleEvent from './routes/Event/singleEvent';
import CreateEvent from './routes/Event/createEvent';
import Register from './routes/Auth/register';
import Login from './routes/Auth/login';
import AdminPage from './routes/Auth/adminpage';
import UserPage from './routes/Auth/userpage';
import axios from 'axios';


axios.defaults.baseURL='http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Event />} />
        <Route path="/events/:id" element={<SingleEvent />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

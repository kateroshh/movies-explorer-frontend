import './App.css';
import { Route, Routes } from 'react-router-dom';

import Layout from '../Layout/Layout';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className='page'>
      <Routes>
        <Route index element={<Main />} />
        <Route path='/' element={<Layout />}>
          <Route path='movies' element={<Movies />} />
          <Route path='saved-movies' element={<SavedMovies />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='signin' element={<Login />} />
        <Route path='signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

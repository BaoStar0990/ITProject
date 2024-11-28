import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Introduction from './pages/Introduction'
import Home from './pages/Home'
import TicketPrice from './pages/TicketPrice'
import SignIn from './pages/Signin'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Schedules from './pages/Schedules'
import Order from './pages/Order'
import Confirm from './pages/Confirm'
import Success from './pages/Success'
import Profile from './pages/Profile'
import Admin from './pages/admin/Admin'
import Admin_User from './pages/admin/Admin_User'
import Admin_Movie from './pages/admin/Admin_Movie'
import Admin_Order from './pages/admin/Admin_Order'
import Admin_Showtime from './pages/admin/Admin_Showtime'
import Admin_Room from './pages/admin/Admin_Room'


function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path='/introduction' element={<Introduction/>}></Route>
              <Route path='/ticket' element={<TicketPrice/>}></Route>
              <Route path='/signin' element={<SignIn/>}></Route>
              <Route path='/movies' element={<Movies/>}></Route>
              <Route path='/moviedetail/:id' element={<MovieDetail/>}></Route>
              <Route path='/moviedetail/:id/order' element={<Order/>}></Route>
              <Route path='/moviedetail/:id/confirm' element={<Confirm/>}></Route>
              <Route path='/moviedetail/:id/success' element={<Success/>}></Route>
              <Route path='/schedules' element={<Schedules/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/admin' element={<Admin/>}></Route>
              <Route path='/admin/user' element={<Admin_User/>}></Route>
              <Route path='/admin/movie' element={<Admin_Movie/>}></Route>
              <Route path='/admin/order' element={<Admin_Order/>}></Route>
              <Route path='/admin/showtime' element={<Admin_Showtime/>}></Route>
              <Route path='/admin/room' element={<Admin_Room/>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App

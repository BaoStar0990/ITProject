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
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App

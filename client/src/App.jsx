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
              <Route path='/movies/id_demo' element={<MovieDetail/>}></Route>
              <Route path='/movies/id_demo/order' element={<Order/>}></Route>
              <Route path='/schedules' element={<Schedules/>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
import './App.css';
import {Routes, Route} from 'react-router-dom'
import {Home} from './Pages/Home';
import {Menu} from './Pages/Menu'
import {Cart} from './Pages/Cart'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPg from './Pages/Login';
import Aos from "aos";
import { useEffect } from 'react';
import ScrollToTop from './Hooks/ScrollToTop';
function App() {
  useEffect(() => {
    Aos.init({duration:500})
  }, [])
  
  return (
    <div className="App">
      <ScrollToTop/> 
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="Menu" element={<Menu/>}></Route>
        <Route path="Cart" element={<Cart/>}></Route>
        <Route path="/login" element={<LoginPg/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

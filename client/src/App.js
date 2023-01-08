import './App.css';
import {Routes, Route} from 'react-router-dom'
import {Home} from './Pages/Home';
import {Menu} from './Pages/Menu'
import {Gallery} from './Pages/Gallery'
import {Services} from './Pages/Services'
import {Contact} from './Pages/Contact'
import {About} from './Pages/About'
import {Cart} from './Pages/Cart'
import Navbar from './components/Navbar/Navbar';





function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="Menu" element={<Menu/>}></Route>
        <Route path="Gallery" element={<Gallery/>}></Route>
        <Route path="Services" element={<Services/>}></Route>
        <Route path="Contact" element={<Contact/>}></Route>
        <Route path="About" element={<About/>}></Route>
        <Route path="Cart" element={<Cart/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;

import './App.css';
import {Routes, Route} from 'react-router-dom'
import {Home} from './Pages/Home';
import {Menu} from './Pages/Menu'
import {Cart} from './Pages/Cart'
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="Menu" element={<Menu/>}></Route>
        <Route path="Cart" element={<Cart/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;

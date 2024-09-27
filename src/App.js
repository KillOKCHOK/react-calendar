import { useEffect } from 'react';
import './App.css';
import Content from './components/common/Content';
import Footer from './components/common/Footer';
import MyHeader from './components/common/MyHeader';
import { useDispatch } from 'react-redux';
import { initialLogin } from './store/reducers/accountSlice';
import { Button } from 'react-bootstrap';

function App() {
  const dispatch = useDispatch();
  useEffect(
    ()=>{
      dispatch(initialLogin());
    }
  )

  const scrollToTop = () =>{
    // setCookie('name', cookies.name?"":"Stepan", { path: '/' });
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  return (
    <div className="App">
      <MyHeader/>
      <Content/>
      <Footer/>
      <Button className='scrollUp ' variant="dark" size="md" onClick={scrollToTop}>&uarr;</Button>
    </div>
  );
}

export default App;

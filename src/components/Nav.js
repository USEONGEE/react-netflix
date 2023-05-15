import React, { useEffect, useState } from 'react'
import "./Nav.css"
import { useNavigate } from 'react-router-dom';
export default function Nav() {

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () =>{
      if(window.scrollY > 50) setShow(true);
      else setShow(false);
    })
  
    return () => {
      window.removeEventListener("scroll", ()=>{});
    }
  }, [])
  
  const handleChange = (e) => {
    // e.preventDefault();
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  return (
    <nav className={`nav ${show && "nav__black"}`} >
      <img
        className='nav__logo'
        alt='Netfilx logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/120px-Netflix_2015_logo.svg.png'
        onClick={() => {navigate('/')}} />

      <input value={searchValue} onChange={handleChange} className='nav__input' type='text' placeholder='영화를 검색해주세요.'/>

      <img
        className='nav__avatar'
        alt="User logged"
        src='https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg'
        width="50" height="50" />
    </nav>
  )
}

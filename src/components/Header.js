import React  from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import AccountMenu from './Account';
import BasicMenu from './Settings';


function Header({ search, setSearch }) {
  
  
  return (
    <header className="header">
      
       <img
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt="Google Keep Logo"
          className="header__logo"
        />
      <h1>Keep</h1>
      <div className='seacrh-bar'>
      <input className='search' value={search}
       onChange={(e) => setSearch(e.target.value)}
        placeholder='search ...'
        />   
          </div>
      <div className='profile-container'  >
        <IconButton className='prfile-icon' style={{ position:'relative' , left:'-123px' , top:'43px'}}>
        <RefreshIcon className='prfile-icon' style={{fontSize:'40px' }}/>
        </IconButton>
        
        
        <BasicMenu className='prfile-icon'/>
        
        <AccountMenu className='prfile-icon'/>
        </div>
    </header>
  );
}

export default Header;

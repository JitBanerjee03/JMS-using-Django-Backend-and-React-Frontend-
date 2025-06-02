import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contextProviderDeclare } from '../store/ContextProvider';

const LoggedHeader = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const navigate = useNavigate();
  const getContextObject = useContext(contextProviderDeclare);
  const { setLoggedIn, isloggedIn } = getContextObject;

  const handleLinkClick = (label) => {
    setActiveLink(label);
  };
  
  const handleLogOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(!isloggedIn);
    navigate('/');
  }

  return (
    <div style={{ marginLeft: '8%', marginRight: '8%' }}>
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          {/* Replace this with a logo or text as needed */}
          <img src="/logo.png" alt="Logo" width="40" height="40" className="me-2"/>
          <span className="fs-4">Journal Management System</span>
        </Link>

        <ul className='nav nav-pills'>
          <li className='nav-item'>
            <Link to={'/'} className={`nav-link ${activeLink === 'Home' ? 'active' : ''}`} onClick={() => handleLinkClick('Home')}>Home</Link>
          </li>
          
          <li className='nav-item'>
            <Link to={'/submitted-article'} className={`nav-link ${activeLink === 'Submitted Article' ? 'active' : ''}`} onClick={() => handleLinkClick('Submitted Article')}>Submitted Article</Link>
          </li>
          
          {/* New Approving Area Editor Link */}
          <li className='nav-item'>
            <Link to={'/area-editor'} className={`nav-link ${activeLink === 'Area Editor' ? 'active' : ''}`} onClick={() => handleLinkClick('Area Editor')}>Area Editor</Link>
          </li>
          
          <li className='nav-item'>
            <Link to={'/account'} className={`nav-link ${activeLink === 'Account' ? 'active' : ''}`} onClick={() => handleLinkClick('Account')}>Account</Link>
          </li>
          
          {/*<li className='nav-item'>
            <Link to={'/status'} className={`nav-link ${activeLink === 'Status' ? 'active' : ''}`} onClick={() => handleLinkClick('Status')}>Status</Link>
          </li>*/}

          <li className='nav-item'>
            <Link to={'/about'} className={`nav-link ${activeLink === 'About' ? 'active' : ''}`} onClick={() => handleLinkClick('About')}>About</Link>
          </li>
        </ul>
        <button type="button" className="btn btn-outline-warning" style={{marginLeft:'2%'}}
          onClick={handleLogOut}
        >Log Out</button>
      </header>
    </div>
  );
};

export default LoggedHeader;
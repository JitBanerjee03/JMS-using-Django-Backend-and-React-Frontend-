import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUser, 
  FaUserEdit, 
  FaUserTie, 
  FaUserShield, 
  FaUserCog, 
  FaBars, 
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt
} from 'react-icons/fa';
import './styles/Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const roles = [
    { 
      name: 'Author', 
      icon: <FaUser />, 
      link: 'http://localhost:5173/',
      description: 'Submit and track your manuscripts',
      color: '#3498db'
    },
    { 
      name: 'Reviewer', 
      icon: <FaUserEdit />, 
      link: 'http://localhost:5174/',
      description: 'Review submitted manuscripts',
      color: '#2ecc71'
    },
    { 
      name: 'Associate Editor', 
      icon: <FaUserTie />, 
      link: 'http://localhost:5175/',
      description: 'Manage the review process',
      color: '#9b59b6'
    },
    { 
      name: 'Area Editor', 
      icon: <FaUserShield />, 
      link: 'http://localhost:5176/',
      description: 'Oversee specific subject areas',
      color: '#e67e22'
    },
    { 
      name: 'Editor in Chief', 
      icon: <FaUserCog />, 
      link: 'http://localhost:5177/',
      description: 'Manage the entire editorial process',
      color: '#e74c3c'
    }
  ];

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  const toggleDropdown = (roleName) => {
    setActiveDropdown(activeDropdown === roleName ? null : roleName);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="journal-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-container">
            <img 
              src="/logo.png" 
              alt="Journal Management System Logo" 
              className="logo-image"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/logo.png';
              }}
            />
          </div>
          <div className="title-container">
            <h1 className="system-title">Journal Management System</h1>
            <p className="system-subtitle">Academic Publishing Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" ref={dropdownRef}>
          {roles.map((role) => (
            <div 
              key={role.name} 
              className={`nav-item ${activeDropdown === role.name ? 'active' : ''}`}
              onMouseEnter={() => setActiveDropdown(role.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div 
                className="nav-button"
                onClick={() => toggleDropdown(role.name)}
                style={{ '--role-color': role.color }}
              >
                <span className="button-icon">{role.icon}</span>
                <span className="button-text">{role.name}</span>
                <span className="dropdown-arrow">
                  {activeDropdown === role.name ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              
              {activeDropdown === role.name && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    <div className="role-header" style={{ backgroundColor: role.color }}>
                      <span className="button-icon">{role.icon}</span>
                      <span className="role-title">{role.name}</span>
                    </div>
                    <p className="role-description">{role.description}</p>
                    <button 
                      className="portal-button"
                      onClick={() => openLink(role.link)}
                      style={{ backgroundColor: role.color }}
                    >
                      Go to {role.name} Portal
                      <FaExternalLinkAlt className="external-icon" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {roles.map((role) => (
            <div key={role.name} className="mobile-nav-item">
              <button
                className="mobile-nav-button"
                onClick={() => {
                  openLink(role.link);
                  setIsMobileMenuOpen(false);
                }}
                aria-label={`Open ${role.name} portal`}
                style={{ borderLeft: `4px solid ${role.color}` }}
              >
                <span className="button-icon" style={{ color: role.color }}>{role.icon}</span>
                <div className="mobile-button-text">
                  <span className="role-name">{role.name}</span>
                  <span className="role-description">{role.description}</span>
                </div>
                <FaExternalLinkAlt className="external-icon" />
              </button>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
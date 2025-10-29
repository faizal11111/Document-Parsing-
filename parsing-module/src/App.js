import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/Fileuploader';
import logo from './DPM.png';


const styles = {
  header: {
    position: 'relative',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logo: {
    height: '50px',
    cursor: 'pointer',
    position: 'absolute',
    left: '1rem',
    top: '1rem',
    transition: 'all 0.3s ease',
    borderRadius: '10px',
  },
  logoHover: {
    filter: 'drop-shadow(0 0 8px #00ff80ff)',
    transform: 'scale(1.5)'
  },
  title: {
    color: '#000000ff',
    margin: 0,
    fontSize: '2rem',
    fontWeight: '700',
    userSelect: 'none',
     cursor: 'default',
    transition: 'text-shadow 0.3s ease',
    padding: '6px 12px',
    borderRadius: '8px',
  },
  titleHover: {
    textShadow: '0 0 8px #881e1eff, 0 0 20px #ca1a1aff',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top:10,left:0, right:0, bottom:0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
  modalContent: {
    maxWidth: '600px',
    backgroundColor: '#283544',
    color: '#ddfaf3',
    borderRadius: '12px',
    padding: '24px',
    filter: 'drop-shadow(0 0 8px #00ff80ff)',
    position: 'relative',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    
   
  },
  closeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#00FF80',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#222930',
  }
};

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLogoHovered, setLogoHovered] = useState(false);
const [isTitleHovered, setTitleHovered] = useState(false);
  return (
    <div className="App">
      <header style={styles.header}>

        <img
          src={logo}
          alt="Document Parsing Logo"
          style={{...styles.logo, ...(isLogoHovered ? styles.logoHover : {})}}
          onClick={() => setShowPopup(true)}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setShowPopup(true)}}
          title="Click to see about info"
        />

        <h1 
      style={{...styles.title, ...(isTitleHovered ? styles.titleHover : {})}}
      onMouseEnter={() => setTitleHovered(true)}
      onMouseLeave={() => setTitleHovered(false)}
    >
      Document Parsing
    </h1>
      </header>

      <FileUploader />

      {showPopup && (
        <div style={styles.modalOverlay} onClick={() => setShowPopup(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button 
              style={styles.closeBtn}
              aria-label="Close about modal"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2>About </h2>
            <p style={{ textAlign: 'justify', textAlignLast: 'justify', margin: '1rem auto', maxWidth: '700px' }}>
              The Document Parsing Module is a robust and versatile application designed to seamlessly extract and structure content from a variety of file formats including PDFs, Word documents, Excel spreadsheets, images, and plain text files. Leveraging a modern React-based frontend integrated with a FastAPI backend, this module delivers accurate text and table extraction, 
              maintaining the original structure and metadata for easy downstream processing. Its intuitive user interface offers straightforward file uploading, real-time visual feedback, and detailed JSON output presentation, ensuring a seamless user experience. This solution caters both to technical users requiring precise data extraction and to business users aiming to automate
              document handling workflows efficiently and reliably.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
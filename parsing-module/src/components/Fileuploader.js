import React, { useState } from 'react';

const allowedTypes = [
  '.pdf',
  '.jpg,.jpeg,.png',
  '.docx',
  '.xls,.xlsx',
  '.txt'
];

const styles = {
  container: {
    maxWidth: 400,
    margin: "60px auto",
    padding: "32px 28px",
    background: "#222930",
    borderRadius: "14px",
    boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
    color: "#e0e5ec",
    fontFamily: "Segoe UI, Ubuntu, Arial, sans-serif",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },

  fileBox: {
    border: "1px solid #586776",
    borderRadius: "6px",
    padding: "8px 12px",
    background: "#242E38",
    color: "#c5e6d5",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: "background-color 0.3s, border-color 0.3s",
  },
   fileBoxHover: {
    background: "#2d3a48",
    borderColor: "#00FF80",
    color: "#00FF80",
  },
  removeBtn: {
    marginLeft: "12px",
    background: "#ff4444",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    lineHeight: "18px",
    textAlign: "center",
    padding: 0,
    justifyContent:"center"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#00FF80",
    marginBottom: "12px",
  },
  inputLabel: {
    border: "1px solid #586776",
    borderRadius: "6px",
    padding: "10px",
    background: "#242E38",
    color: "#c5e6d5",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "1rem",
    fontWeight: "600",
  },
  fileInput: {
    display: "none"
  },
  button: {
    width: "100%",
    background: "#00FF80",
    color: "#222930",
    border: "none",
    borderRadius: "8px",
    padding: "12px 0",
    fontSize: "1.1em",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,255,128,0.11)",
    transition: "background 0.3s, color 0.3s",
  },
  buttonDisabled: {
    background: "#444C59",
    color: "#a2b3c2",
    cursor: "not-allowed",
  },
  buttonHover: {
    background: "#00d964",
    color: "#111",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    maxWidth: "90vw",
    maxHeight: "80vh",
    overflowY: "auto",
    backgroundColor: "#283544",
    padding: "30px",
    borderRadius: "14px",
    color: "#ddfaf3",
    whiteSpace: "pre-wrap",
    textAlign: "justify",
    fontFamily: "Consolas, Menlo, monospace",
  },
  closeBtn: {
    background: "#00FF80",
    color: "#222930",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    float: "right",
  }
};

function FileUploader() {
  const [file, setFile] = useState(null);
  const [parseResult, setParseResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [fileBoxHovered, setFileBoxHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('files', file);

    try {
      const res = await fetch('https://document-parsing-backend-production.up.railway.app/upload/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log("Server response:", data);

      if (data.files && data.files.length > 0) {
        console.log("Parsed output:", data.files[0].parsed_output);
        setParseResult(data.files[0].parsed_output);
        setShowModal(true);
      } else {
      alert("No parsed output received from server");
    }
    } catch (error) {
      alert("Upload failed: " + error.message);
    }
  };

 return (
  <div style={styles.container}>
    <div style={styles.title}>Document Parsing Module</div>
 <label
        htmlFor="fileInput"
        style={{ 
          ...styles.fileBox, 
          ...(fileBoxHovered ? styles.fileBoxHover : {}) 
        }}
        onMouseEnter={() => setFileBoxHovered(true)}
        onMouseLeave={() => setFileBoxHovered(false)}
      >
        {file ? file.name : "Choose File (PDF, Image, Word, Excel, Text)"}
        {file && (
          <button
            style={styles.removeBtn}
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
              setParseResult(null);
            }}
          >
            ×
          </button>
        )}
      </label>

      <input
        id="fileInput"
        type="file"
        accept={allowedTypes.join(',')}
        onChange={handleFileChange}
        style={styles.fileInput}
      />

      <button
        style={{
          ...(!file ? { ...styles.button, ...styles.buttonDisabled } : styles.button),
          ...(buttonHovered && file && styles.buttonHover)
        }}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        onClick={handleUpload}
        disabled={!file}
      >
        Upload & Parse
      </button>

    {showModal && parseResult && (
      <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
        <div
          style={styles.modalContent}
          onClick={e => e.stopPropagation()} 
        >
          <button
            style={styles.closeBtn}
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <pre>{JSON.stringify(parseResult, null, 2)}</pre>
        </div>
      </div>
    )}
  </div>
);
}

export default FileUploader;

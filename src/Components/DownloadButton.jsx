import React from 'react';
import Download from '../assets/download.svg';
const DownloadButton = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/JoseLuisUgarte.pdf'; // Ruta relativa al archivo PDF en la carpeta public
    link.download = 'JoseLuisUgarte.pdf';
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-white text-black hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform font-firacode gap-2 font-medium py-2 px-4 rounded-lg flex"
    >
      <p>Download CV</p>
      <img src={Download} className=''/>
    </button>
  );
};

export default DownloadButton;

import React, { useEffect } from 'react';

const Acessebility = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.userway.org/widget.js";
    script.setAttribute('data-account', 'ACvKs6c0WT');
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []); 
};

export default Acessebility;

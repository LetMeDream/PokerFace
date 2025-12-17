import { useEffect } from 'react'

const useRecaptcha = () => {

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY_V3 || '';
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Limpieza (opcional): se puede eliminar el script si el componente se desmonta
      document.body.removeChild(script);
    };
  }, []);

  return {}
}

export default useRecaptcha
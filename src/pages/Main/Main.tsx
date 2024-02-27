import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkLocalStorage = () => {
            const user = localStorage.getItem('user');
            if (user) {
            navigate('/restaurants')
            }
          }
          checkLocalStorage();
    }, [navigate]);
    return <></>;
};

export default Main;

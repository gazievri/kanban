
import Button from '../../components/Button'
import './NotFound.scss'
import { useLocation, useNavigate } from 'react-router-dom';

export const NotFound = () => {
    let navigate = useNavigate(); 
    let location = useLocation(); 
    const handleGoBack = () => {
        let from = location.state?.from?.pathname || "/"; 
        navigate(from, { replace: true }); 
    }

    return (
        <div className="NotFound">
            <h2 className='NotFound__title' >404</h2>
            <p className="NotFound__text">Page does not exist</p>
            <Button label='Go back' fn={handleGoBack} />
        </div>
    )
}
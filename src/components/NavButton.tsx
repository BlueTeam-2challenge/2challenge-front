import { Link, useLocation } from 'react-router-dom';
import './NavButton.css'
import { ButtonLinkProps } from "../types";

const NavButton = (props: ButtonLinkProps) => {

    const location = useLocation();

    const isActive = location.pathname === props.to;

    const buttonStyle = {
        backgroundColor: isActive ? '#26C485' : '#EEE0CB',
        textDecoration: 'none'
    }

    return (
        <div className='container'>

            {/* precisa ser adicionado as rotas no app */}
            <Link to={props.to} style={buttonStyle} className='btn'>

                <img src={props.icon} alt="page-icon" className='btn-iconPage' />
                <p className='btn-textPage'>{props.label}</p>

            </Link>

        </div>
    )
}

export default NavButton
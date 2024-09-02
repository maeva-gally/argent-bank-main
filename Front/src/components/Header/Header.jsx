import { NavLink, useNavigate  } from 'react-router-dom';
import Logo from '@/assets/images/argentBankLogo.png';
import './Header.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '@/redux/actions/auth.actions';
import { useSelector, useDispatch } from 'react-redux';

function Header() {

    /* Met à jour les données de l'utilisateur dans le composant d'en-tête à partir du redux state */
    const isConnected = useSelector((state) => state.auth.token);
    const firstname = useSelector((state) => state.user.userData.firstname);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = () => {
        dispatch(logout());
        sessionStorage.clear();
        localStorage.clear();
        navigate('/');
    }

    return (
        <header>
            <nav>
                <NavLink to="/" exact="true">
                    <img src={Logo} alt="Bank Logo" />
                </NavLink>
                {isConnected ? (
                    <div className='connected'>
                        <NavLink to='/profile'>
                            <FontAwesomeIcon icon={faUserCircle} size="1x"/>
                            <p>{firstname}</p>
                        </NavLink>
                        <NavLink to='/' onClick={logoutHandler}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size="1x" />
                            <p> Sign out </p>
                        </NavLink>
                    </div>
                ) : (
                    <div className='not-connected'>
                        <NavLink to='/login' >
                            <FontAwesomeIcon icon={faUserCircle} size="1x"/>
                            <p>Sign In</p>
                        </NavLink>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
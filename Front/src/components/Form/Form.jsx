import { useState } from 'react';
import './Form.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginSuccess } from '@/redux/actions/auth.actions.jsx';
import { isValidEmail, isValidPassword } from '@/utils/regex.jsx';
import Toast from '@/components/toast/toast.jsx';

function Form () {
  // Permet de récupérer les données saisies par l'utilisateur dans le formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  // Indique un message d'erreur si les données sont invalides
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fonction asynchrone du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Vérification des données saisies par l'utilisateur
    if (!isValidEmail(email)) {
      setToastMessage("Adresse e-mail invalide");
      setShowToast(true);
      return;
    }
    if (!isValidPassword(password)) {
      setToastMessage("Mot de passe invalide");
      setShowToast(true);
      return;
    }
    
    try {
      // Appel de l'API de connexion avec les données saisies par l'utilisateur
      const apiUrl = import.meta.env.VITE_URL;
      const response = await fetch(`${apiUrl}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        // Connexion réussie
        const data = await response.json();
        const token = data.body.token;
        
        // Dispatch de l'action de connexion réussie
        dispatch(loginSuccess(token));
        
        // Stockage du token dans la session storage
        sessionStorage.setItem("token", token);
        
        if (rememberMe) {
          // Stockage du token dans le local storage si l'option "Se souvenir de moi" est cochée
          localStorage.setItem("token", token);
        }
        
        // Redirection vers la page de profil
        navigate('/profile');
      } else {
        // Connexion échouée, dispatch de l'action d'échec de connexion
        const error = "Adresse e-mail/mot de passe incorrect";
        dispatch(loginFailed(error));
      }
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
    }
  }

  const closeToast = () => {
    // Fermeture du toast
    setShowToast(false);
  };

  return (
    <section className='sign-in-content'>
      <FontAwesomeIcon icon={faUserCircle} size="2x"  />
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-wrapper'>
          <label htmlFor='username'>Nom d&apos;utilisateur</label>
          <input 
            id='username' 
            type='text'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='password'>Mot de passe</label>
          <input 
            id='password' 
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='input-remember'>
          <input 
            id='remember-me' 
            type='checkbox' 
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <label htmlFor='remember-me'>Se souvenir de moi</label>
        </div>
        <button className="sign-in-button">
          Se connecter
        </button>
        {showToast && <Toast message={toastMessage} isVisible={showToast} onClose={closeToast} />}
      </form>
    </section>
  );
}

export default Form;
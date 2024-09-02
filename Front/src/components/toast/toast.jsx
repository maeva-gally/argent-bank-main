import { useEffect } from 'react';
import PropTypes from 'prop-types'; 
import './toast.sass';

// La fonction composant Toast prend quatre props :
// message : le message à afficher dans le toast
// isVisible : un indicateur pour déterminer si le toast doit être affiché ou non
// onClose : une fonction à appeler lorsque le toast est fermé
// duration : la durée (en millisecondes) pendant laquelle le toast doit être affiché
function Toast({ message, isVisible, onClose, duration }) {
  // useEffect est un hook React qui exécute des effets de bord dans les composants de fonction.
  // Dans ce cas, il définit un délai lorsque le toast devient visible, et le supprime lorsque le toast est fermé.
  useEffect(() => {
    if (isVisible) {
      // Lorsque le toast est visible, commencez un chronomètre pour la durée spécifiée.
      const timer = setTimeout(() => {
        // Lorsque le chronomètre se termine, appelez la fonction onClose pour fermer le toast.
        onClose();
      }, duration);

      // Ceci est la fonction de nettoyage que React exécutera lors du démontage du composant,
      // ainsi qu'avant de réexécuter l'effet en raison de rendus ultérieurs.
      // Nous l'utilisons pour effacer le chronomètre.
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]); // Ne réexécutez l'effet que si isVisible, onClose ou duration change

  // Si le toast n'est pas visible, ne rien afficher.
  if (!isVisible) return null;

  // Rendre le toast avec le message passé en prop.
  return (
    <div className="toast">
      {message}
    </div>
  );
}

// PropTypes fournit une vérification de type pour les props React. 
// Il validera que le bon type de prop est fourni et émettra un avertissement si ce n'est pas le cas.
Toast.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number
};

// defaultProps vous permet de spécifier des props par défaut pour un composant.
// Dans ce cas, nous spécifions que la durée par défaut pour un toast est de 4000 millisecondes (soit 4 secondes).
Toast.defaultProps = {
  duration: 4000
};

export default Toast;


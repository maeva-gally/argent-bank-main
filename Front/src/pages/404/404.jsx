import React from "react";
import { Link } from "react-router-dom";
import Errorimg from '@/assets/images/404.jpeg';
import './404.sass';

/* Error page if user uses unknown route */
function Error () {
    return (
        <div className="error-page">
            <main>
                <section className="error">
                    <img src={Errorimg} alt="error 404" className="green-error"/>
                    <div className="link-container">
                    <Link to="/">
                        <button className="button-404">Retour Accueil</button>
                    </Link>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Error
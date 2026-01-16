import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Gracias.css';


const Gracias = () => { 
    const navigate = useNavigate();

    return ( 
        <div className="gracias-container">
            <div className="gracias-card">
                <div className="success-icon">✓</div>
                <h1>Solicitud Recibida!</h1>
                <p>Gracias por confiar en <strong>Fluxa</strong>. Hemos recibido tus requerimientos técnicos y nos pondremos en contacto contigo a la brevedad para enviarte una propuesta personalizada.</p>

                <div className="gracias-footer">
                    <button className="btn-black" onClick={() => navigate('/')}>
                        Volver al Inicio
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Gracias;
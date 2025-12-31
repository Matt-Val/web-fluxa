import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Solicitud = () => { 
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState( {tipo : '' } );
    const navigate = useNavigate();

    const seleccionarTipo = (tipo) => { 
        setFormData( { ...formData, tipo } );
        setStep(2); // Que avance al siguiente paso
    };

    return (
        <div className="fluxa-page form-view">
            <header className="form-header">
                <h2>Solicitud de Proyecto Web</h2>
                <p>Cuentanos sobre tu proyecto y te contactaremos con una propuesta personalizada.</p>
            </header>
        </div>
    )
}
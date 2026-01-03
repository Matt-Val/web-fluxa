import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Solicitud.css';

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

            <div className="stepper">
                <div className={`step ${step >= 1 ? 'active' : ''}`}><span>1</span><label>Tipo</label></div>
                    
                <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
                    
                <div className={`step ${step >= 2 ? 'active' : ''}`}><span>2</span><label>Alcance</label></div>
                    
                <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
                    
                <div className={`step ${step >= 3 ? 'active' : ''}`}><span>3</span><label>Presupuesto</label></div>
                    
                <div className={`step-line ${step >= 4 ? 'active' : ''}`}></div>
                    
                <div className={`step ${step >= 4 ? 'active' : ''}`}><span>4</span><label>Resumen</label></div>
            </div>

            <section className="form-step-content">
                { step === 1 && (
                    <>
                        <h3>¿Qué necesitas?</h3>
                        <p className="step-subtitle">Selecciona el tipo de proyecto que se ajuste a tus necesidades.</p>

                        <div className="form-grid">
                            <FormCard 
                                icon="🛒"
                                title="E-commerce" 
                                desc="Tienda online con carrito, pagos y gestión de productos." 
                                onClick={() => seleccionarTipo('ecommerce')} 
                            />
                            <FormCard 
                                icon="📄"
                                title="Landing Page" 
                                desc="Página de aterrizaje para campañas o presentación de servicios." 
                                onClick={() => seleccionarTipo('landing')} 
                            />
                            <FormCard 
                                icon="📖"
                                title="Blog" 
                                desc="Sitio web con sistema de publicaciones y contenido editorial." 
                                onClick={() => seleccionarTipo('blog')} 
                            />
                            <FormCard 
                                icon="🏢"
                                title="Sistema Corporativo" 
                                desc="Aplicación web empresarial con funcionalidades específicas para tu negocio." 
                                onClick={() => seleccionarTipo('corporate')} 
                            />
                        </div>
                    </>
                )}

                { step === 2 && ( 
                    <div>
                        <h3>Paso 2: Alcance </h3>
                        <p>Has seleccionado: {formData.tipo}</p>
                        <button className="btn-black" onClick={() => setStep(1) }> Volver </button>
                    </div>
                )}
            </section>

            <button className="btn-secondary" onClick={() => navigate('/') } >
                Volver al inicio
            </button>
        </div>
    );
};

const FormCard = ( { icon, title, desc, onClick } ) => ( 
    <div className="form-card" onClick={onClick}>
        <div className="form-icon-box">{icon}</div>
        <div className="form-card-info">
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
    </div>
)
export default Solicitud;
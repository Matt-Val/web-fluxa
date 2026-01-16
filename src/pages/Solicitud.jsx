import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Solicitud.css';
import emailjs from '@emailjs/browser';

// Importamos los componentes
import { PreguntasEcommerce } from '../components/PreguntasEcommerce';
import { PreguntasLanding } from '../components/PreguntasLanding';
import { PreguntasBlog } from '../components/PreguntasBlogs';
import { PreguntasCorporate } from '../components/PreguntasCorporate';

const Solicitud = () => { 

    const [step, setStep] = useState(1);

    // Inicializa los detalles en el estado
    const [formData, setFormData] = useState({
        tipo: '',
        detalles: {},
        presupuesto: '',
        contacto: { nombre: '', email: '', telefono: ''}
    });

    const navigate = useNavigate();
    
    const handleSeleccionarTipo = (tipo) => { 
        setFormData( { ...formData, tipo, detalles: {} } );
    };

    const handleSeleccionarPresupuesto = (rango) => { 
        setFormData({ ...formData, presupuesto: rango } );
    };

    // Fun para capturar las respuestas del paso 2
    const handleDetalles = (campo, valor) => { 
        setFormData(prev => ({ 
            ...prev,
            detalles: { ...prev.detalles, [campo]: valor }
        }));
    };

    const handleContacto = (e) => { 
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev,
            contacto: { ...prev.contacto, [name]: value }
        }));
    };

    const esContactoValido = () => { 
        const { nombre, email, telefono } = formData.contacto;

        // Regla 1: Que los campos esten llenos
        const noEstanVacios = nombre.trim() !== '' && email.trim() !== '' && telefono.trim() !== '';

        // Regla 2: Que el Email contenga un @
        const emailValido = email.includes('@');

        // Regla 3: Que el telefono tenga exactamente 12 digitos 
        const telefonoValido = telefono.length === 12;

        return noEstanVacios && emailValido && telefonoValido;
    };

    const enviarSolicitud = () => { 
        // Formateamos los detalles del paso 2, para que sean legibles en el mail.
        // Convertimos el objeto en una linea de texto

        const detallesTexto  = Object.entries(formData.detalles)
            .map(([key, value]) => { 
                if (typeof value === 'boolean') return value ? `- ${key}` : null;
                return `- ${key}: ${value}`;
            })
            .filter(item => item !== null)
            .join('\n');


        // Definimos los parametros que van a coincidir con la plantilla de emailjs
        const templateParams = { 
            nombre : formData.contacto.nombre,
            email: formData.contacto.email,
            telefono: formData.contacto.telefono,
            tipo_proyecto: formData.tipo,
            presupuesto: formData.presupuesto,
            detalles: detallesTexto,
            notas: formData.detalles.notas_adicionales || 'Ninguna'
        };

        // Enviamos el email usando emailjs
        emailjs.send( 
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        )
        .then ( (response) => { 
            console.log('EXITO!' , response.status, response.text);
            alert('Tu solicitud ha sido enviada con éxito. ¡Nos pondremos en contacto contigo pronto!');
            navigate('/gracias');
        })
        .catch( (err) => { 
            console.error('ERROR...' , err);
            alert('Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente más tarde.');
        });
    };


    return (
        <div className="fluxa-page form-view">
            <header className="form-header">
                <h2>Solicitud de Proyecto Web</h2>
                <p>Cuéntanos sobre tu proyecto y te contactaremos con una propuesta personalizada.</p>
            </header>

            {/* Stepper Visual */}
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

                {/* Paso 1: Selección de Tipo */}
                { step === 1 && (
                    <>
                        <h3>¿Qué necesitas?</h3>
                        <p className="step-subtitle">Selecciona una opción para continuar.</p>

                        <div className="form-grid">
                            <FormCard 
                                icon="🛒"
                                title="E-commerce" 
                                desc="Tienda online con carrito, pagos y gestión de productos." 
                                isSelected={formData.tipo === 'ecommerce'}
                                onClick={() => handleSeleccionarTipo('ecommerce')} 
                            />
                            <FormCard 
                                icon="📄"
                                title="Landing Page" 
                                desc="Página de aterrizaje para campañas o presentación de servicios." 
                                isSelected={formData.tipo === 'landing'}
                                onClick={() => handleSeleccionarTipo('landing')} 
                            />
                            <FormCard 
                                icon="📖"
                                title="Blog" 
                                desc="Sitio web con sistema de publicaciones y contenido editorial." 
                                isSelected={formData.tipo === 'blog'}
                                onClick={() => handleSeleccionarTipo('blog')} 
                            />
                            <FormCard 
                                icon="🏢"
                                title="Sistema Corporativo" 
                                desc="Aplicación web empresarial con funcionalidades específicas para tu negocio." 
                                isSelected={formData.tipo === 'corporate'}
                                onClick={() => handleSeleccionarTipo('corporate')} 
                            />
                        </div>

                        <div className="btn-group">
                            <button 
                                className="btn-black"
                                disabled={!formData.tipo} // Bloqueado hasta que elija algo
                                onClick={() => setStep(2)}
                            >
                                Continuar
                            </button>
                        </div>
                    </>
                )}

                { step === 2 && ( 
                    <div className="step-container">

                        {formData.tipo === 'ecommerce' && <PreguntasEcommerce onChange = {handleDetalles} valores = {formData.detalles} /> }

                        {formData.tipo === 'landing' && <PreguntasLanding onChange = {handleDetalles} valores = {formData.detalles} /> }

                        {formData.tipo === 'blog' && <PreguntasBlog onChange = {handleDetalles} valores = {formData.detalles}/>}

                        {formData.tipo === 'corporate' && <PreguntasCorporate onChange = {handleDetalles} valores = {formData.detalles} /> }

                        <div className="btn-group">
                            <button className="btn-secondary" onClick={() => setStep(1)}>Atrás</button>
                            <button className="btn-black" onClick={() => setStep(3)}>Continuar</button>
                        </div>
                    </div>
                )}

                {step === 3 && ( 
                    <div className="step-container">
                        <h3>¿Qué alcance tiene tu inversión?</h3>

                        {/* Usamos el mismo grid para mantener la simetria */}
                        <div className="form-grid">
                            <FormCard
                                icon="🌱"
                                title="Esencial"
                                desc="Funciones básicas para comenzar a tener presencia online."
                                isSelected={ formData.presupuesto === 'esencial' }
                                onClick={ () => handleSeleccionarPresupuesto('esencial') }
                            />

                            <FormCard
                                icon="🚀"
                                title="Crecimiento"
                                desc="Para negocios que necesiten escalar y automatizar procesos."
                                isSelected={ formData.presupuesto === 'crecimiento' }
                                onClick={ () => handleSeleccionarPresupuesto('crecimiento') }
                            />

                            <FormCard
                                icon="🏢"
                                title="Corporativo"
                                desc="Sistemas complejos con integraciones de alto rendimiento."
                                isSelected={ formData.presupuesto === 'corporativo' }
                                onClick={ () => handleSeleccionarPresupuesto('corporativo') }
                            />

                            <FormCard
                                icon="🛠️"
                                title="A Medida"
                                desc="Un encargado se pondrá en contacto contigo para discutir los detalles."
                                isSelected={ formData.presupuesto === 'a-medida' }
                                onClick={ () => handleSeleccionarPresupuesto('a-medida')}
                            />
                        </div>

                        <div className="extra-info-bloque">
                            <h4>¿Algo más que debamos saber? (Opcional)</h4>
                            <textarea
                                placeholder="Cuéntanos más sobre tu idea o requerimientos especiales..."
                                onChange={(e) => handleDetalles('notas_adicionales', e.target.value)}
                            />
                        </div>
                        
                        
                        <div className="btn-group">
                            <button className="btn-secondary" onClick={ () => setStep(2)}>Atrás</button>
                            <button className="btn-black" disabled={!formData.presupuesto} onClick={() => setStep(4) } >Continuar</button>
                        </div>
                    </div>
                )}

                { step === 4 && ( 
                    <div className="resumen-container">
                        <h3>Casi listos, ¿Cómo te contactamos?</h3>
                        <p className="step-subtitle">Ingresa tus datos para enviarte la propuesta técnica.</p>

                        <div className="contacto-form">
                            <input 
                                type="text"
                                name="nombre"
                                placeholder="Juan Pérez" 
                                value={formData.contacto.nombre}
                                onChange={handleContacto}
                            />
                            <input 
                                type="email"
                                name="email"
                                placeholder="juan@example.com"
                                value={formData.contacto.email}
                                onChange={handleContacto}
                            />

                            <input 
                                type="text" 
                                name="telefono" 
                                placeholder="+56 9 1234 5678" 
                                value={formData.contacto.telefono}
                                onChange={handleContacto} 
                                maxLength={12}
                            />
                        </div>

                        {!esContactoValido() && formData.contacto.telefono.length > 0 && ( 
                            <p style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '-10px' }}>
                                * Revisa que el correo tenga un "@" y que el teléfono tenga 12 dígitos.
                            </p>
                        )}

                        <div className="btn-group">
                            <button className="btn-secondary" onClick={() => setStep(3)}>Atrás</button>

                            <button 
                                className="btn-black" 
                                disabled={!esContactoValido()} // El btn se activa solo si el contacto es válido
                                onClick={enviarSolicitud}
                            >
                                Enviar Solicitud
                            </button>
                        </div>
                    </div>
                )}
            </section>
            
            
            <button className="btn-secondary" style={{ marginTop: '60px' }} onClick={() => navigate('/')} >
                Volver al inicio
            </button>
        </div>
    );
};

const FormCard = ( { icon, title, desc, onClick, isSelected } ) => ( 
    <div className={`form-card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <div className="form-icon-box">{icon}</div>
        <div className="form-card-info">
            <h4>{title}</h4>
            {desc && <p>{desc}</p>}
        </div>
    </div>
)
export default Solicitud;
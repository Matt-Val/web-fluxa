import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Solicitud.css';
import { supabase } from '../lib/supabaseClient';
import emailjs from '@emailjs/browser';
import { ShoppingCart, FileText, BookOpen, Building2, Sprout, Rocket, Puzzle, Hammer } from 'lucide-react';

// Importamos los componentes
import { PreguntasEcommerce } from '../components/PreguntasEcommerce';
import { PreguntasLanding } from '../components/PreguntasLanding';
import { PreguntasBlog } from '../components/PreguntasBlogs';
import { PreguntasCorporate } from '../components/PreguntasCorporate';

const Solicitud = () => { 

    const navigate = useNavigate(); // Hook de navegacion
    const [step, setStep] = useState(1); // Controla el paso actual
    const [isSending, setIsSending] = useState(false); // Evita Multiples envios

    // Estado consolidado del formulario
    const [formData, setFormData] = useState({ 
        tipo: '', // Tipo de proyecto seleccionado
        detalles: {}, // Respuestas especificas segun el tipo
        presupuesto: '', // Rango de presupuesto
        contacto: {  // Datos de contacto
            nombre: '',
            email: '',
            telefono: ''
        }
    });

    // --- Funciones de logica del estado === 
    
    const handleSeleccionarTipo = (tipo) => { 
        setFormData( { ...formData, tipo, detalles: {} } );
        // Guarda el tipo seleccionado y resetea los detalles para evitar datos de otro tipo
    };

    const handleSeleccionarPresupuesto = (rango) => { 
        setFormData({ ...formData, presupuesto: rango } );
        // Selecciona el presupuesto
    };

    // Fun para capturar las respuestas del paso 2
    const handleDetalles = (campo, valor) => { 
        setFormData(prev => ({ 
            ...prev,
            detalles: { ...prev.detalles, [campo]: valor }
            // Actualiza solo el campo especifico en detalles
        }));
    };

    const handleContacto = (e) => { 
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev,
            contacto: { ...prev.contacto, [name]: value }
        }));
        // Actualiza solo el campo especifico en contacto
    };

    const esPaso2Valido = () => { 
        const d = formData.detalles;
        switch (formData.tipo) { 
            case 'ecommerce': 
                // Requiere: productos (radio), funcionalidades (min 1), diseno (radio)
                return d.productos && (d.funcionalidades?.length > 0) && d.diseno;
            case 'landing':
                // Requiere: secciones (min 1), interacciones (min 1), diseno (radio)
                return (d.secciones?.length > 0) && (d.interacciones?.length > 0) && d.diseno;
            case 'blog':
                // Requiere: autores (radio), funcionalidades (min 1), diseno (radio)
                return d.autores && (d.funcionalidades?.length > 0) && d.diseno;
            case 'corporate':
                // Requiere: tipoSistema (radio), usuarios (radio), funcionalidades (min 1), diseno (radio)
                return d.tipoSistema && d.usuarios && (d.funcionalidades?.length > 0) && d.diseno;

            default:
                return false;
        }
        // Cada tipo de proyecto tiene requisitos diferentes. el boton para continuar se habilita solo si se cumplen todos.
    };

    const esContactoValido = () => { 
        const { nombre, email, telefono } = formData.contacto;

        const noEstanVacios = nombre.trim() !== '' && email.trim() !== '' && telefono.trim() !== '';

        const emailValido = email.includes('@');

        const telefonoValido = telefono.length === 12; // Formato esperado: +56912345678

        return noEstanVacios && emailValido && telefonoValido;

        // Valida los campos vacios, que el email contenga un @ y que el telefono tenga 12 digitos
    };


    // --- Funcion de envio final (Supabase + EmailJS) ---

    const enviarSolicitud = async () => { 
        try { 
            // Preparamos los detalles para el correo.
            const detallesTexto = Object.entries(formData.detalles)
                .map(([key, value]) => { 
                    if (typeof value === 'boolean') return value ? `- ${key}` : null;
                    return `- ${key}: ${value}`;
                })
                .filter(item => item !== null)
                .join('\n');

            // Guardamos en Supabase
            const { error: dbError } = await supabase
                .from('solicitudes')
                .insert([{
                    nombre: formData.contacto.nombre,
                    email: formData.contacto.email,
                    tipo_proyecto: formData.tipo,
                    presupuesto: formData.presupuesto,
                    detalles: formData.detalles, // JSON completo
                    notas: formData.detalles.notas_adicionales || ''
                }]);
            
            if (dbError) throw dbError;

            // Enviar notificacion por EmailJS -> a un Administrador
            const templateParams = { 
                nombre : formData.contacto.nombre,
                email: formData.contacto.email,
                telefono: formData.contacto.telefono,
                tipo_proyecto: formData.tipo,
                presupuesto: formData.presupuesto,
                detalles: detallesTexto,
                notas: formData.detalles.notas_adicionales || 'Ninguna'
            };

            await emailjs.send( 
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // Mensaje de Exito, redirige a la pag de gracias
            navigate('/gracias');

        } catch (error) { 
            console.error("Error en el proceso de solicitud: ", error);
            alert('Hubo un error al procesar tu solicitud. Por favor, intente nuevamente.');
        } finally { 
            setIsSending(false); // Liberamos el boton si hay error
        }

        /* 
            Flujo: 
                1. Convierte detalles en un texto legible.
                2. Inserta registro en supabase.
                3. Envía email de notificación.
                4. Redirige a página de gracias.
        */
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
                                icon={<ShoppingCart size={32} />}
                                title="E-commerce" 
                                desc="Tienda online con carrito, pagos y gestión de productos." 
                                isSelected={formData.tipo === 'ecommerce'}
                                onClick={() => handleSeleccionarTipo('ecommerce')} 
                            />
                            <FormCard 
                                icon={<FileText size={32} />}
                                title="Landing Page" 
                                desc="Página de aterrizaje para campañas o presentación de servicios." 
                                isSelected={formData.tipo === 'landing'}
                                onClick={() => handleSeleccionarTipo('landing')} 
                            />
                            <FormCard 
                                icon={<BookOpen size={32} />}
                                title="Blog" 
                                desc="Sitio web con sistema de publicaciones y contenido editorial." 
                                isSelected={formData.tipo === 'blog'}
                                onClick={() => handleSeleccionarTipo('blog')} 
                            />
                            <FormCard 
                                icon={<Building2 size={32} />}
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
                            <button className="btn-black" disabled={!esPaso2Valido()} onClick={() => setStep(3)}>Continuar</button>
                        </div>

                        {/* Nota de validación */}
                        {!esPaso2Valido() && ( 
                            <p style={{ color: '#ff4d4d', fontSize: '17px', marginTop: '10px' }}>
                                 * Por favor, responde todas las secciones para habilitar el siguiente paso. *
                            </p>
                        )}
                    </div>
                )}

                {step === 3 && ( 
                    <div className="step-container">
                        <h3>¿Qué alcance tiene tu inversión?</h3>

                        {/* Usamos el mismo grid para mantener la simetria */}
                        <div className="form-grid">
                            <FormCard
                                icon={<Sprout size={32} />}
                                title="Esencial"
                                desc="Funciones básicas para comenzar a tener presencia online."
                                isSelected={ formData.presupuesto === 'esencial' }
                                onClick={ () => handleSeleccionarPresupuesto('esencial') }
                            />

                            <FormCard
                                icon={<Rocket size={32} />}
                                title="Crecimiento"
                                desc="Para negocios que necesiten escalar y automatizar procesos."
                                isSelected={ formData.presupuesto === 'crecimiento' }
                                onClick={ () => handleSeleccionarPresupuesto('crecimiento') }
                            />

                            <FormCard
                                icon={<Puzzle size={32} />}
                                title="Corporativo"
                                desc="Sistemas complejos con integraciones de alto rendimiento."
                                isSelected={ formData.presupuesto === 'corporativo' }
                                onClick={ () => handleSeleccionarPresupuesto('corporativo') }
                            />

                            <FormCard
                                icon={<Hammer size={32} />}
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
                                {isSending ? 'Enviando...' : 'Enviar Solicitud'}
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
    /* 
        Flujo de pasos: 
            1. Selecciona un tipo de proyecto -> habilita "Continuar".
            2. Responde preguntas especificas -> valida respuestas para habilitar "Continuar".
            3. Elige un rango de presupuesto -> puede agregar notas adicionales.
            4. Ingresa los datos de contacto -> valida formato de email/telefono.
            5. Envio: Guarda en BD + Envia email -> Redirige a página de gracias.
    */
};

const FormCard = ({ icon, title, desc, onClick, isSelected }) => ( 
    <div className={`form-card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <div className="form-icon-box">
            {icon}
        </div>
        <div className="form-card-info">
            <h4>{title}</h4>
            {desc && <p>{desc}</p>}
        </div>
    </div>

    // Componente de icono, aplica clase selected si corresponde, funcion onClick al contenedor
);

export default Solicitud;
import React, { useEffect, useState } from 'react';
import '../css/Home.css';

const Home = () => { 
    
    // Estado
    const [ selected, setSelected ] = useState(null); // Guarda la opcion seleccionada. - setSelected es para actualizar.

    return ( 
        <div className="fluxa-page">
            <header>
                <span className="hero-badge">Creamos tu experiencia digital</span>
                <h1 className="hero-title">
                    Solicita tu proyecto web de forma inteligente. Nuestro sistema entiende tus necesidades antes de que hablemos, para ofrecerle la mejor propuesta personalizada.
                </h1>
                <button className="btn-black">
                    Comenzar solicitud
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </button>
            </header>

            <section className="features-grid">
                <div className="feature-card">
                    <div className="icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <h3>Proceso Rápido</h3>
                    <p>Completa el formulario en menos de 5 minutos y recibe una respuesta en 24 horas.</p>
                </div>

                <div className="feature-card">
                    <div className="icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h3>Propuestas Personalizadas</h3>
                    <p>Cada cotización está adaptada a tus necesidades específicas y presupuesto.</p>
                </div>

                <div className="feature-card">
                    <div className="icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    </div>
                    <h3>Transparencia Total</h3>
                    <p>Conoce los plazos y coste desde el inicio, sin sorpresas.</p>
                </div>
            </section>

            <section className="projects-panel">
                <h2>¿Qué tipo de proyectos desarrollamos?</h2>
                <div className="projects-grid">
                    <ProyectOption
                        title="E-commerce"
                        desc=" Tiendas online completas con pasarelas de pago seguras."
                        onClick= { () => setSelected('ecommerce') }
                    />

                    <ProyectOption
                        title="Landing Pages"
                        desc=" Páginas de aterrizaje optimizadas para conversión."
                        onClick= { () => setSelected('landing') }
                    />

                    <ProyectOption
                        title="Blogs"
                        desc=" Plataformas de contenido dinámico con gestión editorial."
                        onClick= { () => setSelected('blog') }
                    />

                    <ProyectOption
                        title="Sistemas Corporativos"
                        desc=" Aplicaciones empresariales a medida para optimizar procesos."
                        onClick= { () => setSelected('corporate') }
                    />
                </div>
            </section>
            <footer className="cta-section">
                <h3>¿Listo para comenzar?</h3>
                <p>Nuestro formulario inteligente se adapta a tus respuestas para entender lo que necesitas.</p>
                <button className="btn-black">Iniciar mi solicitud</button>
            </footer>
        </div>
    );
};

// SubComponente para las opciones del checkMark SVG
const ProyectOption = ( { title, desc, onClick}) => {
    return (
        <div className="project-item" onClick={onClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginTop: '2px'}}><path d="M20 6L9 17l-5-5"/></svg>
            <div className="project-info">
                <h4>{title}</h4>
                <p>{desc}</p>
            </div>
        </div>
    );
};

export default Home;
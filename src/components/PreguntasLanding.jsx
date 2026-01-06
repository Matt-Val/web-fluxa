import React from 'react';

export const PreguntasLanding = ( { onChange, valores } ) => { 

    // Maneja los radio buttons 
    const handleChange = (e) => { 
        const { name, value } = e.target;
        onChange(name, value);
    };

    // Maneja los checkboxes
    const handleCheckbox = (categoria, item) => { 
        const listaActual = valores[categoria] || [];
        const nuevaLista = listaActual.includes(item)
            ? listaActual.filter(i => i !== item)
            : [...listaActual, item];
        onChange(categoria, nuevaLista);
    };

    return ( 
        <div className="preguntas-contenedor">
            {/* 1. Preguntas sobre el tipo de Landing */}
            <div className="pregunta-bloque">
                <h4>¿Qué secciones necesitas?</h4>
                <div className="opciones-grid">
                    {[ 
                        'Hero/Banner principal',
                        'Formulario de contacto',
                        'Testimonios',
                        'Galería de productos/servicios',
                        'FAQ', 
                        'Integración con redes sociales'
                    ].map(seccion => ( 
                        <label key={seccion} className="'seleccion-item">
                            <input 
                                type="checkbox"
                                checked={(valores.secciones || []).includes(seccion)}
                                onChange={() => handleCheckbox('secciones', seccion)}
                                />
                                <span>{seccion}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 2. Preguntas sobre Interacciones */}
            
            <div className="pregunta-bloque">
                <h4>¿Qué tipo de interacciones necesitas?</h4>
                <div className="opciones-grid">
                    {[
                        'Animaciones y efectos',
                        'Videos',
                        'Popup/Modal',
                        'Chat en vivo'
                    ].map(inter => ( 
                        <label key={inter} className="seleccion-item">
                            <input 
                                type="checkbox" 
                                checked={(valores.interacciones || []).includes(inter)}
                                onChange={() => handleCheckbox('interacciones', inter)}
                            />
                            <span>{inter}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 3. Preguntas sobre Disenio */}
            
            <div className="pregunta-bloque">
                <h4>¿Ya tienes un diseño definido?</h4>
                <div className="opciones-columna">
                    {[ 
                        { id: 'ok', txt: 'Sí, tengo diseños completos' },
                        { id: 'ref', txt: 'Tengo referencias' },
                        { id: 'cero', txt: 'Necesito diseño desde cero' }
                    ].map(d => ( 
                        <label key={d.id} className="seleccion-item">
                            <input 
                                type="radio"
                                name="diseno"
                                value={d.txt}
                                checked={valores.diseno === d.txt}
                                onChange={handleChange} 
                            />
                            <span>{d.txt}</span>
                        </label>
                    ))}
                </div>
            </div>



        </div>
    )
}
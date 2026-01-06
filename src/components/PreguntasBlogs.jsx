import React from 'react';

export const PreguntasBlog = ( { onChange, valores } ) => { 


    // Maneja los radio buttons
    const handleChange = (e) => { 
        const { name, value } = e.target;
        onChange(name, value); 
    };

    const handleCheckbox = (item) => { 
        const listaActual = valores.funcionalidades || [];
        const nuevaLista = listaActual.includes(item)
            ? listaActual.filter(i => i !== item)
            : [...listaActual, item];
        onChange('funcionalidades', nuevaLista);
    }

    return (
        <div className="preguntas-contenedor">
            {/* 1. Pregunta sobre Cantidad de autores */}
            <div className="pregunta-bloque">
                <h4>¿Cuántos autores publicarán contenido?</h4>
                <div className="opciones-columna">
                    {[
                        'Solo yo',
                        '2-5 autores',
                        'Más de 5 autores'
                    ].map(opt => ( 
                        <label key={opt} className="seleccion-item">
                            <input 
                                type="radio"
                                name="autores"
                                value={opt}
                                checked={valores.autores === opt}
                                onChange={handleChange} 
                            />
                            <span>{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 2. Pregunta sobre Funcionalidades adicionales */}
            <div className="pregunta-bloque">
                <h4>¿Qué funcionalidades necesitas?</h4>
                <div className="opciones-grid">
                    {[ 
                        'Sistema de comentarios',
                        'Newsletter/Suscripciones',
                        'Categorías y etiquetas',
                        'Búsqueda avanzada',
                        'Sistema de usuarios',
                        'Monetización/Publicidad'
                    ].map(func => ( 
                        <label key={func} className="seleccion-item">
                            <input 
                                type="checkbox"
                                checked={(valores.funcionalidades || []).includes(func)}
                                onChange={() => handleCheckbox(func)} 
                            />
                            <span>{func}</span>
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
    );
};
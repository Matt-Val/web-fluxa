import React from 'react';

export const PreguntasEcommerce = ( { onChange, valores } )=> { 

    //  Cambios simples (Radio Buttons)
    const handleChange= (e) => { 
        const { name, value } = e.target;
        onChange(name, value);
    };

    // Lista de CheckBoxes
    const handleCheckbox = (funcionalidad) => { 
        const listaActual = valores.funcionalidades || [];
        const nuevaLista = listaActual.includes(funcionalidad)
            ? listaActual.filter(item => item !== funcionalidad)
            : [...listaActual, funcionalidad];
        onChange('funcionalidades', nuevaLista);
    };

    return ( 
        <div className="preguntas-contenedor">
            {/* 1. Preguntas de Cantidad de productos */}
            <div className="pregunta-bloque">
                <h4>¿Cuántos productos aproximadamente tendrás?</h4>
                <div className="opciones-columna">
                    {[
                        '1-50', 
                        '51-200', 
                        '201-500', 
                        'Más de 500'].map(opt => (
                            <label key={opt} className="seleccion-item">
                                <input type="radio" name="productos" value={opt} 
                                    checked={valores.productos === opt} onChange={handleChange} />
                                <span>{opt}</span>
                            </label>
                        ))}
                </div>
            </div>

            {/* 2. Preguntas sobre Funcionalidades */}
            <div className="pregunta-bloque">
                <h4>¿Qué funcionalidades necesitas?</h4>
                <div className="opciones-grid">
                    {[
                        'Pasarela de pagos', 
                        'Gestión de inventario', 
                        'Sistema de envíos',
                        'Cupones y descuentos', 
                        'Panel de administración', 
                        'Integración con CRM'
                    ].map(func => (                    
                        <label key={func} className="seleccion-item">
                            <input type="checkbox" checked={(valores.funcionalidades || []).includes(func)} 
                                    onChange={() => handleCheckbox(func) } />
                            <span>{func}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 3. Preguntas de Diseño */}
            <div className="pregunta-bloque">
                    <h4>¿Ya tienes un diseño definido?</h4>
                    <div className="opciones-columna">
                        {[
                            { id: 'ok', txt: 'Sí, tengo diseños completos' },
                            { id: 'ref', txt: 'Tengo referencias' },
                            { id: 'cero', txt: 'Necesito diseño desde cero' }
                        ].map(d=> ( 
                            <label key={d.id} className="seleccion-item">
                                <input type="radio" name="diseno" value={d.txt} 
                                        checked={valores.diseno === d.txt} onChange={handleChange} />
                                <span>{d.txt}</span>
                            </label>
                        ))}
                    </div>
            </div>
        </div>
    );
};
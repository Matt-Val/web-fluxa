import React from 'react';

export const PreguntasCorporate = ( { onChange, valores } ) => { 

    // Maneja los Radio buttons (Tipo de sistema y Usuarios)
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    // Maneja los Checkboxes (Funcionalidades)
    const handleCheckbox = (item) => {
        const listaActual = valores.funcionalidades || [];
        const nuevaLista = listaActual.includes(item)
            ? listaActual.filter(i => i !== item)
            : [...listaActual, item];
        onChange('funcionalidades', nuevaLista);
    };

    return ( 
        <div className="preguntas-contenedor">
            {/* 1. Preguntas sobre Tipo de sistema */}
            <div className="pregunta-bloque">
                <h4>¿Qué tipo de sistema necesitas?</h4>
                <div className="opciones-grid">
                    {[ 
                        'CRM (Gestión de clientes)',
                        'ERP (Gestión empresarial)',
                        'Dashboard/Panel de control',
                        'Sistema personalizado'
                    ].map(opt => ( 
                        <label key={opt} className="seleccion-item">
                            <input 
                                type="radio"
                                name="tipoSistema"
                                value={opt}
                                checked={valores.tipoSistema === opt}
                                onChange={handleChange} 
                            />
                            <span>{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 2. Preguntas sobre Cantidad de Usuarios */}
            <div className="pregunta-bloque">
                    <h4>¿Cuántos usuarios utilizarán el sistema?</h4>
                    <div className="opciones-columna">
                        {[ 
                            '1-10',
                            '11-50',
                            '51-200',
                            'Más de 200'
                        ].map(opt => ( 
                            <label key={opt} className="seleccion-item">
                                <input 
                                    type="radio"
                                    name="usuarios"
                                    value={opt}
                                    checked={valores.usuarios === opt}
                                    onChange={handleChange} 
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
            </div>

            {/* 3. Preguntas sobre Funcionalidades */}

            <div className="pregunta-bloque">
                <h4>¿Qué funcionalidades necesitas?</h4>
                <div className="opciones-grid">
                    {[ 
                        'Autenticación de usuarios',
                        'Diferentes roles y permisos',
                        'Reportes y exportación de datos',
                        'Integración con APIs externas',
                        'Base de datos compleja',
                        'Sistema de notificaciones'
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
        </div>
    );
};
document.addEventListener('DOMContentLoaded', function() {
    const components = [
        { id: 1, name: "Intel Core i7-12700K", type: "CPU", socket: "LGA1700", manufacturer: "Intel" },
        { id: 2, name: "AMD Ryzen 7 5800X", type: "CPU", socket: "AM4", manufacturer: "AMD" },
        { id: 3, name: "ASUS ROG Strix Z690-E", type: "Motherboard", socket: "LGA1700", manufacturer: "ASUS" },
        { id: 4, name: "MSI B550 TOMAHAWK", type: "Motherboard", socket: "AM4", manufacturer: "MSI" },
        { id: 5, name: "Corsair Vengeance LPX 16GB", type: "RAM", speed: "DDR4-3200", manufacturer: "Corsair" },
    ];
    const component1Select = document.getElementById('component1');
    const component2Select = document.getElementById('component2');
    const checkButton = document.getElementById('check-button');
    const resultsSection = document.getElementById('results');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const detailsSection = document.getElementById('details');
    const detailsList = document.getElementById('details-list');
    const recommendationsSection = document.getElementById('recommendations');
    const recommendationsContent = document.getElementById('recommendations-content');

    function populateSelectors() {
        components.forEach(component => {
            const option = document.createElement('option');
            option.value = component.id;
            option.textContent = `${component.name} (${component.type})`;
            
            component1Select.appendChild(option.cloneNode(true));
            component2Select.appendChild(option);
        });
    }
    function checkCompatibility() {
        const component1Id = component1Select.value;
        const component2Id = component2Select.value;
        
        if (!component1Id || !component2Id) {
            alert("Por favor selecciona dos componentes");
            return;
        }

        const comp1 = components.find(c => c.id == component1Id);
        const comp2 = components.find(c => c.id == component2Id);

        resultsSection.classList.remove('hidden');
        detailsSection.classList.remove('hidden');
        recommendationsSection.classList.remove('hidden');
        
        if (comp1.type === 'CPU' && comp2.type === 'Motherboard' || 
            comp1.type === 'Motherboard' && comp2.type === 'CPU') {
            
            const cpu = comp1.type === 'CPU' ? comp1 : comp2;
            const mobo = comp1.type === 'Motherboard' ? comp1 : comp2;
            
            if (cpu.socket === mobo.socket) {
                showResult(true, `El procesador ${cpu.name} es compatible con la placa madre ${mobo.name}`);
                
                detailsList.innerHTML = `
                    <li><strong>Socket del CPU:</strong> ${cpu.socket}</li>
                    <li><strong>Socket de la placa madre:</strong> ${mobo.socket}</li>
                    <li><strong>Fabricante:</strong> ${cpu.manufacturer}</li>
                `;
                
                recommendationsContent.innerHTML = `
                    <p>Esta combinación es óptima. Asegúrate de:</p>
                    <ul>
                        <li>Actualizar la BIOS de la placa madre si es necesario</li>
                        <li>Verificar el soporte para la generación específica del procesador</li>
                    </ul>
                `;
            } else {
                showResult(false, `El procesador ${cpu.name} no es compatible con la placa madre ${mobo.name} por diferencia de sockets`);
                
                detailsList.innerHTML = `
                    <li><strong>Socket del CPU:</strong> ${cpu.socket}</li>
                    <li><strong>Socket de la placa madre:</strong> ${mobo.socket}</li>
                `;
                
                const compatibleMobos = components.filter(c => 
                    c.type === 'Motherboard' && c.socket === cpu.socket
                );
                
                if (compatibleMobos.length > 0) {
                    let recommendationsHTML = `
                        <p>Placas madre compatibles con tu procesador:</p>
                        <ul>
                    `;
                    
                    compatibleMobos.forEach(mobo => {
                        recommendationsHTML += `<li>${mobo.name} (${mobo.manufacturer})</li>`;
                    });
                    
                    recommendationsHTML += `</ul>`;
                    recommendationsContent.innerHTML = recommendationsHTML;
                } else {
                    recommendationsContent.innerHTML = `
                        <p>No encontramos placas madre compatibles con tu procesador en nuestra base de datos.</p>
                    `;
                }
            }
        }
        else {
            showResult(null, "No tenemos reglas específicas de compatibilidad para estos componentes");
            detailsSection.classList.add('hidden');
            recommendationsSection.classList.add('hidden');
        }
    }

    function showResult(isCompatible, message) {
        resultIcon.className = 'result-icon';
        resultsSection.className = 'compatibility-results';
        
        if (isCompatible === true) {
            resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            resultIcon.classList.add('success');
            resultsSection.classList.add('success');
            resultTitle.textContent = 'COMPATIBLES';
        } else if (isCompatible === false) {
            resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            resultIcon.classList.add('error');
            resultsSection.classList.add('error');
            resultTitle.textContent = 'INCOMPATIBLES';
        } else {
            resultIcon.innerHTML = '<i class="fas fa-question-circle"></i>';
            resultIcon.classList.add('unknown');
            resultsSection.classList.add('unknown');
            resultTitle.textContent = 'COMPATIBILIDAD DESCONOCIDA';
        }
        
        resultDescription.textContent = message;
    }

    // Inicializar
    populateSelectors();
    checkButton.addEventListener('click', checkCompatibility);
});
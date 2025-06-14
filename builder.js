document.addEventListener('DOMContentLoaded', function() {
    const componentsData = {
        CPU: [
            { id: 1, name: "Intel Core i7-12700K", price: 399.99, specs: { cores: 12, threads: 20, speed: "3.6GHz" } },
            { id: 2, name: "AMD Ryzen 7 5800X", price: 349.99, specs: { cores: 8, threads: 16, speed: "3.8GHz" } }
        ],
        Motherboard: [
            { id: 101, name: "ASUS ROG Strix Z690-E", price: 349.99, specs: { socket: "LGA1700", formFactor: "ATX" } },
            { id: 102, name: "MSI B550 TOMAHAWK", price: 179.99, specs: { socket: "AM4", formFactor: "ATX" } }
        ],
    };

    const currentBuild = {};
    let currentStep = 1;

    function initBuilder() {
        loadStep(currentStep);
        setupEventListeners();
    }


    function loadStep(step) {
        document.querySelectorAll('.step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });

        const currentStepEl = document.querySelector(`.step[data-step="${step}"]`);
        currentStepEl.classList.add('active');

        const category = currentStepEl.querySelector('h3').textContent.split('. ')[1].split(' (')[0];
        renderComponentOptions(category);
    }

    function renderComponentOptions(category) {
        const stepContent = document.querySelector(`.step[data-step="${currentStep}"] .step-content`);
        stepContent.innerHTML = '';

        if (!componentsData[category]) {
            stepContent.innerHTML = '<p>No hay componentes disponibles en esta categoría</p>';
            return;
        }

        const componentList = document.createElement('div');
        componentList.className = 'component-options';

        componentsData[category].forEach(component => {
            const componentEl = document.createElement('div');
            componentEl.className = 'component-option';
            componentEl.innerHTML = `
                <input type="radio" name="${category}" id="comp-${component.id}" value="${component.id}">
                <label for="comp-${component.id}">
                    <strong>${component.name}</strong>
                    <span>$${component.price}</span>
                </label>
            `;
            
            componentEl.querySelector('input').addEventListener('change', () => {
                selectComponent(category, component);
            });

            componentList.appendChild(componentEl);
        });

        stepContent.appendChild(componentList);
    }


    function selectComponent(category, component) {
        currentBuild[category] = component;
        updateBuildPreview();
        updateNavigationButtons();
    }

    function updateBuildPreview() {
        const specsList = document.getElementById('specs-list');
        specsList.innerHTML = '';

        for (const [category, component] of Object.entries(currentBuild)) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${category}:</strong> ${component.name} ($${component.price})`;
            specsList.appendChild(li);
        }


        document.getElementById('save-build').disabled = Object.keys(currentBuild).length < 3;
    }


    function updateNavigationButtons() {
        document.getElementById('prev-step').disabled = currentStep === 1;
        document.getElementById('next-step').disabled = !currentBuild[getCategoryFromStep(currentStep)];
    }

    function getCategoryFromStep(step) {
        return document.querySelector(`.step[data-step="${step}"] h3`).textContent.split('. ')[1].split(' (')[0];
    }


    function setupEventListeners() {
        document.getElementById('prev-step').addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                loadStep(currentStep);
                updateNavigationButtons();
            }
        });

        document.getElementById('next-step').addEventListener('click', () => {
            if (currentStep < document.querySelectorAll('.step').length) {
                currentStep++;
                loadStep(currentStep);
                updateNavigationButtons();
            }
        });

        document.getElementById('save-build').addEventListener('click', saveBuild);
    }
    function saveBuild() {
        console.log('Configuración guardada:', currentBuild);
        alert('¡Configuración guardada con éxito!');
    }
    initBuilder();
});
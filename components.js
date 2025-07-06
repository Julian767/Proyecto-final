document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const manufacturerSelect = document.getElementById('manufacturer');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const componentGrid = document.querySelector('.component-grid');

    const components = [
        { id: 1, name: "Intel Core i7-12700K", category: "CPU", price: 399.99, manufacturer: "Intel", image: "cpu-intel.jpg" },
        { id: 2, name: "AMD Ryzen 9 5900X", category: "CPU", price: 449.99, manufacturer: "AMD", image: "cpu-amd.jpg" },
        { id: 3, name: "NVIDIA RTX 3080", category: "GPU", price: 799.99, manufacturer: "NVIDIA", image: "gpu-nvidia.jpg" },
        { id: 4, name: "AMD RX 6800 XT", category: "GPU", price: 649.99, manufacturer: "AMD", image: "gpu-amd.jpg" },
    ];

    function init() {
        updatePriceDisplay();
        renderComponents(components);
        setupEventListeners();
    }

    function renderComponents(componentsToRender) {
        componentGrid.innerHTML = '';

        if (componentsToRender.length === 0) {
            componentGrid.innerHTML = '<p class="no-results">No se encontraron componentes con los filtros seleccionados</p>';
            return;
        }

        componentsToRender.forEach(component => {
            const componentCard = document.createElement('div');
            componentCard.className = 'component-card';
            componentCard.innerHTML = `
                <img src="images/${component.image}" alt="${component.name}">
                <div class="component-info">
                    <h3>${component.name}</h3>
                    <p class="manufacturer">${component.manufacturer}</p>
                    <p class="category">${component.category}</p>
                    <p class="price">$${component.price}</p>
                    <button class="btn-primary" data-id="${component.id}">Añadir al Ensamblador</button>
                </div>
            `;
            componentGrid.appendChild(componentCard);
        });
    }

    function filterComponents() {
        const category = categorySelect.value;
        const maxPrice = priceRange.value;
        const manufacturer = manufacturerSelect.value;

        const filtered = components.filter(component => {
            return (category === 'all' || component.category === category) &&
                (component.price <= maxPrice) &&
                (manufacturer === 'all' || component.manufacturer === manufacturer);
        });

        renderComponents(filtered);
    }

    function updatePriceDisplay() {
        priceValue.textContent = `$0 - $${priceRange.value}`;
    }

    function setupEventListeners() {
        priceRange.addEventListener('input', updatePriceDisplay);
        applyFiltersBtn.addEventListener('click', filterComponents);

        componentGrid.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-primary')) {
                const componentId = e.target.getAttribute('data-id');
                addToBuilder(componentId);
            }
        });
    }

    function addToBuilder(componentId) {
        const component = components.find(c => c.id == componentId);
        console.log('Añadiendo al ensamblador:', component);
        alert(`${component.name} añadido al ensamblador`);
    }

    init();
<<<<<<< HEAD
});
import { fetchComponents } from './api.js';

document.addEventListener('DOMContentLoaded', async function() {
    const components = await fetchComponents();
    renderComponents(components);});
=======
});
>>>>>>> 1f83f4d3a7e0aab2905ebad7e0a8b1be6722c6bb

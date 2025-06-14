document.addEventListener('DOMContentLoaded', function() {
    const guideData = {
        preparacion: {
            herramientas: {
                title: "Herramientas Necesarias",
                content: `
                    <p>Para ensamblar tu PC necesitarás las siguientes herramientas básicas:</p>
                    <ul class="tool-list">
                        <li><i class="fas fa-screwdriver"></i> <strong>Destornillador magnético:</strong> Preferiblemente de cabeza Phillips #2</li>
                        <li><i class="fas fa-hand-paper"></i> <strong>Pulsera antiestática:</strong> Para prevenir daños por electricidad estática</li>
                        <li><i class="fas fa-cut"></i> <strong>Alicates o pinzas:</strong> Para colocar tornillos en espacios reducidos</li>
                        <li><i class="fas fa-lightbulb"></i> <strong>Linterna o luz auxiliar:</strong> Para ver mejor en el interior del gabinete</li>
                    </ul>
                    <div class="step-tip">
                        <i class="fas fa-info-circle"></i>
                        <p>Organiza todas tus herramientas antes de comenzar para tenerlas a mano cuando las necesites.</p>
                    </div>
                `,
                media: {
                    image: "images/herramientas.jpg",
                    caption: "Kit básico de herramientas para ensamblaje"
                },
                difficulty: "beginner",
                time: "5 minutos (preparación)"
            },
            espacio: {
                title: "Preparación del Espacio",
                content: `
                    <p>Antes de comenzar el ensamblaje, prepara un espacio adecuado:</p>
                    <ul>
                        <li>Superficie limpia, plana y con suficiente espacio</li>
                        <li>Buena iluminación (natural o artificial)</li>
                        <li>Lejos de alfombras o superficies que generen estática</li>
                        <li>Con todos los componentes organizados y accesibles</li>
                    </ul>
                    <div class="step-tip">
                        <i class="fas fa-info-circle"></i>
                        <p>Usa una mesa amplia donde puedas organizar todos los componentes y herramientas.</p>
                    </div>
                `,
                media: {
                    image: "images/espacio-trabajo.jpg",
                    caption: "Espacio de trabajo organizado"
                },
                difficulty: "beginner",
                time: "10 minutos"
            },
        },
        ensamblaje: {
            cpu: {
                title: "Instalación del CPU",
                content: `
                    <p>Sigue estos pasos para instalar correctamente tu procesador:</p>
                    <ol>
                        <li>Localiza el socket en la placa madre (marca dorada o indicadores)</li>
                        <li>Levanta suavemente la palanca del socket</li>
                        <li>Alinea el procesador con las marcas (triángulo o muesca)</li>
                        <li>Colócalo suavemente sin forzar - no debe haber resistencia</li>
                        <li>Baja la palanca para fijar el procesador</li>
                    </ol>
                    <div class="step-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p><strong>Precaución:</strong> No toques los pines del procesador o del socket. Manipula solo por los bordes.</p>
                    </div>
                `,
                media: {
                    video: "https://www.youtube.com/embed/cpu-instalacion"
                },
                difficulty: "intermediate",
                time: "15 minutos"
            },
        }
    };

    const menuCategories = document.querySelectorAll('.menu-category');
    const menuItems = document.querySelectorAll('.menu-category li');
    const sectionTitle = document.getElementById('section-title');
    const contentBody = document.querySelector('.content-body');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const difficultySelect = document.getElementById('difficulty-select');

    let currentSection = 'herramientas';
    let currentCategory = 'preparacion';
    let currentDifficulty = 'beginner';

    function initGuide() {
        loadSection(currentCategory, currentSection);
        setupEventListeners();
    }

    function loadSection(category, section) {
        const sectionData = guideData[category][section];
        
        if (!sectionData) {
            contentBody.innerHTML = '<p>Sección no encontrada</p>';
            return;
        }

        sectionTitle.textContent = sectionData.title;

        const stepHtml = `
            <div class="guide-step active">
                <div class="step-header">
                    <span class="step-number">1</span>
                    <h3>${sectionData.title}</h3>
                </div>
                
                <div class="step-content">
                    <div class="step-text">
                        ${sectionData.content}
                    </div>
                    
                    <div class="step-media">
                        ${sectionData.media.image ? 
                            `<img src="${sectionData.media.image}" alt="${sectionData.media.caption}" class="step-image">
                            <div class="media-caption">${sectionData.media.caption}</div>` : ''}
                        ${sectionData.media.video ? 
                            `<div class="video-container">
                                <iframe src="${sectionData.media.video}" frameborder="0" allowfullscreen></iframe>
                            </div>` : ''}
                    </div>
                </div>
                
                <div class="step-footer">
                    <div class="step-difficulty">
                        <span class="difficulty-label">Dificultad:</span>
                        <span class="difficulty-badge ${sectionData.difficulty}">
                            ${sectionData.difficulty === 'beginner' ? 'Principiante' : 
                            sectionData.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                        </span>
                    </div>
                    <div class="step-time">
                        <i class="far fa-clock"></i>
                        <span>Tiempo estimado: ${sectionData.time}</span>
                    </div>
                </div>
            </div>
        `;

        contentBody.innerHTML = stepHtml;
        updateNavigation();
    }

    function updateNavigation() {
        prevBtn.disabled = currentSection === 'herramientas';
        
        const totalSteps = Object.keys(guideData[currentCategory]).length;
        const currentStep = Object.keys(guideData[currentCategory]).indexOf(currentSection) + 1;
        const progressPercent = (currentStep / totalSteps) * 100;
        
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `${currentStep} de ${totalSteps} pasos`;
    }

    function setupEventListeners() {
        menuCategories.forEach(category => {
            category.addEventListener('click', function() {
                const categoryName = this.getAttribute('data-category');
                this.classList.toggle('active');
                
                if (categoryName !== currentCategory) {
                    currentCategory = categoryName;
                    currentSection = Object.keys(guideData[currentCategory])[0];
                    loadSection(currentCategory, currentSection);
                }
            });
        });

        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const sectionName = this.getAttribute('data-section');
                
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                currentSection = sectionName;
                loadSection(currentCategory, currentSection);
            });
        });

        prevBtn.addEventListener('click', function() {
            const sections = Object.keys(guideData[currentCategory]);
            const currentIndex = sections.indexOf(currentSection);
            
            if (currentIndex > 0) {
                currentSection = sections[currentIndex - 1];
                loadSection(currentCategory, currentSection);
                
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-section') === currentSection) {
                        item.classList.add('active');
                    }
                });
            }
        });

        nextBtn.addEventListener('click', function() {
            const sections = Object.keys(guideData[currentCategory]);
            const currentIndex = sections.indexOf(currentSection);
            
            if (currentIndex < sections.length - 1) {
                currentSection = sections[currentIndex + 1];
                loadSection(currentCategory, currentSection);
                
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-section') === currentSection) {
                        item.classList.add('active');
                    }
                });
            }
        });

        difficultySelect.addEventListener('change', function() {
            currentDifficulty = this.value;
        });

        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                this.parentElement.classList.toggle('active');
            });
        });

        document.querySelector('.mobile-menu').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    initGuide();
});
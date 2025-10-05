const skillDataMap = {
            "frontend": { title: "Frontend (React/Next.js)", description: "Especialista en la creación de interfaces de usuario interactivas y rápidas. Dominio de **Next.js** para renderizado del lado del servidor (SSR) y estático (SSG), **React** con Hooks y Context API, y **Tailwind CSS** para un diseño responsivo de alta calidad." },
            "backend": { title: "Backend (Node/Express)", description: "Creación de APIs RESTful robustas y seguras. Experiencia con Node.js, Express.js y el manejo de middleware. Foco en la lógica de negocio limpia y en la optimización de las consultas a la base de datos." },
            "database": { title: "Bases de Datos (MongoDB)", description: "Diseño y optimización de esquemas NoSQL (MongoDB) y manejo de Mongoose para la interacción eficiente con datos. Capacidad para diseñar bases de datos relacionales (PostgreSQL/MySQL) según el proyecto." },
            "devops": { title: "DevOps & Cloud", description: "Configuración de pipelines de despliegue continuo (CI/CD). Uso de plataformas como Vercel y Netlify. Experiencia básica con contenedores (Docker) y servicios básicos en la nube (AWS/GCP)." }
        };

        const skillTitle = document.getElementById('skill-title');
        const skillDescription = document.getElementById('skill-description');
        const skillButtons = document.querySelectorAll('.skill-tag');

        skillButtons.forEach(button => {
            button.addEventListener('click', () => {
                const skillKey = button.getAttribute('data-skill');
                const data = skillDataMap[skillKey];

                skillTitle.innerHTML = data.title;
                skillDescription.innerHTML = data.description;
                
                document.querySelectorAll('.skill-tag').forEach(btn => btn.classList.remove('bg-[#E6F3F5]', 'text-[#00778B]', 'shadow-lg'));
                button.classList.add('bg-[#E6F3F5]', 'text-[#00778B]', 'shadow-lg');
            });
        });

        if (skillButtons.length > 0) {
            skillButtons[0].click(); 
        }

        const projectDataMap = {
            "1": { title: "Plataforma E-Commerce", perf: 98, acc: 95, best: 90, color: ['#00778B', '#FF6B6B', '#FFA500'] },
            "2": { title: "Dashboard Analítico (SPA)", perf: 90, acc: 98, best: 92, color: ['#00778B', '#FF6B6B', '#FFA500'] },
            "3": { title: "Blog Turístico (Vive RD)", perf: 94, acc: 91, best: 96, color: ['#00778B', '#FF6B6B', '#FFA500'] }
        };

        const chartTitle = document.getElementById('chart-title');
        const perfScore = document.getElementById('perf-score');
        const accScore = document.getElementById('acc-score');
        const bestScore = document.getElementById('best-score');
        const perfBar = document.getElementById('perf-bar');
        const accBar = document.getElementById('acc-bar');
        const bestBar = document.getElementById('best-bar');
        const projectCards = document.querySelectorAll('.project-card');

        let metricsChart = null;

        const updateChart = (data) => {
            const ctx = document.getElementById('projectMetricsChart').getContext('2d');
            
            if (metricsChart) {
                metricsChart.destroy();
            }

            metricsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Performance', 'Accessibility', 'Best Practices'],
                    datasets: [{
                        label: 'Puntuación (Mock)',
                        data: [data.perf, data.acc, data.best],
                        backgroundColor: data.color,
                        borderColor: data.color.map(c => c + 'A0'),
                        borderWidth: 1,
                        borderRadius: 5,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: { stepSize: 20 },
                            grid: { display: false }
                        },
                        x: {
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                             backgroundColor: '#3D352E',
                             titleFont: { size: 14, weight: 'bold' },
                             bodyFont: { size: 12 },
                             displayColors: true,
                        }
                    }
                }
            });
        };

        const updateMetrics = (data) => {
            chartTitle.textContent = `Métricas de Rendimiento (${data.title})`;
            perfScore.textContent = data.perf;
            accScore.textContent = data.acc;
            bestScore.textContent = data.best;

            perfBar.style.width = `${data.perf}%`;
            accBar.style.width = `${data.acc}%`;
            bestBar.style.width = `${data.best}%`;
            
            updateChart(data);
        };

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const data = projectDataMap[projectId];
                
                projectCards.forEach(c => c.classList.remove('border-4', 'border-[#FF6B6B]', 'ring-4', 'ring-[#FF6B6B]/20'));
                card.classList.add('border-4', 'border-[#FF6B6B]', 'ring-4', 'ring-[#FF6B6B]/20');

                updateMetrics(data);
            });
        });

        if (projectCards.length > 0) {
            projectCards[0].click();
        }

        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        const navLinks = document.querySelectorAll('.nav-link');

        const setActiveLink = () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100; 
                if (scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', setActiveLink);
        window.addEventListener('load', setActiveLink);

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        
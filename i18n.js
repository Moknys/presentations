// Internationalization configuration for the presentation
const i18n = {
    en: {
        // Navigation
        navigation: {
            previous: "← Previous",
            next: "Next →",
            slideIndicator: "Slide {current} of {total}",
            home: "Go to First Slide",
            homeAlready: "Already on first slide",
            fullscreen: "Enter Fullscreen",
            exitFullscreen: "Exit Fullscreen",
            navToggle: "⌨",
            navClose: "✕"
        },
        
        // Build indicator
        buildIndicator: "Build: {progress}",
        
        // Slide 1: Title
        slide1: {
            title: "Back to the Future",
            subtitle: "How 1960s Code Still Runs Your 2024 Life",
            description: "A journey through programming's greatest hits"
        },
        
        // Slide 2: Opening Hook
        slide2: {
            title: "Quick Confession",
            confession: "I'm old enough to remember when \"the cloud\" meant weather",
            plotTwist: "But here's the plot twist - every time you use an ATM, order an Uber, or pay for your overpriced coffee, you're interacting with code that's older than most of you",
            adventureTitle: "Today's Adventure:",
            adventure: "Meet the OG languages that are basically the Beatles of programming - massively influential and somehow still relevant"
        },
        
        // Slide 3: COBOL Introduction
        slide3: {
            title: "COBOL: The Language That Won't Quit",
            subtitle: "When Computers Were the Size of Your Apartment (1959)",
            hopperIdea: "Grace Hopper had a crazy idea: \"What if computer code looked like actual sentences instead of secret government codes?\"",
            beforeComment: "// Before COBOL: What even is this??",
            beforeCode: "MOV AX,1234; JMP 5678",
            afterComment: "// After COBOL: Actual readable English!",
            afterCode: "ADD CUSTOMER-AGE TO TOTAL-AGE.\nDISPLAY \"Welcome back, valued customer!\""
        },
        
        // Slide 4: COBOL Stats
        slide4: {
            title: "The Accidental World Domination",
            intro: "COBOL became so successful it accidentally became too important to replace",
            stat1: {
                number: "95%",
                label: "of ATM transactions\n(including your 3 AM McDonald's run)"
            },
            stat2: {
                number: "$3T",
                label: "processed daily\n(more than most countries' GDP)"
            },
            stat3: {
                number: "220B",
                label: "lines of code still running\n(stack would reach the moon)"
            },
            y2k: "Y2K Flashback: We weren't scared of the world ending - just our COBOL systems hiccupping!"
        },
        
        // Slide 5: COBOL Modern Relevance
        slide5: {
            title: "Why COBOL is the Ultimate Flex",
            jobSecurity: {
                title: "Job Security Level: Legendary",
                description: "COBOL programmers are basically digital unicorns"
            },
            reliability: {
                title: "Reliability Record: Better uptime",
                description: "Than most modern apps"
            },
            irony: {
                title: "The Irony: While we debate React vs Vue",
                description: "COBOL quietly processes your student loan payments"
            },
            quote: "The language that refuses to die keeps your financial life alive"
        },
        
        // Slide 6: Pascal Introduction
        slide6: {
            title: "Pascal: The Helicopter Parent of Programming",
            subtitle: "The Great Code Cleanup of 1970",
            situation: "The situation: 1960s programming was like texting without autocorrect - chaotic and full of mistakes",
            wirth: "Meet Niklaus Wirth: Swiss perfectionist who looked at messy code and said \"Nein! This will not do!\"",
            vibe: "The vibe: Pascal was like that friend who color-codes their closet and actually follows through"
        },
        
        // Slide 7: Pascal Code Example
        slide7: {
            title: "Pascal in Action",
            code: "program MillennialLife;\n\nvar\n  coffeeCount: integer;\n  rentMoney: real;\n  willSurvive: boolean;\n\nbegin\n  coffeeCount := 5;\n  rentMoney := 2000.00;\n  \n  if (coffeeCount > 3) and (rentMoney > 1500) then\n    willSurvive := false\n  else\n    willSurvive := true;\n    \n  writeln('Millennial survival status: ', willSurvive);\nend.",
            comment: "Clean, organized, and it actually tells you what it's doing!"
        },
        
        // Slide 8: Pascal's Impact
        slide8: {
            title: "The Educational Takeover",
            subtitle: "Pascal's Mission: Teach people to program properly",
            points: [
                "Plan before you code (revolutionary concept!)",
                "Make your intentions crystal clear",
                "Catch mistakes before they become disasters"
            ],
            impact: "The generational impact: If you learned programming in school, Pascal probably taught you to think like a programmer"
        },
        
        // Slide 9: Modern Languages Timeline
        slide9: {
            title: "The Glow-Up Story: Pascal's Famous Children",
            timeline: {
                "1970": "Pascal",
                "2009": "Go",
                "2014": "Swift"
            },
            swift: "Swift (2014): Apple took Pascal's \"safety first\" approach and made it Instagram-pretty",
            go: "Go (2009): Google's \"What if programming was simple again?\" - powers Netflix, Uber, and half the internet"
        },
        
        // Slide 10: The Great Circle
        slide10: {
            title: "The Time Loop: Why Everything Old is New Again",
            subtitle: "The Great Circle of Tech Life",
            timeline: [
                "1960s: \"Make it readable!\" (COBOL)",
                "1970s: \"Make it organized!\" (Pascal)",
                "1980s-90s: \"Make it flexible!\" (Chaos ensues)",
                "2000s: \"Wait, why does everything break?\" (Add types back)",
                "2010s: \"Let's make simple, reliable languages!\" (Rediscover Pascal's ideas)",
                "2020s: \"Why is our infrastructure so complex?\" (COBOL looking smug)"
            ]
        },
        
        // Slide 11: Daily Life Connection
        slide11: {
            title: "Your Daily Life, Powered by Time Travel",
            subtitle: "Morning Routine Reality Check:",
            routine: [
                "Check bank balance → Probably hitting COBOL somewhere",
                "Order coffee via app → Swift (Pascal's grandchild)",
                "Stream music at work → Go services (Pascal's philosophy)",
                "Pay for lunch → COBOL processing your card"
            ],
            quote: "Your cutting-edge lifestyle depends on ideas from when your parents were in elementary school"
        },
        
        // Slide 12: Closing
        slide12: {
            title: "The Real Lesson",
            twist: "The twist: We keep thinking we're inventing the future, but we're mostly rediscovering the past with better fonts",
            whyMatters: "Why This Matters:",
            points: [
                "Understanding these foundations helps you spot genuine innovation vs. rebranded old ideas",
                "While everyone's arguing about the latest framework, people who understand fundamentals are quietly building things that work"
            ],
            finalQuote: "In 2024, we're still solving the same basic problems as 1959 - how to make computers do useful things without breaking.\n\nWe just have better memes about it now."
        }
    },
    
    es: {
        // Navigation
        navigation: {
            previous: "← Anterior",
            next: "Siguiente →",
            slideIndicator: "Diapositiva {current} de {total}",
            home: "Ir a la Primera Diapositiva",
            homeAlready: "Ya estás en la primera diapositiva",
            fullscreen: "Pantalla Completa",
            exitFullscreen: "Salir de Pantalla Completa",
            navToggle: "⌨",
            navClose: "✕"
        },
        
        // Build indicator
        buildIndicator: "Construcción: {progress}",
        
        // Slide 1: Title
        slide1: {
            title: "Regreso al Futuro",
            subtitle: "Cómo el Código de los 1960s Sigue Ejecutando tu Vida del 2024",
            description: "Un viaje a través de los mayores éxitos de la programación"
        },
        
        // Slide 2: Opening Hook
        slide2: {
            title: "Confesión Rápida",
            confession: "Soy lo suficientemente mayor para recordar cuando \"la nube\" significaba clima",
            plotTwist: "Pero aquí está el giro inesperado - cada vez que usas un cajero automático, pides un Uber, o pagas por tu café sobrevalorado, estás interactuando con código que es más viejo que la mayoría de ustedes",
            adventureTitle: "La Aventura de Hoy:",
            adventure: "Conoce los lenguajes OG que son básicamente los Beatles de la programación - masivamente influyentes y de alguna manera aún relevantes"
        },
        
        // Slide 3: COBOL Introduction
        slide3: {
            title: "COBOL: El Lenguaje que No Quiere Morir",
            subtitle: "Cuando las Computadoras Eran del Tamaño de tu Apartamento (1959)",
            hopperIdea: "Grace Hopper tuvo una idea loca: \"¿Qué tal si el código de computadora se viera como oraciones reales en lugar de códigos secretos del gobierno?\"",
            beforeComment: "// Antes de COBOL: ¿Qué es esto siquiera??",
            beforeCode: "MOV AX,1234; JMP 5678",
            afterComment: "// Después de COBOL: ¡Inglés real y legible!",
            afterCode: "ADD CUSTOMER-AGE TO TOTAL-AGE.\nDISPLAY \"¡Bienvenido de vuelta, cliente valorado!\""
        },
        
        // Slide 4: COBOL Stats
        slide4: {
            title: "La Dominación Mundial Accidental",
            intro: "COBOL se volvió tan exitoso que accidentalmente se volvió demasiado importante para reemplazar",
            stat1: {
                number: "95%",
                label: "de transacciones ATM\n(incluyendo tu carrera de las 3 AM a McDonald's)"
            },
            stat2: {
                number: "$3T",
                label: "procesados diariamente\n(más que el PIB de la mayoría de países)"
            },
            stat3: {
                number: "220B",
                label: "líneas de código aún ejecutándose\n(la pila llegaría a la luna)"
            },
            y2k: "Flashback del Y2K: ¡No teníamos miedo de que el mundo terminara - solo de que nuestros sistemas COBOL tuvieran hipo!"
        },
        
        // Slide 5: COBOL Modern Relevance
        slide5: {
            title: "Por Qué COBOL es el Flex Definitivo",
            jobSecurity: {
                title: "Nivel de Seguridad Laboral: Legendario",
                description: "Los programadores COBOL son básicamente unicornios digitales"
            },
            reliability: {
                title: "Récord de Confiabilidad: Mejor tiempo activo",
                description: "Que la mayoría de apps modernas"
            },
            irony: {
                title: "La Ironía: Mientras debatimos React vs Vue",
                description: "COBOL procesa silenciosamente tus pagos de préstamos estudiantiles"
            },
            quote: "El lenguaje que se niega a morir mantiene viva tu vida financiera"
        },
        
        // Slide 6: Pascal Introduction
        slide6: {
            title: "Pascal: El Padre Helicóptero de la Programación",
            subtitle: "La Gran Limpieza de Código de 1970",
            situation: "La situación: La programación de los 1960s era como enviar mensajes sin autocorrección - caótica y llena de errores",
            wirth: "Conoce a Niklaus Wirth: Perfeccionista suizo que miró el código desordenado y dijo \"¡Nein! ¡Esto no servirá!\"",
            vibe: "La vibra: Pascal era como ese amigo que codifica por colores su armario y realmente lo cumple"
        },
        
        // Slide 7: Pascal Code Example
        slide7: {
            title: "Pascal en Acción",
            code: "program MillennialLife;\n\nvar\n  coffeeCount: integer;\n  rentMoney: real;\n  willSurvive: boolean;\n\nbegin\n  coffeeCount := 5;\n  rentMoney := 2000.00;\n  \n  if (coffeeCount > 3) and (rentMoney > 1500) then\n    willSurvive := false\n  else\n    willSurvive := true;\n    \n  writeln('Estado de supervivencia millennial: ', willSurvive);\nend.",
            comment: "¡Limpio, organizado, y realmente te dice qué está haciendo!"
        },
        
        // Slide 8: Pascal's Impact
        slide8: {
            title: "La Toma de Control Educativa",
            subtitle: "La Misión de Pascal: Enseñar a la gente a programar correctamente",
            points: [
                "Planifica antes de programar (¡concepto revolucionario!)",
                "Haz tus intenciones cristalinas",
                "Atrapa errores antes de que se conviertan en desastres"
            ],
            impact: "El impacto generacional: Si aprendiste programación en la escuela, Pascal probablemente te enseñó a pensar como programador"
        },
        
        // Slide 9: Modern Languages Timeline
        slide9: {
            title: "La Historia de Transformación: Los Hijos Famosos de Pascal",
            timeline: {
                "1970": "Pascal",
                "2009": "Go",
                "2014": "Swift"
            },
            swift: "Swift (2014): Apple tomó el enfoque \"seguridad primero\" de Pascal y lo hizo Instagram-bonito",
            go: "Go (2009): El \"¿Qué tal si la programación fuera simple otra vez?\" de Google - impulsa Netflix, Uber, y la mitad del internet"
        },
        
        // Slide 10: The Great Circle
        slide10: {
            title: "El Bucle Temporal: Por Qué Todo lo Viejo es Nuevo Otra Vez",
            subtitle: "El Gran Círculo de la Vida Tecnológica",
            timeline: [
                "1960s: \"¡Hazlo legible!\" (COBOL)",
                "1970s: \"¡Hazlo organizado!\" (Pascal)",
                "1980s-90s: \"¡Hazlo flexible!\" (El caos se desata)",
                "2000s: \"Espera, ¿por qué todo se rompe?\" (Agregar tipos de vuelta)",
                "2010s: \"¡Hagamos lenguajes simples y confiables!\" (Redescubrir las ideas de Pascal)",
                "2020s: \"¿Por qué nuestra infraestructura es tan compleja?\" (COBOL se ve presumido)"
            ]
        },
        
        // Slide 11: Daily Life Connection
        slide11: {
            title: "Tu Vida Diaria, Impulsada por Viajes en el Tiempo",
            subtitle: "Verificación de Realidad de la Rutina Matutina:",
            routine: [
                "Revisar saldo bancario → Probablemente golpeando COBOL en algún lugar",
                "Ordenar café vía app → Swift (el nieto de Pascal)",
                "Transmitir música en el trabajo → Servicios Go (la filosofía de Pascal)",
                "Pagar por el almuerzo → COBOL procesando tu tarjeta"
            ],
            quote: "Tu estilo de vida de vanguardia depende de ideas de cuando tus padres estaban en la escuela primaria"
        },
        
        // Slide 12: Closing
        slide12: {
            title: "La Lección Real",
            twist: "El giro: Seguimos pensando que estamos inventando el futuro, pero mayormente estamos redescubriendo el pasado con mejores fuentes",
            whyMatters: "Por Qué Esto Importa:",
            points: [
                "Entender estos fundamentos te ayuda a detectar innovación genuina vs. ideas viejas rebautizadas",
                "Mientras todos discuten sobre el último framework, la gente que entiende fundamentos está silenciosamente construyendo cosas que funcionan"
            ],
            finalQuote: "En 2024, seguimos resolviendo los mismos problemas básicos que en 1959 - cómo hacer que las computadoras hagan cosas útiles sin romperse.\n\nSolo tenemos mejores memes sobre eso ahora."
        }
    }
};

// Language management
let currentLanguage = localStorage.getItem('presentation-language') || 'en';

function setLanguage(lang) {
    if (i18n[lang]) {
        currentLanguage = lang;
        localStorage.setItem('presentation-language', lang);
        
        // If we have the new slide regeneration system, use it
        if (window.regenerateSlides) {
            window.regenerateSlides(lang);
        } else {
            // Fallback to old updateContent method
            updateContent();
        }
        
        updateLanguageSwitcher();
    }
}

function setLanguageOnly(lang) {
    if (i18n[lang]) {
        currentLanguage = lang;
        localStorage.setItem('presentation-language', lang);
        updateLanguageSwitcher();
    }
}

function getText(path) {
    const keys = path.split('.');
    let value = i18n[currentLanguage];
    
    for (const key of keys) {
        if (value && value[key] !== undefined) {
            value = value[key];
        } else {
            // Fallback to English if translation not found
            value = i18n.en;
            for (const fallbackKey of keys) {
                if (value && value[fallbackKey] !== undefined) {
                    value = value[fallbackKey];
                } else {
                    return path; // Return path if no translation found
                }
            }
        }
    }
    
    return value;
}

function updateContent() {
    // Update navigation - only if elements exist
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.textContent = getText('navigation.previous');
    if (nextBtn) nextBtn.textContent = getText('navigation.next');
    
    // Update slide indicator - only if updateNavigation function exists
    if (typeof updateNavigation === 'function') {
        updateNavigation();
    }
    
    // Update home button - only if element exists
    const homeButton = document.getElementById('home-button');
    if (homeButton) {
        if (typeof currentSlide !== 'undefined' && currentSlide === 0) {
            homeButton.title = getText('navigation.homeAlready');
        } else {
            homeButton.title = getText('navigation.home');
        }
    }
    
    // Update fullscreen button - only if element exists
    const fullscreenButton = document.getElementById('fullscreen-toggle');
    if (fullscreenButton) {
        if (typeof isFullscreen !== 'undefined' && isFullscreen) {
            fullscreenButton.title = getText('navigation.exitFullscreen');
        } else {
            fullscreenButton.title = getText('navigation.fullscreen');
        }
    }
    
    // Update build indicator - only if element exists
    const buildIndicator = document.getElementById('build-indicator');
    if (buildIndicator) {
        const progress = document.getElementById('build-progress');
        if (progress) {
            const progressText = progress.textContent;
            buildIndicator.innerHTML = getText('buildIndicator').replace('{progress}', progressText);
        }
    }
    
    // Update slide content
    updateSlideContent();
}

function updateSlideContent() {
    // Update all elements with data-i18n attributes
    const i18nElements = document.querySelectorAll('[data-i18n]');
    
    i18nElements.forEach(element => {
        const i18nKey = element.getAttribute('data-i18n');
        const translation = getText(i18nKey);
        
        if (translation && translation !== i18nKey) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translation;
            } else if (element.tagName === 'IMG') {
                element.alt = translation;
            } else {
                // For text content, preserve HTML structure if it contains spans
                const hasHTML = element.innerHTML.includes('<span') || element.innerHTML.includes('<br>');
                if (hasHTML) {
                    // Replace only the text content, preserving HTML structure
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = translation;
                    element.innerHTML = tempDiv.innerHTML;
                } else {
                    element.textContent = translation;
                }
            }
        }
    });
}



function updateLanguageSwitcher() {
    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        // Update active state
        const buttons = languageSwitcher.querySelectorAll('.nav-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === currentLanguage) {
                btn.classList.add('active');
            }
        });
    }
}

// Export for use in other files
window.i18n = {
    setLanguage,
    setLanguageOnly,
    getText,
    currentLanguage: () => currentLanguage,
    updateContent,
    updateSlideContent
}; 
// Slide definitions with internationalization support
const slideDefinitions = {
    slides: [
        {
            id: 1,
            type: 'title',
            header: {
                title: 'slide1.title',
                subtitle: 'slide1.subtitle'
            },
            content: {
                type: 'text',
                text: 'slide1.description'
            }
        },
        {
            id: 2,
            type: 'content',
            header: {
                title: 'slide2.title'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'text', text: 'slide2.confession', highlight: true },
                    { type: 'text', text: 'slide2.plotTwist' },
                    { type: 'heading', text: 'slide2.adventureTitle', level: 3 },
                    { type: 'text', text: 'slide2.adventure' }
                ]
            }
        },
        {
            id: 3,
            type: 'content',
            header: {
                title: 'slide3.title',
                subtitle: 'slide3.subtitle'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'text', text: 'slide3.hopperIdea' },
                    { type: 'code', 
                      beforeComment: 'slide3.beforeComment',
                      beforeCode: 'MOV AX,1234; JMP 5678',
                      afterComment: 'slide3.afterComment',
                      afterCode: 'ADD CUSTOMER-AGE TO TOTAL-AGE.\nDISPLAY "Welcome back, valued customer!"'
                    }
                ]
            }
        },
        {
            id: 4,
            type: 'stats',
            header: {
                title: 'slide4.title'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'text', text: 'slide4.intro' },
                    { type: 'stats', 
                      stats: [
                          { number: '95%', label: 'slide4.stat1.label' },
                          { number: '$3T', label: 'slide4.stat2.label' },
                          { number: '220B', label: 'slide4.stat3.label' }
                      ]
                    },
                    { type: 'text', text: 'slide4.y2k', highlight: 'Y2K Flashback:' }
                ]
            }
        },
        {
            id: 5,
            type: 'build',
            header: {
                title: 'slide5.title'
            },
            content: {
                type: 'build',
                buildItems: [
                    { title: 'slide5.jobSecurity.title', description: 'slide5.jobSecurity.description' },
                    { title: 'slide5.reliability.title', description: 'slide5.reliability.description' },
                    { title: 'slide5.irony.title', description: 'slide5.irony.description' },
                    { type: 'quote', text: 'slide5.quote' }
                ]
            }
        },
        {
            id: 6,
            type: 'content',
            header: {
                title: 'slide6.title',
                subtitle: 'slide6.subtitle'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'text', text: 'slide6.situation' },
                    { type: 'text', text: 'slide6.wirth' },
                    { type: 'text', text: 'slide6.vibe' }
                ]
            }
        },
        {
            id: 7,
            type: 'code',
            header: {
                title: 'slide7.title'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'code', code: 'slide7.code' },
                    { type: 'text', text: 'slide7.comment', style: 'comment' }
                ]
            }
        },
        {
            id: 8,
            type: 'content',
            header: {
                title: 'slide8.title',
                subtitle: 'slide8.subtitle'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'list', items: ['slide8.points.0', 'slide8.points.1', 'slide8.points.2'] },
                    { type: 'text', text: 'slide8.impact' }
                ]
            }
        },
        {
            id: 9,
            type: 'timeline',
            header: {
                title: 'slide9.title'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'timeline', 
                      items: [
                          { year: '1970', lang: 'Pascal' },
                          { year: '2009', lang: 'Go' },
                          { year: '2014', lang: 'Swift' }
                      ]
                    },
                    { type: 'list', items: ['slide9.swift', 'slide9.go'] }
                ]
            }
        },
        {
            id: 10,
            type: 'content',
            header: {
                title: 'slide10.title',
                subtitle: 'slide10.subtitle'
            },
            content: {
                type: 'list',
                items: [
                    'slide10.timeline.0', 'slide10.timeline.1', 'slide10.timeline.2',
                    'slide10.timeline.3', 'slide10.timeline.4', 'slide10.timeline.5'
                ]
            }
        },
        {
            id: 11,
            type: 'content',
            header: {
                title: 'slide11.title',
                subtitle: 'slide11.subtitle'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'list', items: [
                        'slide11.routine.0', 'slide11.routine.1', 
                        'slide11.routine.2', 'slide11.routine.3'
                    ]},
                    { type: 'quote', text: 'slide11.quote' }
                ]
            }
        },
        {
            id: 12,
            type: 'closing',
            header: {
                title: 'slide12.title'
            },
            content: {
                type: 'mixed',
                elements: [
                    { type: 'text', text: 'slide12.twist' },
                    { type: 'heading', text: 'slide12.whyMatters', level: 3 },
                    { type: 'list', items: ['slide12.points.0', 'slide12.points.1'] },
                    { type: 'quote', text: 'slide12.finalQuote', style: 'large center' }
                ]
            }
        }
    ]
};

// Slide rendering functions
function renderSlide(slideDef, language = 'en') {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide';
    slideDiv.setAttribute('data-slide-id', slideDef.id);
    
    // Render header
    const header = renderHeader(slideDef.header, language);
    slideDiv.appendChild(header);
    
    // Render content
    const content = renderContent(slideDef.content, language);
    slideDiv.appendChild(content);
    
    return slideDiv;
}

function renderHeader(headerDef, language) {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'slide-header';
    
    if (headerDef.title) {
        const title = document.createElement('h1');
        title.textContent = getText(headerDef.title, language);
        headerDiv.appendChild(title);
    }
    
    if (headerDef.subtitle) {
        const subtitle = document.createElement('h2');
        subtitle.textContent = getText(headerDef.subtitle, language);
        headerDiv.appendChild(subtitle);
    }
    
    return headerDiv;
}

function renderContent(contentDef, language) {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'slide-content';
    
    switch (contentDef.type) {
        case 'text':
            contentDiv.appendChild(renderTextElement(contentDef, language));
            break;
        case 'mixed':
            contentDef.elements.forEach(element => {
                contentDiv.appendChild(renderElement(element, language));
            });
            break;
        case 'build':
            contentDef.buildItems.forEach((item, index) => {
                const buildItem = renderBuildItem(item, language, index);
                contentDiv.appendChild(buildItem);
            });
            break;
        case 'list':
            const list = renderList(contentDef.items, language);
            contentDiv.appendChild(list);
            break;
        case 'timeline':
            const timeline = renderTimeline(contentDef.items, language);
            contentDiv.appendChild(timeline);
            break;
        case 'stats':
            const stats = renderStats(contentDef.stats, language);
            contentDiv.appendChild(stats);
            break;
        case 'code':
            const codeBlock = renderCodeBlock(contentDef, language);
            contentDiv.appendChild(codeBlock);
            break;
    }
    
    return contentDiv;
}

function renderElement(element, language) {
    switch (element.type) {
        case 'text':
            return renderTextElement(element, language);
        case 'heading':
            return renderHeading(element, language);
        case 'list':
            return renderList(element.items, language);
        case 'quote':
            return renderQuote(element, language);
        case 'code':
            return renderCodeBlock(element, language);
        default:
            return document.createTextNode('');
    }
}

function renderTextElement(element, language) {
    const p = document.createElement('p');
    if (element.highlight) {
        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'highlight';
        highlightSpan.textContent = element.highlight;
        p.appendChild(highlightSpan);
        p.appendChild(document.createTextNode(' '));
        p.appendChild(document.createTextNode(getText(element.text, language)));
    } else {
        p.textContent = getText(element.text, language);
    }
    return p;
}

function renderHeading(element, language) {
    const heading = document.createElement(`h${element.level || 3}`);
    heading.textContent = getText(element.text, language);
    return heading;
}

function renderList(items, language) {
    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = getText(item, language);
        ul.appendChild(li);
    });
    return ul;
}

function renderQuote(element, language) {
    const quoteDiv = document.createElement('div');
    quoteDiv.className = 'quote';
    if (element.style) {
        quoteDiv.className += ` ${element.style}`;
    }
    quoteDiv.textContent = getText(element.text, language);
    return quoteDiv;
}

function renderBuildItem(item, language, index) {
    const buildDiv = document.createElement('div');
    buildDiv.className = 'build-item';
    
    if (item.title) {
        const title = document.createElement('h3');
        title.innerHTML = getText(item.title, language);
        buildDiv.appendChild(title);
    }
    
    if (item.description) {
        const desc = document.createElement('p');
        desc.textContent = getText(item.description, language);
        buildDiv.appendChild(desc);
    }
    
    if (item.type === 'quote') {
        const quote = renderQuote(item, language);
        buildDiv.appendChild(quote);
    }
    
    return buildDiv;
}

function renderTimeline(items, language) {
    const timelineDiv = document.createElement('div');
    timelineDiv.className = 'timeline';
    
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'timeline-item';
        
        const yearDiv = document.createElement('div');
        yearDiv.className = 'timeline-year';
        yearDiv.textContent = item.year;
        
        const langDiv = document.createElement('div');
        langDiv.className = 'timeline-lang';
        langDiv.textContent = item.lang;
        
        itemDiv.appendChild(yearDiv);
        itemDiv.appendChild(langDiv);
        timelineDiv.appendChild(itemDiv);
    });
    
    return timelineDiv;
}

function renderStats(stats, language) {
    const statsDiv = document.createElement('div');
    statsDiv.className = 'stats-grid';
    
    stats.forEach(stat => {
        const statDiv = document.createElement('div');
        statDiv.className = 'stat-item';
        
        const numberSpan = document.createElement('span');
        numberSpan.className = 'stat-number';
        numberSpan.textContent = stat.number;
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'stat-label';
        labelDiv.innerHTML = getText(stat.label, language);
        
        statDiv.appendChild(numberSpan);
        statDiv.appendChild(labelDiv);
        statsDiv.appendChild(statDiv);
    });
    
    return statsDiv;
}

function renderCodeBlock(element, language) {
    const codeDiv = document.createElement('div');
    codeDiv.className = 'code-block';
    
    if (element.beforeComment) {
        const beforeComment = document.createElement('span');
        beforeComment.className = 'code-comment';
        beforeComment.textContent = getText(element.beforeComment, language);
        codeDiv.appendChild(beforeComment);
        codeDiv.appendChild(document.createElement('br'));
    }
    
    if (element.beforeCode) {
        const beforeCode = document.createElement('span');
        beforeCode.className = 'code-text';
        beforeCode.textContent = element.beforeCode;
        codeDiv.appendChild(beforeCode);
        codeDiv.appendChild(document.createElement('br'));
        codeDiv.appendChild(document.createElement('br'));
    }
    
    if (element.afterComment) {
        const afterComment = document.createElement('span');
        afterComment.className = 'code-comment';
        afterComment.textContent = getText(element.afterComment, language);
        codeDiv.appendChild(afterComment);
        codeDiv.appendChild(document.createElement('br'));
    }
    
    if (element.afterCode) {
        const afterCode = document.createElement('span');
        afterCode.className = 'code-text';
        afterCode.textContent = element.afterCode;
        codeDiv.appendChild(afterCode);
    }
    
    if (element.code) {
        codeDiv.innerHTML = getText(element.code, language);
    }
    
    return codeDiv;
}

// Helper function to get text (this would integrate with your i18n system)
function getText(key, language) {
    if (window.i18n && window.i18n.getText) {
        return window.i18n.getText(key);
    }
    return key; // Fallback
}

// Export for use in other files
window.slideDefinitions = slideDefinitions;
window.renderSlide = renderSlide; 
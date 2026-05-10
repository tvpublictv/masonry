export const ICONS = {
    title: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>`,
    author: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`,
    country: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    year: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
    material: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
    type: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>`, 
    category: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" /></svg>`, 
    info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>`,
    menu: `<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />`,
    close: `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />`,
    photographer: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
};

const filterLabels = [
    { label: "Author", key: "author" }, { label: "Country", key: "country" }, { label: "Year", key: "year" },
    { label: "Photographer", key: "photographer" }, { label: "Material", key: "material" },
    { label: "Type", key: "type" }, { label: "Topic", key: "category" } 
];

export const UI = {
    filterMainBtn: document.getElementById('filter-main-btn'),
    filterWrapper: document.getElementById('filter-wrapper'),
    filterOptionsStrip: document.getElementById('filter-options-strip'),
    projectSearchWrapper: document.getElementById('project-search-wrapper'),
    projectSearchInput: document.getElementById('project-search-input'),
    projectSearchDropdown: document.getElementById('project-search-dropdown'),
    externalLinkBtn: document.getElementById('external-link-btn'),
    projectMetadata: document.getElementById('project-metadata'),
    bottomNavContainer: document.getElementById('bottom-nav-container'),
    topUIContainer: document.getElementById('top-ui-container'),
    errorContainer: document.getElementById('error-container'),
    errorMessage: document.getElementById('error-message')
};

let subButtonWrappers = [];
export let isFilterOpen = false;
export let isHovering = false;
export let isTouchInteraction = false;
export let isFilterLocked = false;
let closeTimeout = null;
let isPinned = false;
const PROJECT_VIEW_BOTTOM_PADDING = 30;

export function createButtonHTML(text, filterKey, iconSVG, isBold = false) {
    const safeText = text.replace(/'/g, "\\'");
    const iconClass = "h-[max(12px,1.5vmin)] w-[max(12px,1.5vmin)] portrait:h-[max(13.2px,1.65vmin)] portrait:w-[max(13.2px,1.65vmin)] text-gray-700 mr-[0.8vmin] flex-shrink-0";
    const fontClass = isBold ? "font-bold" : "font-medium";
    const textSize = "text-[max(12px,1.5vmin)] portrait:text-[max(13.2px,1.65vmin)]";
    return `
        <div class="aesthetic-glass aesthetic-glass-hover px-[1vmin] py-[0.5vmin] portrait:px-[1.5vmin] portrait:py-[0.75vmin] flex items-center w-max max-w-[25vw] cursor-pointer hover:bg-white/50 transition-colors rounded-[0.5vmin] shadow-sm mb-[0.5vmin] mr-[0.5vmin]"
             onclick="window.applyFilter('${filterKey}', '${safeText}')">
            <div class="refraction-layer"></div>
            <div class="specular-layer"></div>
            <div class="glass-content-wrapper ${textSize} text-gray-900 ${fontClass} leading-snug truncate">
                <div class="${iconClass}">${iconSVG}</div>
                <span class="truncate">${text}</span>
            </div>
        </div>
    `;
}

export function createActiveFilterTag(text, filterKey) {
     const showIcon = filterKey !== 'title';
     const iconSVG = showIcon ? (ICONS[filterKey] || '') : '';
     const iconClass = "h-[max(12px,1.5vmin)] w-[max(12px,1.5vmin)] portrait:h-[max(13.2px,1.65vmin)] portrait:w-[max(13.2px,1.65vmin)] text-white mr-[0.8vmin] flex-shrink-0";
     const textSize = "text-[max(12px,1.5vmin)] portrait:text-[max(13.2px,1.65vmin)]";
     const closeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">${ICONS.close}</svg>`;
     const leftIconHTML = showIcon ? `<div class="${iconClass}">${iconSVG}</div>` : '';
     return `
        <div class="bg-black/80 backdrop-blur-md px-[1vmin] py-[0.5vmin] portrait:px-[1.5vmin] portrait:py-[0.75vmin] flex items-center w-max max-w-[25vw] cursor-pointer hover:bg-black/90 transition-colors rounded-[0.5vmin] shadow-sm mb-[0.5vmin] mr-[0.5vmin] ${textSize} text-white font-medium leading-snug truncate"
             onclick="window.clearFilter()">
            ${leftIconHTML}
            <span class="truncate">${text}</span>
            <div class="${iconClass} ml-2 !mr-0 !text-white/70 hover:!text-white flex-shrink-0">${closeSVG}</div>
        </div>
    `;
}

export function updateMainButtonState(lastActiveFilter) {
    const wrapper = UI.filterMainBtn.querySelector('.glass-content-wrapper');
    const svg = wrapper ? wrapper.querySelector('svg') : UI.filterMainBtn.querySelector('svg');
    
    if (lastActiveFilter) {
        UI.filterMainBtn.classList.remove('aesthetic-glass', 'aesthetic-glass-hover', 'text-gray-900', 'hover:bg-white/50');
        UI.filterMainBtn.classList.add('bg-black/80', 'text-white', 'hover:bg-black/90', 'rounded-full', 'overflow-hidden');
        const glassLayers = UI.filterMainBtn.querySelectorAll('.refraction-layer, .specular-layer');
        glassLayers.forEach(l => l.style.display = 'none');
        if(svg) svg.innerHTML = ICONS.close;
    } else {
        UI.filterMainBtn.classList.add('aesthetic-glass', 'aesthetic-glass-hover', 'text-gray-900', 'rounded-full', 'overflow-hidden');
        UI.filterMainBtn.classList.remove('bg-black/80', 'text-white', 'hover:bg-black/90');
        const glassLayers = UI.filterMainBtn.querySelectorAll('.refraction-layer, .specular-layer');
        glassLayers.forEach(l => l.style.display = 'block');
        UI.filterMainBtn.style.backgroundColor = '';
        UI.filterMainBtn.style.color = '';
        if(svg) svg.innerHTML = ICONS.menu;
    }
}

export function openFilterMenu() {
    if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
    if (isFilterOpen) return;
    isFilterOpen = true;
    UI.projectSearchWrapper.classList.add('search-collapsed');
    UI.filterOptionsStrip.classList.remove('strip-hidden');
    UI.filterOptionsStrip.classList.add('strip-visible');

    UI.filterMainBtn.classList.remove('aesthetic-glass', 'aesthetic-glass-hover', 'text-gray-900', 'hover:bg-white/50');
    const glassLayers = UI.filterMainBtn.querySelectorAll('.refraction-layer, .specular-layer');
    glassLayers.forEach(l => l.style.display = 'none');
    UI.filterMainBtn.classList.add('rounded-full', 'overflow-hidden');
    UI.filterMainBtn.style.backgroundColor = 'rgba(0,0,0,0.7)';
    UI.filterMainBtn.style.color = 'white';

    // Swap hamburger → magnifier
    const mainSvg = UI.filterMainBtn.querySelector('svg');
    if (mainSvg) mainSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />`;

    const subButtons = UI.filterOptionsStrip.querySelectorAll('.glass-base');
    subButtons.forEach((btn, idx) => { setTimeout(() => { btn.classList.add('glass-active'); }, idx * 30); });
}

export function closeFilterMenu(instant = false, lastActiveFilter = null) {
    const performClose = () => {
        const active = document.activeElement;
        const isInputFocused = active && (active === UI.projectSearchInput || (active.tagName === 'INPUT' && UI.filterOptionsStrip.contains(active)));
        if (isInputFocused) return;
        if (!isFilterOpen) return;
        isFilterOpen = false;
        isPinned = false;

        UI.projectSearchWrapper.classList.remove('search-collapsed');
        UI.filterOptionsStrip.classList.remove('strip-visible');
        UI.filterOptionsStrip.classList.add('strip-hidden');

        // Hide filter panel
        const fp = document.getElementById('filter-panel');
        if (fp) fp.classList.remove('panel-visible');

        if (!lastActiveFilter) {
            UI.filterMainBtn.style.backgroundColor = '';
            UI.filterMainBtn.style.color = '';
            UI.filterMainBtn.classList.add('aesthetic-glass', 'aesthetic-glass-hover', 'text-gray-900');
            const glassLayers = UI.filterMainBtn.querySelectorAll('.refraction-layer, .specular-layer');
            glassLayers.forEach(l => l.style.display = 'block');
            // Restore hamburger icon
            const mainSvg = UI.filterMainBtn.querySelector('svg');
            if (mainSvg) mainSvg.innerHTML = ICONS.menu;
        } else {
            UI.filterMainBtn.style.backgroundColor = '';
            UI.filterMainBtn.classList.add('bg-black/80', 'text-white', 'rounded-full');
        }

        subButtonWrappers.forEach(wrap => {
            const dd = wrap.querySelector('.dropdown-content');
            if (dd && dd.classList.contains('absolute')) { dd.classList.remove('!opacity-100', '!visible'); }
        });
    };

    if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
    if (instant) performClose();
    else closeTimeout = setTimeout(performClose, 400);
}

export function initProjectSearch(uniqueValuesProvider) {
    UI.projectSearchDropdown.innerHTML = '';

    const inner = document.createElement('div');
    inner.className = 'bg-white/90 backdrop-blur-md rounded-[1vmin] shadow-xl overflow-hidden';

    const grid = document.createElement('div');
    grid.className = 'filter-panel-grid';
    grid.setAttribute('data-lenis-prevent', '');

    uniqueValuesProvider('title').forEach(title => {
        const item = document.createElement('div');
        item.className = 'search-item filter-item px-[1.5vmin] py-[1vmin] text-gray-900 text-[max(12px,1.5vmin)] font-medium hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-0';
        item.innerText = title;
        item.title = title;
        item.onclick = () => {
            window.applyFilter('title', title);
            UI.projectSearchInput.value = '';
            UI.projectSearchDropdown.classList.remove('panel-visible');
        };
        grid.appendChild(item);
    });

    inner.appendChild(grid);
    UI.projectSearchDropdown.appendChild(inner);
}

export function initFilterUI(uniqueValuesProvider) {
    UI.filterOptionsStrip.innerHTML = '';
    subButtonWrappers.length = 0;

    const filterPanel = document.getElementById('filter-panel');
    let panelTimeout = null;

    const hidePanel = () => {
        panelTimeout = setTimeout(() => filterPanel.classList.remove('panel-visible'), 300);
    };
    const cancelHide = () => {
        if (panelTimeout) { clearTimeout(panelTimeout); panelTimeout = null; }
    };

    const showPanel = (key, label) => {
        cancelHide();
        const values = uniqueValuesProvider(key);

        const itemsHTML = values.map(val => {
            const safe = val.replace(/'/g, "\\'");
            const safeTitle = val.replace(/"/g, '&quot;');
            return `<div class="filter-item px-[1.5vmin] py-[1vmin] text-gray-900 text-[max(12px,1.5vmin)] font-medium hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                         title="${safeTitle}"
                         onclick="window.applyFilter('${key}', '${safe}')">${val}</div>`;
        }).join('');

        filterPanel.innerHTML = `
            <div class="bg-white/90 backdrop-blur-md rounded-[1vmin] shadow-xl overflow-hidden">
                <input type="text" placeholder="Search ${label}..."
                    class="w-full px-[1.5vmin] py-[1vmin] bg-transparent border-b border-gray-300 text-[max(12px,1.5vmin)] text-gray-900 focus:outline-none placeholder-gray-400 select-text"
                    onclick="event.stopPropagation()">
                <div class="filter-panel-grid" data-lenis-prevent>
                    ${itemsHTML}
                </div>
            </div>`;

        filterPanel.querySelector('input').oninput = (e) => {
            const q = e.target.value.toLowerCase();
            filterPanel.querySelectorAll('.filter-item').forEach(item => {
                item.style.display = item.textContent.trim().toLowerCase().includes(q) ? '' : 'none';
            });
        };

        filterPanel.classList.add('panel-visible');
    };

    // Strip-level hover: moving between buttons keeps panel open
    UI.filterOptionsStrip.addEventListener('mouseenter', cancelHide);
    UI.filterOptionsStrip.addEventListener('mouseleave', hidePanel);

    // Panel-level hover
    filterPanel.addEventListener('mouseenter', cancelHide);
    filterPanel.addEventListener('mouseleave', hidePanel);

    filterLabels.forEach(({ label, key }) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'cursor-pointer w-full h-full';

        const glassBtn = document.createElement('div');
        glassBtn.className = 'glass-base aesthetic-glass aesthetic-glass-hover h-full w-full rounded-full shadow-sm flex items-center justify-center transition-colors cursor-pointer';

        const iconClass = "h-[max(14px,1.8vmin)] w-[max(14px,1.8vmin)] text-gray-900";
        const refraction = document.createElement('div'); refraction.className = 'refraction-layer';
        const specular = document.createElement('div'); specular.className = 'specular-layer';
        const content = document.createElement('div');
        content.className = 'glass-content-wrapper flex items-center justify-center bg-transparent';
        content.innerHTML = `<div class="${iconClass}">${ICONS[key] || ''}</div>`;

        glassBtn.append(refraction, specular, content);

        // Click pins the strip open
        glassBtn.onclick = (e) => {
            e.stopPropagation();
            isPinned = true;
        };

        wrapper.addEventListener('mouseenter', () => { if (!isTouchInteraction) showPanel(key, label); });
        wrapper.appendChild(glassBtn);
        UI.filterOptionsStrip.appendChild(wrapper);
        subButtonWrappers.push(wrapper);
    });
}

export function showError(msg) {
    UI.errorContainer.classList.remove('hidden');
    UI.errorMessage.innerText = msg;
}

export function hideError() {
    UI.errorContainer.classList.add('hidden');
}

export function getAdjustedPadding(isProjectView) {
    let top = '0px';
    if (UI.topUIContainer) {
        const bottom = UI.topUIContainer.getBoundingClientRect().bottom;
        const gap = window.innerWidth * 0.015; 
        top = `${bottom + gap}px`;
    }

    const computedStyle = window.getComputedStyle(UI.bottomNavContainer);
    const bottomOffset = parseFloat(computedStyle.bottom); 
    
    let totalBottomPadding = isProjectView && !UI.externalLinkBtn.classList.contains('hidden') 
        ? PROJECT_VIEW_BOTTOM_PADDING 
        : bottomOffset + 20; 

    return { top, bottom: `calc(${totalBottomPadding}px + env(safe-area-inset-bottom))` };
}

export function setupUIEvents(getLastActiveFilter) {
    const filterPanel = document.getElementById('filter-panel');

    UI.filterWrapper.addEventListener('mouseenter', () => {
        if (isTouchInteraction || getLastActiveFilter()) return;
        isHovering = true;
        openFilterMenu();
    });

    UI.filterOptionsStrip.addEventListener('mouseenter', () => {
        if (isTouchInteraction) return;
        if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
        isHovering = true;
    });

    // Filter panel is part of the hover zone — cancel strip close when entering it
    if (filterPanel) {
        filterPanel.addEventListener('mouseenter', () => {
            if (isTouchInteraction) return;
            isHovering = true;
            if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
        });
        filterPanel.addEventListener('mouseleave', () => {
            isHovering = false;
            if (!isPinned) closeFilterMenu(false, getLastActiveFilter());
        });
    }

    UI.filterWrapper.addEventListener('mouseleave', () => {
        isHovering = false;
        if (!isPinned) closeFilterMenu(false, getLastActiveFilter());
    });
    UI.filterOptionsStrip.addEventListener('mouseleave', () => {
        isHovering = false;
        if (!isPinned) closeFilterMenu(false, getLastActiveFilter());
    });
    UI.filterWrapper.addEventListener('touchstart', () => { isTouchInteraction = true; }, { passive: true });

    UI.projectSearchInput.addEventListener('blur', () => {
        setTimeout(() => UI.projectSearchDropdown.classList.remove('panel-visible'), 200);
    });
    UI.projectSearchInput.addEventListener('focus', () => {
    if (isFilterOpen) closeFilterMenu(true, getLastActiveFilter());
    // Reset all items to visible and always show dropdown on focus
    UI.projectSearchDropdown.querySelectorAll('.search-item').forEach(item => item.style.display = 'block');
    UI.projectSearchDropdown.classList.add('panel-visible');
});

    UI.filterMainBtn.onclick = () => {
    if (getLastActiveFilter()) {
        window.clearFilter();
    } else if (isFilterOpen && isPinned) {
        // Already pinned → close and focus search
        isPinned = false;
        closeFilterMenu(true, getLastActiveFilter());
        setTimeout(() => UI.projectSearchInput.focus(), 150);
    } else if (isFilterOpen && !isPinned) {
        // Hover-opened (animation may still be running) → first click just pins it
        isPinned = true;
    } else {
        // Strip closed → open and pin
        isPinned = true;
        openFilterMenu();
    }
};

    UI.projectSearchInput.oninput = (e) => {
    const query = e.target.value.toLowerCase();
    const items = UI.projectSearchDropdown.querySelectorAll('.search-item');
    let visibleCount = 0;
    items.forEach(item => {
        if (query === '' || item.innerText.toLowerCase().includes(query)) {
            item.style.display = 'block'; visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    // Show as long as there are items (empty query = show all)
    if (visibleCount > 0) UI.projectSearchDropdown.classList.add('panel-visible');
    else UI.projectSearchDropdown.classList.remove('panel-visible');
};

    window.addEventListener('load', () => {
        setTimeout(() => {
            UI.filterMainBtn.classList.add('aesthetic-glass');
            UI.projectSearchInput.classList.add('glass-content-wrapper');
        }, 500);
    });
}
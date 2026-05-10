import { fetchGalleryData } from './api.js';
import { clearGridHTML, appendGridItem, appendGridItems, updateGridClasses, updateScrollTrigger, setupInfiniteScroll, createGridItem, setGridPadding, BATCH_SIZE } from './gallery.js';
import { UI, ICONS, createActiveFilterTag, createButtonHTML, updateMainButtonState, closeFilterMenu, initProjectSearch, initFilterUI, showError, hideError, getAdjustedPadding, setupUIEvents } from './ui.js';

console.log("Initializing Architecture Dex v0.8.61...");

// --- STATE ---
let galleryItems = []; 
let activeFilteredItems = []; 
let currentCount = 0;
let isLoading = false;
let isProjectView = false; 
window.lastActiveFilter = null; 
let mainGridScrollY = 0;
let storedMainGridCount = 0;

// --- LENIS SCROLL ---
const lenis = new Lenis({
    duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical',
    gestureDirection: 'vertical', smooth: true, mouseMultiplier: 0.8, smoothTouch: false, touchMultiplier: 1.5,
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// --- HELPERS ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getUniqueValues(key) {
    const values = new Set();
    galleryItems.forEach(item => {
        let rawValue = item[key];
        if (rawValue && rawValue !== 'Unknown' && rawValue !== '') {
            if (String(rawValue).includes(',')) {
                rawValue.split(',').forEach(part => {
                    const finalVal = part.trim().replace(/^"|"$/g, '');
                    if (finalVal) values.add(finalVal);
                });
            } else { values.add(rawValue); }
        }
    });
    const array = Array.from(values);
    if (key === 'year') return array.sort((a, b) => (!isNaN(parseInt(a)) && !isNaN(parseInt(b))) ? parseInt(b) - parseInt(a) : b.localeCompare(a));
    return array.sort((a, b) => a.localeCompare(b)); 
}

function adjustGridPadding() {
    const paddings = getAdjustedPadding(isProjectView);
    setGridPadding(paddings.top, paddings.bottom);
}

let resizeTimer;
const resizeObserver = new ResizeObserver(() => {
    cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(adjustGridPadding);
});
resizeObserver.observe(UI.topUIContainer);
window.addEventListener('resize', adjustGridPadding, { passive: true });
document.getElementById('top-inner-container').addEventListener('transitionend', adjustGridPadding);

function loadNextBatch() {
    if (isLoading || currentCount >= activeFilteredItems.length) return;
    isLoading = true;
    updateScrollTrigger(true, true);
    setTimeout(() => {
        const batchStart = currentCount;
        let nextBatch = activeFilteredItems.slice(currentCount, currentCount + BATCH_SIZE);
        let dataIndex = batchStart; 
        const elements = nextBatch.map(itemData => createGridItem(itemData, dataIndex++, isProjectView));
        appendGridItems(elements);
        currentCount += nextBatch.length;
        isLoading = false;
        updateScrollTrigger(currentCount < activeFilteredItems.length, false);
    }, 100);
}

// --- GLOBAL FILTER API ---
window.applyFilter = function(key, value) {
    console.log(`Filtering by ${key}: ${value}`);
    window.lastActiveFilter = { key: key, value: value };
    const enteringProjectView = (key === 'title');
    
    if (enteringProjectView) {
        mainGridScrollY = lenis.scroll;
        storedMainGridCount = currentCount; 
    }
    
    isProjectView = enteringProjectView;

    if (isProjectView) {
        activeFilteredItems = galleryItems.filter(item => item[key] === value).sort((a, b) => a.columnIndex - b.columnIndex);
    } else {
        activeFilteredItems = galleryItems.filter(item => {
            const itemValue = item[key];
            if (!itemValue) return false;
            const matches = ['author', 'photographer', 'type', 'material', 'category'].includes(key) 
                ? String(itemValue).includes(value) 
                : (key === 'title' ? itemValue === value : String(itemValue).includes(value));
            return matches && item.isCover; 
        });
    }

    updateGridClasses(isProjectView);

    // 1. Mostrar/Ocultar botón inferior de proyecto
    if (isProjectView) {
        const data = activeFilteredItems.length > 0 ? activeFilteredItems[0] : {};
        const link = data.projectUrl || data.url || data.link; 
        
        if (link && link !== '#') {
            UI.externalLinkBtn.href = link;
            UI.externalLinkBtn.classList.remove('hidden');
            UI.externalLinkBtn.style.display = 'flex'; 
        } else { 
            UI.externalLinkBtn.classList.add('hidden'); 
            UI.externalLinkBtn.style.display = 'none';
        }
        UI.bottomNavContainer.classList.replace('max-w-[60vw]', 'max-w-[70vw]');
        lenis.scrollTo(0, { immediate: true });
    } else {
        UI.externalLinkBtn.classList.add('hidden');
        UI.externalLinkBtn.style.display = 'none';
        UI.bottomNavContainer.classList.replace('max-w-[70vw]', 'max-w-[60vw]');
    }

    updateMainButtonState(window.lastActiveFilter);

    // 2. Generar Metadatos y Botones
    let metadataHTML = '';
    if (window.lastActiveFilter) { 
        metadataHTML += `<div class="flex flex-row flex-wrap items-start">${createActiveFilterTag(window.lastActiveFilter.value, window.lastActiveFilter.key)}</div>`;
    }

    if (isProjectView && activeFilteredItems.length > 0) {
        const data = activeFilteredItems[0]; 
        
        const addTags = (str, filterKey, icon, isBold=false) => {
            if(str && str !== 'Unknown') {
                String(str).split(',').map(s=>s.trim()).filter(s=>s).forEach(val => {
                    metadataHTML += `<div class="flex flex-row flex-wrap items-start">${createButtonHTML(val, filterKey, icon, isBold)}</div>`;
                });
            }
        };
        
        addTags(data.author, 'author', ICONS.author, true);
        if (data.country && data.country !== 'Unknown') metadataHTML += `<div class="flex flex-row flex-wrap items-start">${createButtonHTML(data.country, 'country', ICONS.country)}</div>`;
        if (data.year && data.year !== 'Unknown') metadataHTML += `<div class="flex flex-row flex-wrap items-start">${createButtonHTML(data.year, 'year', ICONS.year)}</div>`;
        addTags(data.photographer, 'photographer', ICONS.photographer);
        addTags(data.type, 'type', ICONS.type);
        addTags(data.material, 'material', ICONS.material);
        addTags(data.category, 'category', ICONS.category);
    }

    console.log("Datos del proyecto renderizado:", activeFilteredItems); 
    UI.projectMetadata.innerHTML = metadataHTML;

    if (metadataHTML !== '') {
        UI.projectMetadata.classList.remove('hidden');
        UI.projectMetadata.classList.add('fade-in-fast', 'flex');
    } else {
        UI.projectMetadata.classList.add('hidden');
        UI.projectMetadata.classList.remove('flex');
    }

    setTimeout(adjustGridPadding, 50);
    clearGridHTML();
    currentCount = 0;
    closeFilterMenu(true, window.lastActiveFilter); 
    
    UI.filterWrapper.style.display = 'block'; 
    UI.projectSearchWrapper.style.display = 'block'; 

    if (activeFilteredItems.length === 0) showError("No projects found for this filter.");
    else { hideError(); loadNextBatch(); }
};

window.clearFilter = function() {
    isProjectView = false;
    isLoading = false; 
    currentCount = 0;
    activeFilteredItems = galleryItems.filter(item => item.isCover);
    
    clearGridHTML();
    updateGridClasses(isProjectView);
    
    try {
        window.lastActiveFilter = null;
        updateMainButtonState(window.lastActiveFilter);
        UI.projectMetadata.classList.remove('flex');
        UI.projectMetadata.classList.add('hidden');
        UI.projectMetadata.innerHTML = '';

        UI.externalLinkBtn.classList.add('hidden');
        UI.externalLinkBtn.style.display = 'none'; 
        UI.bottomNavContainer.classList.replace('max-w-[70vw]', 'max-w-[60vw]');
        
        UI.filterWrapper.style.display = 'block'; 
        UI.projectSearchWrapper.style.display = 'block'; 
        hideError();
    } catch (e) { console.error("Error updating UI", e); }
    
    setTimeout(adjustGridPadding, 50);
    loadNextBatch();
    lenis.scrollTo(0, { immediate: true });
};

// --- INITIALIZATION ---
async function initGallery() {
    try {
        setupUIEvents(() => window.lastActiveFilter);
        galleryItems = await fetchGalleryData();
        activeFilteredItems = galleryItems.filter(item => item.isCover);
        
        initFilterUI(getUniqueValues);
        initProjectSearch(getUniqueValues);
        shuffleArray(galleryItems);
        
        activeFilteredItems = galleryItems.filter(item => item.isCover);
        
        if (galleryItems.length === 0) { showError("No valid URLs found."); return; }
        loadNextBatch();
        setupInfiniteScroll(loadNextBatch);
    } catch (error) { console.error(error); showError(error.message); }
}

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    if (e.key.length === 1) UI.projectSearchInput.focus();
});

initGallery();

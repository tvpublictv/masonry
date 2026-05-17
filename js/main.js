import { fetchGalleryData } from './api.js';
import { clearGridHTML, appendGridItems, updateGridClasses, updateScrollTrigger, setupInfiniteScroll, createGridItem, setGridPadding, BATCH_SIZE } from './gallery.js';
import { UI, ICONS, createActiveFilterTag, createButtonHTML, updateMainButtonState, closeFilterMenu, initProjectSearch, initFilterUI, showError, hideError, getAdjustedPadding, setupUIEvents, updateStripActiveStates } from './ui.js';

console.log("Initializing Architecture Dex v0.9.09...");

// --- STATE ---
let galleryItems = [];
let activeFilteredItems = [];
let currentCount = 0;
let isLoading = false;
let isProjectView = false;
window.activeFilters = []; // Array of {key, value} — replaces lastActiveFilter
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
    adjustDropdownPositions();
}

function adjustDropdownPositions() {
    const row = document.querySelector('#top-inner-container > div:first-child');
    if (!row) return;
    const offset = row.offsetTop + row.offsetHeight + 4;
    const fp = document.getElementById('filter-panel');
    const sd = document.getElementById('project-search-dropdown');
    if (fp) fp.style.top = `${offset}px`;
    if (sd) sd.style.top = `${offset}px`;
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
        const nextBatch = activeFilteredItems.slice(currentCount, currentCount + BATCH_SIZE);
        let dataIndex = batchStart;
        const elements = nextBatch.map(itemData => createGridItem(itemData, dataIndex++, isProjectView));
        appendGridItems(elements);
        currentCount += nextBatch.length;
        isLoading = false;
        updateScrollTrigger(currentCount < activeFilteredItems.length, false);
    }, 100);
}

// --- MULTI-FILTER MATCHING ---
const MULTI_VALUE_KEYS = ['author', 'photographer', 'type', 'material', 'category'];

function itemMatchesFilters(item, filters) {
    return filters.every(f => {
        const itemValue = item[f.key];
        if (!itemValue) return false;
        return MULTI_VALUE_KEYS.includes(f.key)
            ? String(itemValue).includes(f.value)
            : String(itemValue).includes(f.value);
    });
}

// Returns cover items that satisfy ALL active filters (AND logic)
function applyMultiFilterItems() {
    return galleryItems.filter(item => item.isCover && itemMatchesFilters(item, window.activeFilters));
}

// Returns unique values for `key` that still yield ≥1 result
// given every OTHER currently-active filter — used to populate dropdowns live.
function getAvailableValues(key) {
    const otherFilters = window.activeFilters.filter(f => f.key !== key);
    const baseItems = galleryItems.filter(item => {
        if (!item.isCover) return false;
        return otherFilters.length === 0 || itemMatchesFilters(item, otherFilters);
    });

    const values = new Set();
    baseItems.forEach(item => {
        let rawValue = item[key];
        if (rawValue && rawValue !== 'Unknown' && rawValue !== '') {
            if (String(rawValue).includes(',')) {
                rawValue.split(',').forEach(part => {
                    const v = part.trim().replace(/^"|"$/g, '');
                    if (v) values.add(v);
                });
            } else { values.add(rawValue); }
        }
    });

    const array = Array.from(values);
    if (key === 'year') return array.sort((a, b) =>
        (!isNaN(parseInt(a)) && !isNaN(parseInt(b))) ? parseInt(b) - parseInt(a) : b.localeCompare(a));
    return array.sort((a, b) => a.localeCompare(b));
}

// --- SHARED RENDER ---
// Called after any filter change to update metadata, button states and grid.
function renderActiveState() {
    updateGridClasses(isProjectView);

    let metadataHTML = '';

    // One removable tag per active filter
    window.activeFilters.forEach(f => {
        metadataHTML += `<div class="flex flex-row flex-wrap items-start">${createActiveFilterTag(f.value, f.key)}</div>`;
    });

    // Project-view metadata buttons (author, country, year, …)
    if (isProjectView && activeFilteredItems.length > 0) {
        const data = activeFilteredItems[0];
        const addTags = (str, filterKey, icon, isBold = false) => {
            if (str && str !== 'Unknown') {
                String(str).split(',').map(s => s.trim()).filter(s => s).forEach(val => {
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

    UI.projectMetadata.innerHTML = metadataHTML;
    if (metadataHTML !== '') {
        UI.projectMetadata.classList.remove('hidden');
        UI.projectMetadata.classList.add('fade-in-fast', 'flex');
    } else {
        UI.projectMetadata.classList.add('hidden');
        UI.projectMetadata.classList.remove('flex');
    }

    updateMainButtonState(window.activeFilters);
    updateStripActiveStates(window.activeFilters);
    setTimeout(adjustGridPadding, 50);

    clearGridHTML();
    currentCount = 0;
    if (activeFilteredItems.length === 0) showError("No projects found for this filter.");
    else { hideError(); loadNextBatch(); }
}

// --- GLOBAL FILTER API ---
window.applyFilter = function(key, value) {
    console.log(`Filtering by ${key}: ${value}`);
    const enteringProjectView = (key === 'title');

    if (enteringProjectView) {
        // Title / project view is exclusive — replaces all other filters
        mainGridScrollY = lenis.scroll;
        storedMainGridCount = currentCount;
        isProjectView = true;
        window.activeFilters = [{ key, value }];

        activeFilteredItems = galleryItems
            .filter(item => item[key] === value)
            .sort((a, b) => a.columnIndex - b.columnIndex);

        // External link button
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

        // Close strip for project view (title is the only active filter)
        closeFilterMenu(true, window.activeFilters);

    } else {
        // Multi-filter: toggle value for the given key
        // If we were in project view, drop the title filter first - we are leaving it.
        window.activeFilters = window.activeFilters.filter(f => f.key !== 'title');
        isProjectView = false;
        UI.externalLinkBtn.classList.add('hidden');
        UI.externalLinkBtn.style.display = 'none';
        UI.bottomNavContainer.classList.replace('max-w-[70vw]', 'max-w-[60vw]');

        const existingIdx = window.activeFilters.findIndex(f => f.key === key && f.value === value);
        if (existingIdx >= 0) {
            // Already active -> remove (toggle off)
            window.activeFilters.splice(existingIdx, 1);
        } else {
            // Replace any prior filter for the same key, then add the new one
            window.activeFilters = window.activeFilters.filter(f => f.key !== key);
            window.activeFilters.push({ key, value });
        }

        if (window.activeFilters.length === 0) {
            window.clearFilter();
            return;
        }

        activeFilteredItems = applyMultiFilterItems();

        // Close only the filter-panel dropdown; strip stays open
        const fp = document.getElementById('filter-panel');
        if (fp) fp.classList.remove('panel-visible');
    }

    console.log("Active filters:", window.activeFilters);
    UI.filterWrapper.style.display = 'block';
    UI.projectSearchWrapper.style.display = 'block';
    renderActiveState();
};

// Remove a single filter (called by each tag's X button)
window.removeFilter = function(key, value) {
    window.activeFilters = window.activeFilters.filter(f => !(f.key === key && f.value === value));

    if (window.activeFilters.length === 0) {
        window.clearFilter();
        return;
    }

    isProjectView = false;
    activeFilteredItems = applyMultiFilterItems();
    renderActiveState();
};

window.clearFilter = function() {
    isProjectView = false;
    isLoading = false;
    currentCount = 0;
    window.activeFilters = [];
    activeFilteredItems = galleryItems.filter(item => item.isCover);

    clearGridHTML();
    updateGridClasses(false);

    updateMainButtonState([]);
    updateStripActiveStates([]);
    UI.projectMetadata.classList.remove('flex');
    UI.projectMetadata.classList.add('hidden');
    UI.projectMetadata.innerHTML = '';
    UI.externalLinkBtn.classList.add('hidden');
    UI.externalLinkBtn.style.display = 'none';
    UI.bottomNavContainer.classList.replace('max-w-[70vw]', 'max-w-[60vw]');
    UI.filterWrapper.style.display = 'block';
    UI.projectSearchWrapper.style.display = 'block';

    closeFilterMenu(true, []);
    hideError();

    setTimeout(adjustGridPadding, 50);
    loadNextBatch();
    lenis.scrollTo(0, { immediate: true });
};

// --- INITIALIZATION ---
async function initGallery() {
    try {
        setupUIEvents(() => window.activeFilters);
        galleryItems = await fetchGalleryData();
        activeFilteredItems = galleryItems.filter(item => item.isCover);

        initFilterUI(getUniqueValues, getAvailableValues);
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

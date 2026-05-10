export const BATCH_SIZE = 18;
const galleryGrid = document.getElementById('gallery-grid');
const scrollTrigger = document.getElementById('scroll-trigger');

const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;
        if (target.classList.contains('scroll-item')) {
            entry.isIntersecting ? target.classList.add('is-visible') : target.classList.remove('is-visible');
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

export function createGridItem(itemData, index, isProjectView) {
    const anchor = document.createElement('div');
    anchor.className = isProjectView 
        ? 'w-full h-auto relative mb-[4vmin] scroll-item' 
        : 'flex flex-col gap-[0.5vmin] relative mb-[1vmin] scroll-item'; 

    if (index < BATCH_SIZE) anchor.style.transitionDelay = `${(index % 5) * 0.05}s`;

    const imgContainer = document.createElement('div');
    imgContainer.className = `w-full ${isProjectView ? 'h-auto' : 'aspect-square'} group overflow-hidden shadow-sm cursor-pointer relative bg-gray-200`;
    
    const img = document.createElement('img');
    img.src = itemData.url;
    img.className = isProjectView 
        ? `w-full h-auto block opacity-0 transition-all duration-700 pointer-events-none select-none`
        : `w-full h-full object-cover block transform transition-transform duration-[1050ms] group-hover:scale-110 pointer-events-none select-none opacity-0`; 
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = itemData.title;
    if (index < 6) img.fetchPriority = 'high';
    img.draggable = false;
    
    img.onload = () => {
        img.classList.remove('opacity-0');
        anchor.classList.add('loaded'); 
    };
    img.onerror = () => {
        console.warn(`Failed to load image for: ${itemData.title}`);
        img.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-medium';
        placeholder.innerText = 'No Image';
        imgContainer.appendChild(placeholder);
        anchor.classList.add('loaded'); 
    };

    imgContainer.appendChild(img);
    
    if (!isProjectView) {
        imgContainer.onclick = () => window.applyFilter('title', itemData.title);
    } else {
        imgContainer.onclick = null;
    }

    anchor.appendChild(imgContainer);

    if (!isProjectView) {
        const infoBlock = document.createElement('div');
        infoBlock.className = `flex flex-col gap-0.5 mt-[0.5vmin] cursor-pointer`; 
        
        const titleEl = document.createElement('div');
        titleEl.className = `text-gray-900 text-[max(10px,1.2vmin)] font-bold leading-tight gallery-item-title`;
        titleEl.innerText = itemData.title;

        const metaRow = document.createElement('div');
        metaRow.className = `flex flex-row justify-between items-start w-full text-gray-500 font-medium text-[max(10px,1.2vmin)] leading-none gallery-item-meta`;
        
        const authorEl = document.createElement('span');
        authorEl.innerText = itemData.author;
        
        const yearEl = document.createElement('span');
        yearEl.innerText = itemData.year;

        metaRow.appendChild(authorEl);
        metaRow.appendChild(yearEl);

        infoBlock.appendChild(titleEl);
        infoBlock.appendChild(metaRow);
        
        infoBlock.onclick = () => window.applyFilter('title', itemData.title);
        anchor.appendChild(infoBlock);
    }

    return anchor;
}

export function clearGridHTML() {
    galleryGrid.innerHTML = '';
}

export function appendGridItem(element) {
    galleryGrid.appendChild(element);
    itemObserver.observe(element);
}

export function appendGridItems(elements) {
    const fragment = document.createDocumentFragment();
    elements.forEach(el => fragment.appendChild(el));
    galleryGrid.appendChild(fragment);
    elements.forEach(el => itemObserver.observe(el));
}

export function updateGridClasses(isProjectView) {
    if (isProjectView) galleryGrid.classList.add('one-col-grid');
    else galleryGrid.classList.remove('one-col-grid');
}

export function updateScrollTrigger(show, isLoadingMore) {
    scrollTrigger.style.display = show ? 'block' : 'none';
    if (isLoadingMore) scrollTrigger.classList.remove('opacity-0');
    else scrollTrigger.classList.add('opacity-0');
}

export function setupInfiniteScroll(loadNextBatchCallback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) loadNextBatchCallback(); });
    }, { root: null, rootMargin: '50%', threshold: 0 });
    observer.observe(scrollTrigger);
}

export function setGridPadding(top, bottom) {
    galleryGrid.style.paddingTop = top;
    galleryGrid.style.paddingBottom = bottom;
}

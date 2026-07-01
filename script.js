/**
 * HOTEL GRAND HORIZON - CORE WEB UTILITIES ENGINE
 * Architecture: Object-Oriented State Controller Pipeline
 */

const HorizonApp = {
    state: {
        activeFilter: 'all',
        lightboxIndex: 0,
        cachedGalleryItems: []
    },

    init() {
        this.cacheGalleryDomFootprints();
        this.registerKeyboardHooks();
    },

    registerKeyboardHooks() {
        window.addEventListener('keydown', (e) => {
            const modal = document.getElementById('lightboxModal');
            if (!modal || modal.classList.contains('hidden')) return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowRight') this.paginateLightbox(1);
            if (e.key === 'ArrowLeft') this.paginateLightbox(-1);
        });
    },

    // Scans dynamically visible elements to prevent crossed category views during filtering
    cacheGalleryDomFootprints() {
        this.state.cachedGalleryItems = [];
        const activeItems = document.querySelectorAll('.gallery-item:not(.hidden)');
        activeItems.forEach(item => {
            const imgNode = item.querySelector('img');
            const headingNode = item.querySelector('h3');
            if (imgNode && headingNode) {
                this.state.cachedGalleryItems.push({
                    src: imgNode.src,
                    alt: imgNode.alt,
                    title: headingNode.innerText
                });
            }
        });
    },

    filterCategory(targetTag, buttonContainerSelector, itemSelector) {
        this.state.activeFilter = targetTag;
        const layoutItems = document.querySelectorAll(itemSelector);

        layoutItems.forEach(item => {
            const matches = targetTag === 'all' || item.getAttribute('data-category') === targetTag;
            if (matches) {
                item.classList.remove('hidden');
                item.classList.add('animate-scale-up');
            } else {
                item.classList.add('hidden');
                item.classList.remove('animate-scale-up');
            }
        });

        // Instantly force index arrays to reset and ignore hidden elements
        this.cacheGalleryDomFootprints();

        // Remap button focus design chips
        document.querySelectorAll(`${buttonContainerSelector} .filter-chip`).forEach(chip => {
            const currentChipTag = chip.getAttribute('data-tag');
            if (currentChipTag === targetTag) {
                chip.className = "filter-chip px-5 py-2 rounded-xl text-sm font-semibold bg-slate-950 text-white shadow-sm transition";
            } else {
                chip.className = "filter-chip px-5 py-2 rounded-xl text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition";
            }
        });
    },

    openLightboxFramework(index) {
        // CORRECTION: Find all currently VISIBLE elements to match the cached footprint array accurately
        const activeDomArray = document.querySelectorAll('.gallery-item:not(.hidden)');
        
        // If coming from static inline HTML index, adjust target to track by image src safely
        const allDomArray = document.querySelectorAll('.gallery-item');
        const fallbackNode = allDomArray[index];

        let targetSrc = "";
        if (fallbackNode && fallbackNode.querySelector('img')) {
            targetSrc = fallbackNode.querySelector('img').src;
        }

        // Map the real index location from the filtered cache structure
        this.state.lightboxIndex = this.state.cachedGalleryItems.findIndex(item => item.src === targetSrc);
        
        // Safe fallback if index matching fails
        if (this.state.lightboxIndex === -1) this.state.lightboxIndex = 0;

        this.syncLightboxDomFrame();
        
        const modal = document.getElementById('lightboxModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    },

    syncLightboxDomFrame() {
        const itemData = this.state.cachedGalleryItems[this.state.lightboxIndex];
        const displayImg = document.getElementById('lightboxActiveImg');
        const displayCaption = document.getElementById('lightboxCaption');
        const displayCounter = document.getElementById('lightboxCounter');

        if (!itemData || !displayImg) return;

        displayImg.src = itemData.src;
        displayImg.alt = itemData.alt;
        if (displayCaption) displayCaption.innerText = itemData.title;
        if (displayCounter) displayCounter.innerText = `${this.state.lightboxIndex + 1} / ${this.state.cachedGalleryItems.length}`;
    },

    paginateLightbox(direction) {
        this.state.lightboxIndex += direction;
        const totalElements = this.state.cachedGalleryItems.length;

        if (this.state.lightboxIndex >= totalElements) this.state.lightboxIndex = 0;
        if (this.state.lightboxIndex < 0) this.state.lightboxIndex = totalElements - 1;

        const activeImg = document.getElementById('lightboxActiveImg');
        if (activeImg) {
            activeImg.classList.add('scale-95', 'opacity-80');
            setTimeout(() => {
                this.syncLightboxDomFrame();
                activeImg.classList.remove('scale-95', 'opacity-80');
            }, 100);
        }
    },

    closeLightbox() {
        const modal = document.getElementById('lightboxModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }
};

// Start core system components securely on DOM Parse Completion
document.addEventListener("DOMContentLoaded", () => HorizonApp.init());

/**
 * Clean Interop Bridge Framework Proxies
 */
function filterGallery(categoryTag) { HorizonApp.filterCategory(categoryTag, '#galleryFilterGroup', '.gallery-item'); }
function openLightbox(indexValue) { HorizonApp.openLightboxFramework(indexValue); }
function changeImage(offsetDirection) { HorizonApp.paginateLightbox(offsetDirection); }
function closeLightbox() { HorizonApp.closeLightbox(); }
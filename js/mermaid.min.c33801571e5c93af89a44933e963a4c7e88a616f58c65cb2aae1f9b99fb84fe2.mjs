/**
 * Solution to update mermaid color scheme during runtime is inspired by:
 * https://github.com/mermaid-js/mermaid/issues/1945#issuecomment-1661264708
 */



(function(window){
    'use strict'
    const elementCode = '.mermaid'

    const getPreferedTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const forEachDiagram = (func) => {
        return new Promise((resolve, reject) => {
            try {
                var els = document.querySelectorAll(elementCode),
                    count = els.length;
                els.forEach(element => {
                    func(element)
                    count--
                    if(count == 0) {
                        resolve()
                    }
                });
            } catch (error) {
                reject(error) 
            }
        })
    }

    const getStyles = (theme) => {
        const themeElement = document.getElementById(`mermaid-${theme}-theme`);
        return getComputedStyle(themeElement)
    }

    const kebabToCamel = (str) => {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    const removeQuotes = (str) => {
        return str.replace(/['"]/g, '');
    }

    const getMermaidStyle = (cssStyles) => {
        const mermaidThemeVariables = [
            "--mermaid-dark-mode",
            "--mermaid-background",
            "--mermaid-font-family",
            "--mermaid-font-size",
            "--mermaid-primary-color",
            "--mermaid-primary-text-color",
            "--mermaid-secondary-color",
            "--mermaid-primary-border-color",
            "--mermaid-secondary-border-color",
            "--mermaid-secondary-text-color",
            "--mermaid-tertiary-color",
            "--mermaid-tertiary-border-color",
            "--mermaid-tertiary-text-color",
            "--mermaid-note-bkg-color",
            "--mermaid-note-text-color",
            "--mermaid-note-border-color",
            "--mermaid-line-color",
            "--mermaid-text-color",
            "--mermaid-main-bkg",
            "--mermaid-error-bkg-color",
            "--mermaid-error-text-color",
            "--mermaid-node-border",
            "--mermaid-cluster-bkg",
            "--mermaid-cluster-border",
            "--mermaid-default-link-color",
            "--mermaid-title-color",
            "--mermaid-edge-label-background",
            "--mermaid-node-text-color",
            "--mermaid-actor-bkg",
            "--mermaid-actor-border",
            "--mermaid-actor-text-color",
            "--mermaid-actor-line-color",
            "--mermaid-signal-color",
            "--mermaid-signal-text-color",
            "--mermaid-label-box-bkg-color",
            "--mermaid-label-box-border-color",
            "--mermaid-label-text-color",
            "--mermaid-loop-text-color",
            "--mermaid-activation-border-color",
            "--mermaid-activation-bkg-color",
            "--mermaid-sequence-number-color",
            "--mermaid-pie1",
            "--mermaid-pie2",
            "--mermaid-pie3",
            "--mermaid-pie4",
            "--mermaid-pie5",
            "--mermaid-pie6",
            "--mermaid-pie7",
            "--mermaid-pie8",
            "--mermaid-pie9",
            "--mermaid-pie10",
            "--mermaid-pie11",
            "--mermaid-pie12",
            "--mermaid-pie-title-text-size",
            "--mermaid-pie-title-text-color",
            "--mermaid-pie-section-text-size",
            "--mermaid-pie-section-text-color",
            "--mermaid-pie-legend-text-size",
            "--mermaid-pie-legend-text-color",
            "--mermaid-pie-stroke-color",
            "--mermaid-pie-stroke-width",
            "--mermaid-pie-outer-stroke-width",
            "--mermaid-pie-outer-stroke-color",
            "--mermaid-pie-opacity",
            "--mermaid-label-color",
            "--mermaid-alt-background",
            "--mermaid-class-text",
            "--mermaid-fill-type0",
            "--mermaid-fill-type1",
            "--mermaid-fill-type2",
            "--mermaid-fill-type3",
            "--mermaid-fill-type4",
            "--mermaid-fill-type5",
            "--mermaid-fill-type6",
            "--mermaid-fill-type7"
        ];
        var themeVariables = {}
        mermaidThemeVariables.forEach(themeProp => {
            const value = cssStyles.getPropertyValue(themeProp).trim();
            if (value) {
                const originalVariableName = kebabToCamel(themeProp.replace("--mermaid-", ""));
                themeVariables[originalVariableName] = value;
            }
        });
        return themeVariables
    }

    const loadMermaid = (dark) => {
        const style = getStyles(dark ? 'dark' : 'light')
        const mermaidTheme = removeQuotes(style.getPropertyValue('--mermaid-theme'))
        const mermaidStyle = getMermaidStyle(style)

        const params = {
            'theme': mermaidTheme,
            'themeVariables': mermaidStyle,
            startOnLoad: true,
            layout: 'dagre',
            look: 'classic',
        }
        window.mermaid.initialize(params)
        window.mermaid.init(params, document.querySelectorAll(elementCode))
    }

    const updateTheme = (theme) => {
        forEachDiagram(element => {
            // invalidate the diagrams and make sure to keep the content
            if (element.getAttribute('data-original-code') != null) {
                element.removeAttribute('data-processed')
                element.innerHTML = element.getAttribute('data-original-code')
            }
        }).then(() => {
            loadMermaid(theme === 'dark')
        })
        .catch(console.error)
    }

    // theme selection has changed (one of 'auto', 'light', 'dark')
    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            updateTheme(theme === 'auto' ? getPreferedTheme() : theme)
        })
    })

    // prefered theme has changed globally ('light' or 'dark)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        // only relevant, if theme is set to 'auto'
        if (document.documentElement.getAttribute('data-bs-theme') === 'auto') {
            updateTheme(getPreferedTheme())
        }
    })

    // As we cannot listen to changes in the CSS variables, we need to read them from a hidden element.
    const createPseudoStyledElements = () => {
        const themes = ['light', 'dark'];
        themes.forEach(theme => {
          const themeElement = document.createElement('div');
          themeElement.id = `mermaid-${theme}-theme`;
          themeElement.setAttribute('data-bs-theme', theme);
          themeElement.setAttribute('data-mermaid-theme', theme);
          themeElement.style.display = 'none';
          document.body.appendChild(themeElement);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        createPseudoStyledElements()
        forEachDiagram(element => {
            element.setAttribute('data-original-code', element.innerHTML)
        })
        .catch( console.error)
        updateTheme(document.documentElement.getAttribute('data-bs-theme'))
    });

    
})(window);


;
const minScale = 4
const maxScale = 0.5
const step = 1.2
const zoomFactor = 0.02

let current, mouseX, mouseY, touchX, touchY

// Update transform
function updateTransform(wrapper, translateX, translateY, scale, ease) {
    setScale(wrapper, scale)

    if (ease) { 
        wrapper.style.transition = 'all 0.3s ease-in-out'
    } else {
        wrapper.style.transition = ''
    }
    wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
}

function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}
function getScale(wrapper) {
    const scale = wrapper.getAttribute('data-scale') || 1
    return scale
}

function setScale(wrapper, scale) {
    wrapper.setAttribute('data-scale', scale)
}

// Zoom and expand functions
function expand(wrapper) {
    wrapper.style.transformOrigin = ''
    updateTransform(wrapper, 0, 0, 1, true)
}

function zoomIn(wrapper) {
    const scale = Math.min(getScale(wrapper) * step, minScale)
    const c = getTranslateXY(wrapper)
    // wrapper.style.transformOrigin = ''
    updateTransform(wrapper, c.translateX, c.translateY, scale, true)
}

function zoomOut(wrapper) {
    const scale = Math.max(getScale(wrapper) / step, maxScale)
    const c = getTranslateXY(wrapper)
    // wrapper.style.transformOrigin = ''
    updateTransform(wrapper, c.translateX, c.translateY, scale, true)
}

// Event handlers
function handleMousedown(wrapper, e) {
        e.preventDefault()

        wrapper.parentElement.classList.add('grabbing')
        current = getTranslateXY(wrapper)
        mouseX = e.clientX
        mouseY = e.clientY
}

function handleMousemove(wrapper, e) {
    if (Array.from(wrapper.parentElement.classList).includes('grabbing')) {
        e.preventDefault()

        const deltaX = current.translateX + e.clientX - mouseX
        const deltaY = current.translateY + e.clientY - mouseY
        updateTransform(wrapper, deltaX, deltaY, getScale(wrapper))
    }
}

function handleMouseup(wrapper, e) {
    e.preventDefault()

    wrapper.parentElement.classList.remove('grabbing')
    mouseX = null
    mouseY = null
    current = null
}

function handleWheel(wrapper, e) {
    e.preventDefault()
    
    // Get mouse position relative to the container
    const rect = wrapper.parentElement.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    const currentScale = getScale(wrapper)
    const curr = getTranslateXY(wrapper)

    // Calculate zoom direction and new scale
    const zoomIn = e.deltaY < 0
    const factor = zoomIn ? (1 + zoomFactor) : (1 - zoomFactor)
    const newScale = Math.max(maxScale, Math.min(minScale, currentScale * factor))
    
    if (newScale !== currentScale) {
        // Calculate the zoom factor that was actually applied
        const actualFactor = newScale / currentScale
        
        // Adjust translation to zoom towards mouse position
        const currentTranslateX = clientX - (clientX - curr.translateX) * actualFactor
        const currentTranslateY = clientY - (clientY - curr.translateY) * actualFactor
        
        wrapper.style.transformOrigin = '0 0'
        updateTransform(wrapper, currentTranslateX, currentTranslateY, newScale)
    }
}

// Touch events for mobile
function handleTouchstart(wrapper, e) {
    if (e.touches.length === 1) {
        touchX = e.touches[0].clientX
        touchY = e.touches[0].clientY
        wrapper.parentElement.classList.add('grabbing')
    } else if (e.touches.length === 2) {
        e.preventDefault()
        wrapper.parentElement.classList.remove('grabbing')
        
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        
        initialDistance = Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        )
        initialScale = scale
    }
}

function handleTouchmove(wrapper, e) {
    if (e.touches.length === 1) {
        if (!Array.from(wrapper.parentElement.classList).includes('grabbing')) return
        e.preventDefault()
        
        const deltaX = e.touches[0].clientX - (touchX || 0)
        const deltaY = e.touches[0].clientY - (touchY || 0)
        const c = getTranslateXY(wrapper)

        const translateX = c.translateX + deltaX
        const translateY = c.translateY + deltaY
                
        touchX = e.touches[0].clientX
        touchY = e.touches[0].clientY
        
        updateTransform(wrapper, translateX, translateY, getScale(wrapper))
    } else if (e.touches.length === 2) {
        e.preventDefault()
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        const c = getTranslateXY(wrapper)
        
        const currentDistance = Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const scale = Math.max(maxScale, Math.min(minScale, initialScale * (currentDistance / initialDistance)))
        updateTransform(wrapper, c.currentTranslateX, c.currentTranslateY, scale)
    }
}

function handleTouchend(wrapper, e) {
    wrapper.parentElement.classList.remove('grabbing')
}

document.querySelectorAll('.diagram-wrapper').forEach(wrapper => {
    const container = wrapper.parentElement
    const btnExpand = container.querySelector('.control-btn-expand')
    const btnZoomOut = container.querySelector('.control-btn-zoom-out')
    const btnZoomIn = container.querySelector('.control-btn-zoom-in')

    btnExpand.addEventListener('click', () => { expand(wrapper) })
    btnZoomOut.addEventListener('click', () => { zoomOut(wrapper) })
    btnZoomIn.addEventListener('click', () => { zoomIn(wrapper) })

    container.addEventListener('mousedown', (e) => { handleMousedown(wrapper, e) })
    container.addEventListener('mousemove', (e) => { handleMousemove(wrapper, e) })
    document.addEventListener('mouseup', (e) => { handleMouseup(wrapper, e) })
    container.addEventListener('touchstart', (e) => { handleTouchstart(wrapper, e) })
    container.addEventListener('touchmove', (e) => { handleTouchmove(wrapper, e) })
    container.addEventListener('touchend', (e) => { handleTouchend(wrapper, e) })
    container.addEventListener('wheel', (e) => { handleWheel(wrapper, e) })    
})

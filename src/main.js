// Interaktives Kreisdiagramm

const colors = [
    // Primärfarben (Reihenfolge 1-6)
    '#E74C3C',  // 1. Rot
    '#FF9800',  // 2. Orange
    '#FFC107',  // 3. Gelb
    '#2ECC71',  // 4. Grün
    '#3498DB',  // 5. Blau
    '#9B59B6',  // 6. Lila
    
    // Sekundärfarben/Mischfarben (Reihenfolge 7-12)
    '#FF6B6B',  // 7. Rot/Orange
    '#F39C12',  // 8. Orange/Gelb
    '#1ABC9C',  // 9. Gelb/Grün (Türkis)
    '#45B7D1',  // 10. Grün/Blau (Cyan)
    '#8E44AD',  // 11. Blau/Lila
    '#E91E63',  // 12. Lila/Rot (Pink)
    
    // Zusätzliche Varianten (falls mehr als 12 Felder)
    '#C0392B',  // 13. Dunkelrot
    '#FF5722',  // 14. Dunkelorange
    '#FFD700',  // 15. Goldgelb
    '#27AE60',  // 16. Dunkelgrün
    '#2980B9',  // 17. Dunkelblau
    '#BB8FCE',  // 18. Hellviolett
    '#FFA07A',  // 19. Lachs
    '#4ECDC4',  // 20. Mintgrün
    '#85C1E2',  // 21. Hellblau
    '#F8B195',  // 22. Pfirsich
    '#98D8C8',  // 23. Aquamarin
    '#C06C84',  // 24. Mauve
    '#34495E'   // 25. Dunkelgrau
];

// Farbpaletten für verschiedene Farbschemata
const colorPalettes = {
    standard: {
        name: 'Standard (Bunt)',
        colors: colors
    },
    monochrome: {
        name: 'Gleichfarbig',
        colors: [] // Wird dynamisch gesetzt
    },
    reds: {
        name: 'Rottöne',
        colors: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C']
    },
    oranges: {
        name: 'Orangetöne',
        colors: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100']
    },
    yellows: {
        name: 'Gelbtöne',
        colors: ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17']
    },
    greens: {
        name: 'Grüntöne',
        colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20']
    },
    teals: {
        name: 'Türkistöne',
        colors: ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40']
    },
    blues: {
        name: 'Blautöne',
        colors: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1']
    },
    purples: {
        name: 'Lilatöne',
        colors: ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C']
    },
    pinks: {
        name: 'Pinktöne',
        colors: ['#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F']
    },
    warm: {
        name: 'Warme Farben',
        colors: ['#FFEBEE', '#FFE0B2', '#FFF9C4', '#FFB74D', '#FF8A65', '#FF7043', '#EF5350', '#F06292', '#BA68C8', '#CE93D8']
    },
    cool: {
        name: 'Kalte Farben',
        colors: ['#E0F2F1', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064']
    },
    pastel: {
        name: 'Pastellfarben',
        colors: ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9']
    },
    vibrant: {
        name: 'Kräftige Farben',
        colors: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50']
    },
    earth: {
        name: 'Erdtöne',
        colors: ['#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723']
    },
    grays: {
        name: 'Grautöne',
        colors: ['#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121']
    }
};

let segments = [
    { label: 'Fläche 1', percent: 30, color: colors[0], radius: 100 },
    { label: 'Fläche 2', percent: 45, color: colors[1], radius: 100 },
    { label: 'Fläche 3', percent: 25, color: colors[2], radius: 100 }
];

// Tracking für deaktivierte Farben pro Palette
let disabledColors = {};

// Monochrome Farbeinstellungen
let monochromeColor = '#667eea';
let standardColors = [...colors]; // Kopie der 25 Standardfarben
let selectedStandardColor = null; // Für Standard-Farben-Auswahl

// Zwischenraum-Modus (standardmäßig farbig)
let spacingMode = 'colored';

// Legenden-Format (standardmäßig mit Dezimalstellen)
let legendFormat = 'decimal';
let legendDecimalPlaces = 'auto'; // 'auto' oder Zahl

// Hilfsfunktion: Ermittelt die maximale Anzahl Nachkommastellen aller Segment-Werte
function getMaxDecimalPlaces() {
    let maxDecimals = 0;
    
    // Prüfe alle Segment-Input-Felder auf ihre tatsächlich eingegebenen Werte
    document.querySelectorAll('.segment-percent').forEach(input => {
        const valueStr = input.value.trim();
        if (valueStr !== '') {
            // Prüfe auf Komma oder Punkt als Dezimaltrennzeichen
            if (valueStr.includes('.') || valueStr.includes(',')) {
                const parts = valueStr.split(/[.,]/);
                if (parts.length > 1 && parts[1].length > 0) {
                    maxDecimals = Math.max(maxDecimals, parts[1].length);
                }
            }
        }
    });
    
    return maxDecimals;
}

// Hilfsfunktion: Formatiert Zahlen basierend auf den Einstellungen
function formatValue(value, forceDecimal = null) {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    
    // Verwende entweder den übergebenen Parameter oder die globale Einstellung
    const showDecimal = forceDecimal !== null ? forceDecimal : (legendFormat === 'decimal');
    
    if (showDecimal) {
        // Ermittle die Anzahl der Nachkommastellen
        let decimalPlaces;
        if (legendDecimalPlaces === 'auto') {
            // Automatisch: Nutze die maximale Anzahl aus den Eingabefeldern
            decimalPlaces = getMaxDecimalPlaces();
        } else {
            decimalPlaces = parseInt(legendDecimalPlaces) || 0;
        }
        
        return num.toLocaleString('de-DE', { 
            minimumFractionDigits: decimalPlaces, 
            maximumFractionDigits: decimalPlaces 
        });
    } else {
        // Ohne Nachkommastellen
        return Math.round(num).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
}

// Hilfsfunktion: Berechnet Prozentanteil basierend auf Gesamtsumme
function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return (value / total) * 100;
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    initializeControls();
    updatePalettePreview();
    drawPieChart();
    
    // Change-Event für Palettenwechsel - automatisch anwenden
    document.getElementById('colorPalette').addEventListener('change', () => {
        updatePalettePreview();
        applyColorPalette();
    });
    
    document.getElementById('segmentCount').addEventListener('input', updateSegmentInputs);
    document.getElementById('downloadSVG').addEventListener('click', downloadAsSVG);
    
    // PNG-Download mit Größenauswahl
    const pngButton = document.getElementById('downloadPNG');
    const pngMenu = document.getElementById('pngSizeMenu');
    
    pngButton.addEventListener('click', (e) => {
        e.stopPropagation();
        pngMenu.classList.toggle('show');
    });
    
    // Menü schließen wenn außerhalb geklickt wird
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.png-download-wrapper')) {
            pngMenu.classList.remove('show');
        }
    });
    
    // Vordefinierte Größen
    document.querySelectorAll('.png-size-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const size = parseInt(e.target.dataset.size);
            downloadAsPNG(size);
            pngMenu.classList.remove('show');
        });
    });
    
    // Custom Größe
    document.getElementById('downloadCustomPNG').addEventListener('click', () => {
        const customSize = parseInt(document.getElementById('customPngSize').value);
        if (customSize >= 400 && customSize <= 8000) {
            downloadAsPNG(customSize);
            pngMenu.classList.remove('show');
        } else {
            alert('Bitte geben Sie eine Größe zwischen 400 und 8000 Pixel ein.');
        }
    });
    
    document.getElementById('downloadJS').addEventListener('click', downloadAsJS);
    
    // Legenden-Download mit Größenauswahl
    const legendPngButton = document.getElementById('downloadLegendPNG');
    const legendPngMenu = document.getElementById('legendPngSizeMenu');
    
    legendPngButton.addEventListener('click', (e) => {
        e.stopPropagation();
        legendPngMenu.classList.toggle('show');
    });
    
    // Vordefinierte Größen für Legende
    document.querySelectorAll('.legend-png-size-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const width = parseInt(e.target.dataset.size);
            downloadLegendAsPNG(width);
            legendPngMenu.classList.remove('show');
        });
    });
    
    // Custom Größe für Legende
    document.getElementById('downloadCustomLegendPNG').addEventListener('click', () => {
        const customWidth = parseInt(document.getElementById('customLegendPngSize').value);
        if (customWidth >= 200 && customWidth <= 4000) {
            downloadLegendAsPNG(customWidth);
            legendPngMenu.classList.remove('show');
        } else {
            alert('Bitte geben Sie eine Breite zwischen 200 und 4000 Pixel ein.');
        }
    });
    
    document.getElementById('downloadLegendSVG').addEventListener('click', downloadLegendAsSVG);
    document.getElementById('downloadLegendJS').addEventListener('click', downloadLegendAsJS);
    
    // Legenden-Format-Buttons
    document.getElementById('legendFormatDecimal').addEventListener('click', () => setLegendFormat('decimal'));
    document.getElementById('legendFormatInteger').addEventListener('click', () => setLegendFormat('integer'));
    
    // Dezimalstellen-Input
    document.getElementById('legendDecimalPlaces').addEventListener('input', (e) => {
        const value = e.target.value;
        if (value === '' || value === 'auto') {
            legendDecimalPlaces = 'auto';
        } else {
            legendDecimalPlaces = parseInt(value);
        }
        if (legendFormat === 'decimal') {
            updateLegend();
        }
    });
    
    // Zwischenraum-Buttons
    document.getElementById('spacingColored').addEventListener('click', () => setSpacingMode('colored'));
    document.getElementById('spacingNone').addEventListener('click', () => setSpacingMode('none'));
    
    // Zwischenraum-Farbe
    document.getElementById('spacingColor').addEventListener('input', updateSpacingColorFromPicker);
    document.getElementById('spacingColorHex').addEventListener('input', updateSpacingColorFromHex);
    
    // Reset-Button für Radius
    document.getElementById('resetRadius').addEventListener('click', resetAllRadius);
});

// Eingabefelder für Segmente erstellen
function initializeControls() {
    updateSegmentInputs();
}

function updateSegmentInputs() {
    const count = parseInt(document.getElementById('segmentCount').value);
    const container = document.getElementById('segmentsContainer');
    container.innerHTML = '';
    
    // Aktuelle Palette holen
    const paletteKey = document.getElementById('colorPalette').value;
    const palette = colorPalettes[paletteKey];
    
    // Aktive Farben aus der gewählten Palette filtern
    const activeColors = palette.colors.filter(color => {
        return !disabledColors[paletteKey] || !disabledColors[paletteKey].includes(color);
    });
    const colorsToUse = activeColors.length > 0 ? activeColors : palette.colors;
    
    // Aktuelle Segmente anpassen
    while (segments.length < count) {
        segments.push({
            label: `Fläche ${segments.length + 1}`,
            percent: 0,
            color: colorsToUse[segments.length % colorsToUse.length],
            radius: 100
        });
    }
    segments = segments.slice(0, count);
    
    // Eingabefelder erstellen
    segments.forEach((segment, index) => {
        const segmentDiv = document.createElement('div');
        segmentDiv.className = 'segment-input';
        segmentDiv.innerHTML = `
            <div class="color-controls">
                <input type="color" class="color-picker" value="${segment.color}" 
                       data-index="${index}" title="Farbe wählen">
                <input type="text" class="color-hex" value="${segment.color}" 
                       data-index="${index}" placeholder="#FF6B6B" pattern="^#[0-9A-Fa-f]{6}$">
            </div>
            <input type="text" class="segment-label" value="${segment.label}" 
                   placeholder="Bezeichnung" data-index="${index}">
            <input type="number" class="segment-percent" value="${segment.percent}" 
                   min="0" step="any" data-index="${index}" placeholder="Wert">
            <button class="toggle-radius-btn" data-index="${index}" title="Länge anpassen">⚙</button>
            <div class="radius-controls collapsed">
                <input type="range" class="segment-radius-slider" value="${segment.radius}" 
                       min="30" max="120" step="1" data-index="${index}">
                <input type="number" class="segment-radius-input" value="${segment.radius}" 
                       min="30" max="120" step="1" data-index="${index}">
                <span class="percent-symbol">%</span>
            </div>
        `;
        container.appendChild(segmentDiv);
        
        // Event-Listener für Farbänderungen
        const colorPicker = segmentDiv.querySelector('.color-picker');
        const colorHex = segmentDiv.querySelector('.color-hex');
        
        colorPicker.addEventListener('input', (e) => {
            const newColor = e.target.value.toUpperCase();
            segments[index].color = newColor;
            colorHex.value = newColor;
            drawPieChart();
        });
        
        colorHex.addEventListener('input', (e) => {
            let value = e.target.value;
            if (!value.startsWith('#')) {
                value = '#' + value;
            }
            if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                segments[index].color = value.toUpperCase();
                colorPicker.value = value;
                drawPieChart();
            }
        });
        
        // Event-Listener für Label und Wert
        const labelInput = segmentDiv.querySelector('.segment-label');
        const percentInput = segmentDiv.querySelector('.segment-percent');
        
        labelInput.addEventListener('input', (e) => {
            segments[index].label = e.target.value || `Fläche ${index + 1}`;
            updateLegend();
        });
        
        percentInput.addEventListener('input', (e) => {
            segments[index].percent = parseFloat(e.target.value) || 0;
            drawPieChart();
        });
        
        // Event-Listener für Toggle-Button
        const toggleBtn = segmentDiv.querySelector('.toggle-radius-btn');
        const radiusControls = segmentDiv.querySelector('.radius-controls');
        
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            radiusControls.classList.toggle('collapsed');
            toggleBtn.classList.toggle('active');
        });
        
        // Event-Listener für Radius-Änderungen
        const radiusSlider = segmentDiv.querySelector('.segment-radius-slider');
        const radiusInput = segmentDiv.querySelector('.segment-radius-input');
        
        radiusSlider.addEventListener('input', (e) => {
            const newRadius = parseInt(e.target.value);
            segments[index].radius = newRadius;
            radiusInput.value = newRadius;
            drawPieChart();
        });
        
        radiusInput.addEventListener('input', (e) => {
            const newRadius = parseInt(e.target.value);
            if (newRadius >= 30 && newRadius <= 120) {
                segments[index].radius = newRadius;
                radiusSlider.value = newRadius;
                drawPieChart();
            }
        });
    });
}

function updateChart() {
    // Werte aus den Eingabefeldern lesen
    document.querySelectorAll('.segment-label').forEach((input, index) => {
        if (segments[index]) {
            segments[index].label = input.value || `Fläche ${index + 1}`;
        }
    });
    
    document.querySelectorAll('.segment-percent').forEach((input, index) => {
        if (segments[index]) {
            segments[index].percent = parseFloat(input.value) || 0;
        }
    });
    
    drawPieChart();
}

function drawPieChart() {
    const svg = document.getElementById('pieChart');
    svg.innerHTML = '';
    
    // Berechne Gesamtsumme aller Werte
    const total = segments.reduce((sum, seg) => sum + parseFloat(seg.percent || 0), 0);
    
    let currentAngle = -90; // Start oben (12 Uhr Position)
    
    segments.forEach((segment, index) => {
        const value = parseFloat(segment.percent || 0);
        if (value > 0 && total > 0) {
            const percentage = calculatePercentage(value, total);
            const slice = createSlice(currentAngle, percentage, segment.radius, segment.color);
            svg.appendChild(slice);
            
            // Tooltip beim Hover
            slice.addEventListener('mouseenter', (e) => showTooltip(e, segment, value, total));
            slice.addEventListener('mouseleave', hideTooltip);
            
            currentAngle += (percentage / 100) * 360;
        }
    });
    
    updateLegend();
}

function createSlice(startAngle, percent, radius, color) {
    const angle = (percent / 100) * 360;
    const endAngle = startAngle + angle;
    
    // Koordinaten berechnen
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = radius * Math.cos(startRad);
    const y1 = radius * Math.sin(startRad);
    const x2 = radius * Math.cos(endRad);
    const y2 = radius * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    
    path.setAttribute('d', d);
    path.setAttribute('fill', color);
    
    // Zwischenräume basierend auf Modus
    if (spacingMode === 'colored') {
        const spacingColor = document.getElementById('spacingColor').value;
        path.setAttribute('stroke', spacingColor);
        path.setAttribute('stroke-width', '2');
    } else {
        path.setAttribute('stroke', 'none');
    }
    
    path.classList.add('pie-slice');
    
    return path;
}

function updateLegend() {
    const legend = document.getElementById('legend');
    legend.innerHTML = '<h3>Legende</h3>';
    
    const total = segments.reduce((sum, seg) => sum + parseFloat(seg.percent || 0), 0);
    
    segments.forEach(segment => {
        const value = parseFloat(segment.percent || 0);
        if (value > 0) {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `
                <div class="legend-color" style="background-color: ${segment.color}"></div>
                <span class="legend-label">${segment.label}</span>
                <span class="legend-value">${formatValue(value)}</span>
            `;
            legend.appendChild(item);
        }
    });
}

function showTooltip(e, segment, value, total) {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.className = 'tooltip';
    
    const formattedValue = formatValue(value);
    const percentage = calculatePercentage(value, total);
    
    tooltip.innerHTML = `
        <strong>${segment.label}</strong><br>
        Wert: ${formattedValue}<br>
        Anteil: ${percentage.toFixed(1)}%
    `;
    document.body.appendChild(tooltip);
    
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY + 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Download-Funktionen
function downloadAsSVG() {
    const svg = document.getElementById('pieChart');
    const svgClone = svg.cloneNode(true);
    
    // SVG in einen String umwandeln
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgClone);
    
    // xmlns nur hinzufügen, wenn es noch nicht vorhanden ist
    if (!svgString.includes('xmlns=')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    
    // XML-Deklaration hinzufügen
    svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
    
    // Blob erstellen und downloaden
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kreisdiagramm.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function downloadAsPNG(size = 800) {
    const svg = document.getElementById('pieChart');
    const svgClone = svg.cloneNode(true);
    
    // SVG Dimensionen
    const width = size;
    const height = size;
    
    // SVG in String umwandeln
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgClone);
    
    // xmlns nur hinzufügen, wenn es noch nicht vorhanden ist
    if (!svgString.includes('xmlns=')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    
    // Canvas erstellen
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Weißen Hintergrund hinzufügen
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // Image aus SVG erstellen
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
        // SVG zentriert auf Canvas zeichnen
        const scale = Math.min(width / 240, height / 240); // viewBox ist 240x240
        const offsetX = (width - 240 * scale) / 2;
        const offsetY = (height - 240 * scale) / 2;
        
        ctx.drawImage(img, offsetX, offsetY, 240 * scale, 240 * scale);
        URL.revokeObjectURL(url);
        
        // PNG als Download
        canvas.toBlob(function(blob) {
            const pngUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'kreisdiagramm.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(pngUrl);
        }, 'image/png');
    };
    
    img.onerror = function(error) {
        console.error('Fehler beim Laden des SVG:', error);
        alert('PNG-Download fehlgeschlagen. Bitte versuchen Sie es erneut.');
        URL.revokeObjectURL(url);
    };
    
    img.src = url;
}

function downloadAsJS() {
    // Aktuelle Konfiguration als JavaScript-Code generieren
    const total = segments.reduce((sum, seg) => sum + parseFloat(seg.percent || 0), 0);
    
    const jsCode = `// Kreisdiagramm Konfiguration
// Generiert am: ${new Date().toLocaleString('de-DE')}

const diagrammDaten = ${JSON.stringify(segments, null, 4)};

// Verwendungsbeispiel:
// Diese Daten können in einem JavaScript-Projekt verwendet werden
console.log('Diagramm-Daten:', diagrammDaten);

// Gesamtsumme berechnen
const gesamt = diagrammDaten.reduce((sum, segment) => sum + parseFloat(segment.percent || 0), 0);
console.log('Gesamtsumme:', gesamt);

// Einzelne Segmente ausgeben mit Prozentwerten
diagrammDaten.forEach((segment, index) => {
    const value = parseFloat(segment.percent || 0);
    const percentage = gesamt > 0 ? ((value / gesamt) * 100).toFixed(1) : 0;
    console.log(\`Segment \${index + 1}: \${segment.label} - Wert: \${value} (Anteil: \${percentage}%)\`);
});
`;

    // JavaScript-Datei herunterladen
    const blob = new Blob([jsCode], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagramm-daten.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Farbpalette anwenden
function applyColorPalette() {
    const paletteKey = document.getElementById('colorPalette').value;
    const palette = colorPalettes[paletteKey];
    
    if (paletteKey === 'monochrome') {
        // Wende die ausgewählte Monochrome-Farbe auf alle Segmente an
        segments.forEach(segment => {
            segment.color = monochromeColor;
        });
    } else if (paletteKey === 'standard' && selectedStandardColor) {
        // Wende die ausgewählte Standard-Farbe auf alle Segmente an
        segments.forEach(segment => {
            segment.color = selectedStandardColor;
        });
    } else if (palette) {
        // Nur aktive (nicht deaktivierte) Farben verwenden
        const activeColors = palette.colors.filter(color => {
            return !disabledColors[paletteKey] || !disabledColors[paletteKey].includes(color);
        });
        
        // Falls alle Farben deaktiviert sind, nutze alle
        const colorsToUse = activeColors.length > 0 ? activeColors : palette.colors;
        
        // Farben auf alle Segmente anwenden
        segments.forEach((segment, index) => {
            segment.color = colorsToUse[index % colorsToUse.length];
        });
    }
    
    updatePalettePreview();
    updateSegmentInputs();
    drawPieChart();
}

// Paletten-Vorschau aktualisieren
function updatePalettePreview() {
    const paletteKey = document.getElementById('colorPalette').value;
    const palette = colorPalettes[paletteKey];
    const preview = document.getElementById('palettePreview');
    const monochromeControl = document.getElementById('monochromeColorControl');
    const standardColorsControl = document.getElementById('standardColorsControl');
    
    // Alle Kontroll-Elemente erstmal verstecken
    preview.style.display = 'none';
    monochromeControl.style.display = 'none';
    standardColorsControl.style.display = 'none';
    
    if (paletteKey === 'monochrome') {
        // Zeige Monochrome Farbauswahl
        monochromeControl.style.display = 'flex';
        
        // Event-Listener für Monochrome Farbpicker
        const colorPicker = document.getElementById('monochromeColor');
        const hexInput = document.getElementById('monochromeColorHex');
        
        // Synchronisiere Color Picker und Hex Input
        colorPicker.value = monochromeColor;
        hexInput.value = monochromeColor.toUpperCase();
        
        colorPicker.oninput = () => {
            monochromeColor = colorPicker.value;
            hexInput.value = monochromeColor.toUpperCase();
            // Automatisch anwenden
            applyColorPalette();
        };
        
        hexInput.oninput = () => {
            const hex = hexInput.value.trim();
            if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                monochromeColor = hex.toLowerCase();
                colorPicker.value = monochromeColor;
                // Automatisch anwenden
                applyColorPalette();
            }
        };
        
    } else if (paletteKey === 'standard') {
        // Zeige Standard-Farben-Auswahl
        standardColorsControl.style.display = 'block';
        updateStandardColorsGrid();
        
    } else {
        // Zeige normale Palette Preview (mit deaktivieren)
        preview.style.display = 'flex';
        preview.innerHTML = '';
        
        // Initialisiere disabled colors für diese Palette, falls nicht vorhanden
        if (!disabledColors[paletteKey]) {
            disabledColors[paletteKey] = [];
        }
        
        if (palette) {
            // Info-Text hinzufügen
            const infoText = document.createElement('div');
            infoText.className = 'palette-info';
            infoText.textContent = 'Klicken Sie auf Farben, um sie zu deaktivieren:';
            preview.appendChild(infoText);
            
            const colorsContainer = document.createElement('div');
            colorsContainer.className = 'palette-colors-grid';
            
            // Zeige alle Farben der Palette
            palette.colors.forEach((color, index) => {
                const colorBox = document.createElement('div');
                const isDisabled = disabledColors[paletteKey].includes(color);
                
                colorBox.className = 'palette-color' + (isDisabled ? ' disabled' : '');
                colorBox.style.backgroundColor = color;
                colorBox.title = color + (isDisabled ? ' (deaktiviert)' : ' (klicken zum deaktivieren)');
                colorBox.dataset.color = color;
                
                // Click-Handler zum Aktivieren/Deaktivieren
                colorBox.addEventListener('click', () => {
                    toggleColorInPalette(paletteKey, color);
                });
                
                colorsContainer.appendChild(colorBox);
            });
            
            preview.appendChild(colorsContainer);
            
            // "Eigene Farbe hinzufügen" Button für alle Paletten
            const addColorBtn = document.createElement('button');
            addColorBtn.className = 'btn-add-color';
            addColorBtn.textContent = '+ Eigene Farbe';
            addColorBtn.onclick = () => {
                const newColor = prompt('Geben Sie eine Farbe als Hex-Code ein (z.B. #FF5733):');
                if (newColor && /^#[0-9A-Fa-f]{6}$/.test(newColor)) {
                    const hexColor = newColor.toLowerCase();
                    if (!palette.colors.includes(hexColor)) {
                        palette.colors.push(hexColor);
                        updatePalettePreview();
                    }
                } else if (newColor) {
                    alert('Ungültiger Hex-Code. Bitte verwenden Sie das Format #RRGGBB');
                }
            };
            preview.appendChild(addColorBtn);
        }
    }
}

// Standard-Farben-Grid aktualisieren
function updateStandardColorsGrid() {
    const grid = document.getElementById('standardColorsGrid');
    grid.innerHTML = '';
    
    standardColors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'standard-color-item';
        if (selectedStandardColor === color) {
            colorBox.classList.add('selected');
        }
        colorBox.style.backgroundColor = color;
        colorBox.title = color;
        
        colorBox.addEventListener('click', () => {
            selectedStandardColor = color;
            updateStandardColorsGrid();
            // Automatisch anwenden
            applyColorPalette();
        });
        
        grid.appendChild(colorBox);
    });
    
    // Event-Listener für "Eigene Farbe hinzufügen"
    const addBtn = document.getElementById('addCustomColor');
    addBtn.onclick = () => {
        const newColor = prompt('Geben Sie eine Farbe als Hex-Code ein (z.B. #FF5733):');
        if (newColor && /^#[0-9A-Fa-f]{6}$/.test(newColor)) {
            if (!standardColors.includes(newColor.toLowerCase())) {
                standardColors.push(newColor.toLowerCase());
                updateStandardColorsGrid();
            }
        } else if (newColor) {
            alert('Ungültiger Hex-Code. Bitte verwenden Sie das Format #RRGGBB');
        }
    };
}

// Zwischenraum-Funktionen
function setSpacingMode(mode) {
    spacingMode = mode;
    
    // Button-Styling aktualisieren
    document.getElementById('spacingColored').classList.toggle('active', mode === 'colored');
    document.getElementById('spacingNone').classList.toggle('active', mode === 'none');
    
    // Farbauswahl ein-/ausblenden
    const colorControl = document.getElementById('spacingColorControl');
    colorControl.style.display = mode === 'colored' ? 'flex' : 'none';
    
    drawPieChart();
}

function setLegendFormat(format) {
    legendFormat = format;
    
    // Button-Styling aktualisieren
    document.getElementById('legendFormatDecimal').classList.toggle('active', format === 'decimal');
    document.getElementById('legendFormatInteger').classList.toggle('active', format === 'integer');
    
    // Input-Feld aktivieren/deaktivieren
    const decimalInput = document.getElementById('legendDecimalPlaces');
    decimalInput.disabled = (format !== 'decimal');
    
    // Legende neu zeichnen
    updateLegend();
}

function updateSpacingColorFromPicker() {
    const color = document.getElementById('spacingColor').value.toUpperCase();
    document.getElementById('spacingColorHex').value = color;
    drawPieChart();
}

function updateSpacingColorFromHex() {
    let value = document.getElementById('spacingColorHex').value;
    if (!value.startsWith('#')) {
        value = '#' + value;
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        document.getElementById('spacingColor').value = value;
        document.getElementById('spacingColorHex').value = value.toUpperCase();
        drawPieChart();
    }
}

// Alle Radius-Werte zurücksetzen
function resetAllRadius() {
    segments.forEach(segment => {
        segment.radius = 100;
    });
    updateSegmentInputs();
    drawPieChart();
}

// Farbe in Palette aktivieren/deaktivieren
function toggleColorInPalette(paletteKey, color) {
    if (!disabledColors[paletteKey]) {
        disabledColors[paletteKey] = [];
    }
    
    const index = disabledColors[paletteKey].indexOf(color);
    
    if (index > -1) {
        // Farbe aktivieren
        disabledColors[paletteKey].splice(index, 1);
    } else {
        // Farbe deaktivieren
        disabledColors[paletteKey].push(color);
    }
    
    updatePalettePreview();
    
    // Automatisch die Palette neu anwenden
    applyColorPalette();
}

// Legende als SVG herunterladen
function downloadLegendAsSVG() {
    const legend = document.getElementById('legend');
    const legendClone = legend.cloneNode(true);
    
    // Styles inline setzen
    const items = legendClone.querySelectorAll('.legend-item');
    const width = 300;
    const itemHeight = 36;
    const headerHeight = 40;
    const padding = 20;
    const height = headerHeight + (items.length * itemHeight) + padding;
    
    // SVG erstellen
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="white"/>
        <text x="20" y="30" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#333">Legende</text>`;
    
    let yPos = headerHeight + 10;
    segments.forEach(segment => {
        const value = parseFloat(segment.percent || 0);
        if (value > 0) {
            const formattedValue = formatValue(value);
            svgContent += `
                <rect x="20" y="${yPos}" width="20" height="20" rx="4" fill="${segment.color}"/>
                <text x="50" y="${yPos + 15}" font-family="Arial, sans-serif" font-size="15" fill="#333">${segment.label}</text>
                <text x="${width - 20}" y="${yPos + 15}" text-anchor="end" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#666">${formattedValue}</text>`;
            yPos += itemHeight;
        }
    });
    
    svgContent += '</svg>';
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'legende.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Legende als PNG herunterladen
function downloadLegendAsPNG(width = 600) {
    const itemHeight = 36;
    const headerHeight = 40;
    const padding = 20;
    const visibleSegments = segments.filter(s => s.percent > 0);
    const height = headerHeight + (visibleSegments.length * itemHeight) + padding;
    
    // SVG für Legende erstellen
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="white"/>
        <text x="20" y="30" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#333">Legende</text>`;
    
    let yPos = headerHeight + 10;
    visibleSegments.forEach(segment => {
        const value = parseFloat(segment.percent || 0);
        const formattedValue = formatValue(value);
        svgContent += `
            <rect x="20" y="${yPos}" width="20" height="20" rx="4" fill="${segment.color}"/>
            <text x="50" y="${yPos + 15}" font-family="Arial, sans-serif" font-size="15" fill="#333">${segment.label}</text>
            <text x="${width - 20}" y="${yPos + 15}" text-anchor="end" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#666">${formattedValue}</text>`;
        yPos += itemHeight;
    });
    
    svgContent += '</svg>';
    
    // Canvas erstellen
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Image aus SVG erstellen
    const img = new Image();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        
        // PNG als Download
        canvas.toBlob(function(blob) {
            const pngUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'legende.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(pngUrl);
        }, 'image/png');
    };
    
    img.onerror = function(error) {
        console.error('Fehler beim Laden des SVG:', error);
        alert('PNG-Download fehlgeschlagen. Bitte versuchen Sie es erneut.');
        URL.revokeObjectURL(url);
    };
    
    img.src = url;
}

// Legenden-Daten als JavaScript herunterladen
function downloadLegendAsJS() {
    const total = segments.reduce((sum, seg) => sum + parseFloat(seg.percent || 0), 0);
    
    const legendData = segments
        .filter(s => parseFloat(s.percent || 0) > 0)
        .map(segment => {
            const value = parseFloat(segment.percent || 0);
            const percentage = calculatePercentage(value, total);
            return {
                label: segment.label,
                value: value,
                percentage: percentage.toFixed(1),
                color: segment.color
            };
        });
    
    const jsContent = `// Legenden-Daten
const legendData = ${JSON.stringify(legendData, null, 4)};

// Gesamtsumme
const total = ${total};

// Beispiel-Nutzung:
legendData.forEach(item => {
    console.log(\`\${item.label}: \${item.value} (Anteil: \${item.percentage}%) - Farbe: \${item.color}\`);
});
`;
    
    const blob = new Blob([jsContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'legende-daten.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

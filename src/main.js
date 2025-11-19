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
    { label: 'Fläche 1', percent: 30, color: colors[0] },
    { label: 'Fläche 2', percent: 45, color: colors[1] },
    { label: 'Fläche 3', percent: 25, color: colors[2] }
];

// Tracking für deaktivierte Farben pro Palette
let disabledColors = {};

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    initializeControls();
    updatePalettePreview();
    drawPieChart();
    
    // Change-Event für Palettenwechsel - zeigt nur die Vorschau
    document.getElementById('colorPalette').addEventListener('change', updatePalettePreview);
    
    // Button zum Anwenden der Palette
    document.getElementById('applyPalette').addEventListener('click', applyColorPalette);
    
    document.getElementById('segmentCount').addEventListener('input', updateSegmentInputs);
    document.getElementById('updateChart').addEventListener('click', updateChart);
    document.getElementById('downloadSVG').addEventListener('click', downloadAsSVG);
    document.getElementById('downloadPNG').addEventListener('click', downloadAsPNG);
    document.getElementById('downloadJS').addEventListener('click', downloadAsJS);
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
            color: colorsToUse[segments.length % colorsToUse.length]
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
                   min="0" max="100" step="0.1" data-index="${index}">
            <span class="percent-symbol">%</span>
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
    });
}

function updateChart() {
    // Werte aus den Eingabefeldern lesen
    document.querySelectorAll('.segment-label').forEach((input, index) => {
        segments[index].label = input.value || `Fläche ${index + 1}`;
    });
    
    document.querySelectorAll('.segment-percent').forEach((input, index) => {
        segments[index].percent = parseFloat(input.value) || 0;
    });
    
    // Normalisieren auf 100%
    const total = segments.reduce((sum, seg) => sum + seg.percent, 0);
    if (total > 0) {
        segments.forEach(seg => {
            seg.percent = (seg.percent / total) * 100;
        });
    }
    
    drawPieChart();
}

function drawPieChart() {
    const svg = document.getElementById('pieChart');
    svg.innerHTML = '';
    
    let currentAngle = -90; // Start oben (12 Uhr Position)
    const radius = 100;
    
    segments.forEach((segment, index) => {
        if (segment.percent > 0) {
            const slice = createSlice(currentAngle, segment.percent, radius, segment.color);
            svg.appendChild(slice);
            
            // Tooltip beim Hover
            slice.addEventListener('mouseenter', (e) => showTooltip(e, segment));
            slice.addEventListener('mouseleave', hideTooltip);
            
            currentAngle += (segment.percent / 100) * 360;
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
    path.setAttribute('stroke', 'white');
    path.setAttribute('stroke-width', '2');
    path.classList.add('pie-slice');
    
    return path;
}

function updateLegend() {
    const legend = document.getElementById('legend');
    legend.innerHTML = '<h3>Legende</h3>';
    
    segments.forEach(segment => {
        if (segment.percent > 0) {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `
                <div class="legend-color" style="background-color: ${segment.color}"></div>
                <span class="legend-label">${segment.label}</span>
                <span class="legend-value">${segment.percent.toFixed(1)}%</span>
            `;
            legend.appendChild(item);
        }
    });
}

function showTooltip(e, segment) {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.className = 'tooltip';
    tooltip.innerHTML = `
        <strong>${segment.label}</strong><br>
        ${segment.percent.toFixed(1)}%
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

function downloadAsPNG() {
    const svg = document.getElementById('pieChart');
    const svgClone = svg.cloneNode(true);
    
    // SVG Dimensionen
    const width = 800;
    const height = 800;
    
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
    const jsCode = `// Kreisdiagramm Konfiguration
// Generiert am: ${new Date().toLocaleString('de-DE')}

const diagrammDaten = ${JSON.stringify(segments, null, 4)};

// Verwendungsbeispiel:
// Diese Daten können in einem JavaScript-Projekt verwendet werden
console.log('Diagramm-Daten:', diagrammDaten);

// Gesamtsumme berechnen
const gesamt = diagrammDaten.reduce((sum, segment) => sum + segment.percent, 0);
console.log('Gesamtsumme:', gesamt + '%');

// Einzelne Segmente ausgeben
diagrammDaten.forEach((segment, index) => {
    console.log(\`Segment \${index + 1}: \${segment.label} - \${segment.percent.toFixed(1)}%\`);
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
    
    if (palette) {
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
        
        updatePalettePreview();
        updateSegmentInputs();
        drawPieChart();
    }
}

// Paletten-Vorschau aktualisieren
function updatePalettePreview() {
    const paletteKey = document.getElementById('colorPalette').value;
    const palette = colorPalettes[paletteKey];
    const preview = document.getElementById('palettePreview');
    
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
    }
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
}

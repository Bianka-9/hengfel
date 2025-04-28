/*
* File: app.js
* Author: Nagy Bianka
* Copyright: 2025, Nagy Bianka
* Group: Szoft I-N
* Date: 2025-04-21
* Github: https://github.com/Bianka-9
* Licenc: MIT
*/

const radiusInput = document.querySelector('#radius');
const heightInput = document.querySelector('#height');
const surfaceInput = document.querySelector('#surface');
const calcButton = document.querySelector('#calcButton');
const drawButton = document.querySelector('#drawButton');
const canvas = document.querySelector('#cylinderCanvas');
const ctx = canvas.getContext('2d');

calcButton.addEventListener('click', () => {
    const r = Number(radiusInput.value);
    const h = Number(heightInput.value);

    if (r <= 0 || h <= 0) return alert("Pozitív számokat adj meg!");

    const surface = 2 * Math.PI * r * (r + h);
    surfaceInput.value = surface.toFixed(2);
});

drawButton.addEventListener('click', () => {
    const r = Number(radiusInput.value);
    const h = Number(heightInput.value);

    if (r <= 0 || h <= 0) return alert("Pozitív számokat adj meg!");

    const surface = 2 * Math.PI * r * (r + h);
    drawCylinder(r, h, surface);
});

function drawCylinder(r, h, surface) {
    const scale = 2;
    const radius = r * scale;
    const height = h * scale;

    if (radius > canvas.width / 2 - 10 || height > canvas.height - 20) {
        alert("Az ábra túl nagy ehhez a vászonhoz! Próbálj meg kisebb értékeket megadni.");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const topY = (canvas.height - height) / 2;
    const bottomY = topY + height;

    ctx.fillStyle = "#bcd";
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.ellipse(centerX, topY, radius, radius / 3, 0, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(centerX, bottomY, radius, radius / 3, 0, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - radius, topY);
    ctx.lineTo(centerX - radius, bottomY);
    ctx.moveTo(centerX + radius, topY);
    ctx.lineTo(centerX + radius, bottomY);
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.fillText(`r = ${r} cm`, centerX - 20, bottomY + 30);

    ctx.save();
    ctx.translate(centerX + radius + 20, (topY + bottomY) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`h = ${h} cm`, 0, 0);
    ctx.restore();

    ctx.fillStyle = "#444";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText(`F = ${surface.toFixed(2)} cm²`, canvas.width - 140, canvas.height - 10);
}

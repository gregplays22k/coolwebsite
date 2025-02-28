let clicks = 0;
let clickValue = 1;

const clickBtn = document.getElementById('clickBtn');
const clicksDisplay = document.getElementById('clicks');
const upgrade1Btn = document.getElementById('upgrade1Btn');
const upgrade1LevelDisplay = document.getElementById('upgrade1Level');
const upgrade2Btn = document.getElementById('upgrade2Btn');
const upgrade2LevelDisplay = document.getElementById('upgrade2Level');

let upgrade1Level = 0;
let upgrade1Cost = 10;
let upgrade2Level = 0;
let upgrade2Cost = 50;

clickBtn.addEventListener('click', () => {
    clicks += clickValue;
    clicksDisplay.textContent = clicks;
});

upgrade1Btn.addEventListener('click', () => {
    if (clicks >= upgrade1Cost) {
        clicks -= upgrade1Cost;
        clickValue += 1;
        upgrade1Level += 1;
        upgrade1Cost *= 2; // Increase the cost for the next upgrade
        clicksDisplay.textContent = clicks;
        upgrade1LevelDisplay.textContent = upgrade1Level;
        upgrade1Btn.textContent = `Upgrade 1 (Cost: ${upgrade1Cost}) - +1 Click Per Click`;
    }
});

upgrade2Btn.addEventListener('click', () => {
    if (clicks >= upgrade2Cost) {
        clicks -= upgrade2Cost;
        clickValue += 5;
        upgrade2Level += 1;
        upgrade2Cost *= 2; // Increase the cost for the next upgrade
        clicksDisplay.textContent = clicks;
        upgrade2LevelDisplay.textContent = upgrade2Level;
        upgrade2Btn.textContent = `Upgrade 2 (Cost: ${upgrade2Cost}) - +5 Clicks Per Click`;
    }
});

// Optionally, you can add an auto-click feature
setInterval(() => {
    clicks += upgrade1Level; // +1 click per second for each level of upgrade 1
    clicksDisplay.textContent = clicks;
}, 1000);

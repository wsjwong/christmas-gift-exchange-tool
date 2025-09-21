/*
 * This script adds all interactivity for the gift drawing tool.  
 * It manages the state machine for the setup phase, drawing phase and  
 * final results display. All text strings are kept in Traditional Chinese to  
 * mirror the original website.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Cache DOM elements
    const setupSection = document.getElementById('setup');
    const countInput = document.getElementById('count');
    const startButton = document.getElementById('startButton');

    const drawSection = document.getElementById('drawSection');
    const drawInfo = document.getElementById('drawInfo');
    const numberDisplay = document.getElementById('numberDisplay');
    const drawButton = document.getElementById('drawButton');
    const redrawButton = document.getElementById('redrawButton');

    const finalSection = document.getElementById('finalSection');
    const finalInfo = document.getElementById('finalInfo');
    const finalNumber = document.getElementById('finalNumber');
    const restartButton = document.getElementById('restartButton');
    const toggleResults = document.getElementById('toggleResults');
    const resultListContainer = document.getElementById('resultListContainer');
    const collapseBtn = document.getElementById('collapseBtn');
    const resultList = document.getElementById('resultList');
    const langToggle = document.getElementById('langToggle');

    // State variables
    let participantCount = 0;
    let numbers = [];
    let currentIndex = 0;
    // Keep a history of drawn gift numbers so results can be re‑rendered on language change
    let drawHistory = [];
    // Current language: 'zh' for Traditional Chinese, 'en' for English
    let currentLanguage = 'zh';

    // Translation strings for both languages. Functions produce context‑specific messages.
    const translations = {
        zh: {
            title: '聖誕交換禮物',
            subtitle: '為禮物標上號碼，然後輸入參與人數',
            placeholder: '參與人數 *',
            start: '開始',
            draw: '抽取禮物',
            redraw: '重抽一次',
            restart: '重新開始',
            allResults: '所有結果',
            participantGift: (index, total) => {
                // When index === total, it means final participant
                if (index === total) return '最後一位抽中的禮物號碼';
                return `第${index}位抽中的禮物號碼`;
            },
            giftItem: (giftNumber) => `禮物 ${giftNumber}`,
            invalidCount: '請輸入有效的參與人數 (必須為正整數)'
        },
        en: {
            title: 'Christmas Gift Exchange',
            subtitle: 'Label the gifts with numbers and then enter the number of people',
            placeholder: 'Number of People *',
            start: 'START',
            draw: 'DRAW GIFT',
            redraw: 'DRAW AGAIN',
            restart: 'RESTART',
            allResults: 'SHOW ALL DRAW RECORDS',
            participantGift: (index, total) => {
                if (index === total) return 'The final gift number drawn';
                return `Gift number drawn by participant ${index}`;
            },
            giftItem: (giftNumber) => `Gift ${giftNumber}`,
            invalidCount: 'Please enter a valid number of participants (positive integer)'
        }
    };

    /**
     * Fisher–Yates shuffle to randomise an array in place.
     * @param {number[]} array
     */
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /**
     * Initialise the drawing state based on the number of participants.
     */
    function initialiseDraw() {
        // Build an array of gift numbers 1..participantCount
        numbers = [];
        for (let i = 1; i <= participantCount; i++) {
            numbers.push(i);
        }
        shuffle(numbers);
        currentIndex = 0;
        drawHistory = [];
        // Reset UI
        drawInfo.textContent = '';
        numberDisplay.textContent = '';
        finalInfo.textContent = '';
        finalNumber.textContent = '';
        resultList.innerHTML = '';
        resultListContainer.classList.add('hidden');
        resultListContainer.classList.remove('collapsed');
        // Hide final, show draw
        finalSection.classList.add('hidden');
        drawSection.classList.remove('hidden');
        // Update button labels (draw and redraw) for the chosen language
        drawButton.textContent = translations[currentLanguage].draw;
        redrawButton.textContent = translations[currentLanguage].redraw;
    }

    /**
     * Handle clicking the start button.
     */
    startButton.addEventListener('click', function () {
        const value = parseInt(countInput.value, 10);
        if (Number.isNaN(value) || value <= 0) {
            alert(translations[currentLanguage].invalidCount);
            return;
        }
        participantCount = value;
        // Hide setup section and prepare draw section
        setupSection.classList.add('hidden');
        drawSection.classList.remove('hidden');
        redrawButton.classList.add('hidden'); // hide redraw until first draw is completed
        initialiseDraw();
        // Update UI texts based on the current language after initialising
        updateLanguageUI();
    });

    /**
     * Handle drawing a new gift number.
     */
    function drawNext() {
        if (currentIndex >= participantCount) {
            return;
        }
        const giftNumber = numbers[currentIndex];
        // Determine the appropriate message for the current draw
        const infoText = translations[currentLanguage].participantGift(currentIndex + 1, participantCount);
        drawInfo.textContent = infoText;
        numberDisplay.textContent = giftNumber.toString();

        // Record result into history and list
        drawHistory.push(giftNumber);
        const listItem = document.createElement('li');
        listItem.textContent = translations[currentLanguage].giftItem(giftNumber);
        resultList.appendChild(listItem);

        currentIndex++;

        // Show redraw button after the first draw
        if (currentIndex === 1) {
            redrawButton.classList.remove('hidden');
        }

        // If this was the last draw, show final section
        if (currentIndex === participantCount) {
            // Use the translation for the final message
            finalInfo.textContent = translations[currentLanguage].participantGift(participantCount, participantCount);
            finalNumber.textContent = giftNumber.toString();
            // hide draw section and show final
            drawSection.classList.add('hidden');
            finalSection.classList.remove('hidden');
            // Update final section buttons (restart and results) labels
            restartButton.textContent = translations[currentLanguage].restart;
            toggleResults.textContent = translations[currentLanguage].allResults;
        }
    }

    drawButton.addEventListener('click', function () {
        drawNext();
    });

    /**
     * Allow re‑shuffling the current set of participants without changing the count.
     */
    redrawButton.addEventListener('click', function () {
        initialiseDraw();
    });

    /**
     * Restart the entire process: show setup form again.
     */
    restartButton.addEventListener('click', function () {
        // reset count input and show setup section
        countInput.value = '';
        setupSection.classList.remove('hidden');
        drawSection.classList.add('hidden');
        finalSection.classList.add('hidden');
    });

    /**
     * Toggle visibility of the results list.
     */
    toggleResults.addEventListener('click', function () {
        if (resultListContainer.classList.contains('hidden')) {
            resultListContainer.classList.remove('hidden');
        } else {
            resultListContainer.classList.add('hidden');
        }
    });

    /**
     * Collapse/expand the result list by toggling a CSS class.
     */
    collapseBtn.addEventListener('click', function () {
        resultListContainer.classList.toggle('collapsed');
    });

    /**
     * Render the result list based on the recorded draw history and current language.
     */
    function renderResultList() {
        resultList.innerHTML = '';
        drawHistory.forEach(function (giftNumber) {
            const li = document.createElement('li');
            li.textContent = translations[currentLanguage].giftItem(giftNumber);
            resultList.appendChild(li);
        });
    }

    /**
     * Update static and dynamic UI text according to the selected language.
     */
    function updateLanguageUI() {
        // Update title and subtitle
        const titleEl = document.querySelector('.title');
        const subtitleEl = document.querySelector('.subtitle');
        titleEl.textContent = translations[currentLanguage].title;
        subtitleEl.textContent = translations[currentLanguage].subtitle;
        // Update placeholder and button labels
        countInput.placeholder = translations[currentLanguage].placeholder;
        startButton.textContent = translations[currentLanguage].start;
        drawButton.textContent = translations[currentLanguage].draw;
        redrawButton.textContent = translations[currentLanguage].redraw;
        restartButton.textContent = translations[currentLanguage].restart;
        toggleResults.textContent = translations[currentLanguage].allResults;
        // Update draw info if draws have happened and we are in drawing section
        if (!drawSection.classList.contains('hidden') && currentIndex > 0) {
            // currentIndex is the number of draws already made
            // If there are remaining draws, use participant index; else handle separately in finalSection
            drawInfo.textContent = translations[currentLanguage].participantGift(currentIndex, participantCount);
        }
        // Update final info if we are in the final section
        if (!finalSection.classList.contains('hidden')) {
            finalInfo.textContent = translations[currentLanguage].participantGift(participantCount, participantCount);
        }
        // Re-render the result list with correct language
        renderResultList();
    }

    /**
     * Switch between languages when the globe icon is clicked.
     */
    langToggle.addEventListener('click', function () {
        currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
        updateLanguageUI();
    });

    // Set initial language texts on first load
    updateLanguageUI();
});
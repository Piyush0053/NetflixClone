// FAQ accordion functionality
document.querySelectorAll('.question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.querySelector('.answer');
        const isActive = question.classList.contains('active');
        
        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('active');
            q.querySelector('.answer').style.display = 'none';
        });

        // Toggle current answer
        if (!isActive) {
            question.classList.add('active');
            answer.style.display = 'block';
        }
    });
});

// Add loading animation for images
// document.querySelectorAll('img').forEach(img => {
//     img.style.opacity = '0';
//     img.onload = () => {
//         img.style.opacity = '1';
//     };
// }); 

function translatePage(language) {
    if (language === 'en') {
        location.reload();
        return;
    }

    // Translate all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    // Update placeholders
    const emailInput = document.querySelector('input[type="text"]');
    if (emailInput && translations[language]['Email Address']) {
        emailInput.placeholder = translations[language]['Email Address'];
    }

    // Update document title
    document.title = "Netflix इंडिया - टीवी शो और फिल्में ऑनलाइन देखें";
}

// Add event listener to language selector
document.querySelector('.language-select').addEventListener('change', function(e) {
    translatePage(e.target.value);
});
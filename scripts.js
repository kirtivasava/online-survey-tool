// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const surveyForm = document.getElementById('surveyForm');
    const addOptionButton = document.getElementById('addOption');
    const optionsContainer = document.getElementById('options');
    const surveyResultsContainer = document.getElementById('surveyResults');

    let optionCount = 2;

    addOptionButton.addEventListener('click', function() {
        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.name = `option${optionCount}`;
        optionInput.placeholder = `Option ${optionCount}`;
        optionsContainer.appendChild(optionInput);

        const optionCheckbox = document.createElement('input');
        optionCheckbox.type = 'checkbox';
        optionCheckbox.name = `selectedOptions[]`;
        optionCheckbox.value = `Option ${optionCount}`;
        const optionLabel = document.createElement('label');
        optionLabel.textContent = `Option ${optionCount}`;
        optionLabel.appendChild(optionCheckbox);
        optionsContainer.appendChild(optionLabel);

        optionCount++;
    });

    surveyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(surveyForm);
        const surveyData = {};

        formData.forEach((value, key) => {
            surveyData[key] = value;
        });

        // Get selected options
        const selectedOptions = formData.getAll('selectedOptions[]');

        // Add selected options to survey data
        surveyData.selectedOptions = selectedOptions;

        // Display survey results
        displaySurveyResults(surveyData);
    });

    function displaySurveyResults(surveyData) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('survey-result');
        resultDiv.innerHTML = `
            <h2>${surveyData.name}'s Survey</h2>
            <p><strong>Question:</strong> ${surveyData.question}</p>
            <p><strong>Selected Options:</strong></p>
            <ul>
                ${surveyData.selectedOptions.map(option => `<li>${option}</li>`).join('')}
            </ul>
            <hr>
        `;
        surveyResultsContainer.appendChild(resultDiv);
    }
});

function saveData() {
  const data = {
    timeOfDay: document.getElementById('time-of-day').value,
    environment: document.getElementById('environment').value,
    activity: document.getElementById('activity').value,
    emotion: document.getElementById('emotion').value,
    ratio: document.getElementById('ratio').value,
    stylize: document.getElementById('stylize').value,
    characters: Array.from(document.querySelectorAll('.character')).map(character => ({
      description: character.querySelector('.character-description').value,
      clothing: character.querySelector('.character-clothing').value,
    })),
  };
  localStorage.setItem('promptData', JSON.stringify(data));
}

function loadData() {
  const savedData = JSON.parse(localStorage.getItem('promptData'));
  if (!savedData) return;

  document.getElementById('time-of-day').value = savedData.timeOfDay || 'Morning';
  document.getElementById('environment').value = savedData.environment || 'Forest';
  document.getElementById('activity').value = savedData.activity || 'Walking';
  document.getElementById('emotion').value = savedData.emotion || 'Happy';
  document.getElementById('ratio').value = savedData.ratio || 1;
  document.getElementById('stylize').value = savedData.stylize || 500;

  document.getElementById('ratio-value').textContent = `${savedData.ratio}:1`;
  document.getElementById('stylize-value').textContent = savedData.stylize;

  savedData.characters?.forEach((char, index) => {
    const characterDiv = document.createElement('div');
    characterDiv.className = 'character';
    characterDiv.innerHTML = `
      <h3>Character ${index + 1}</h3>
      <label>
        Description:
        <input type="text" class="character-description" value="${char.description}">
      </label>
      <label>
        Clothing Style:
        <input type="text" class="character-clothing" value="${char.clothing}">
      </label>
      <button type="button" class="remove-character">Remove</button>
    `;
    document.getElementById('characters-container').appendChild(characterDiv);
  });
}

// Массив значений для Aspect Ratio
const aspectRatios = [
  '1:4', '1:2', '9:16', '2:3', '3:4', '5:6', '1:1', '6:5', '4:3', '3:2', '16:9', '2:1', '4:1'
];

// Функция для обновления отображаемого значения для Aspect Ratio
function updateAspectRatio() {
  const ratioIndex = parseInt(document.getElementById('ratio').value);  // Получаем индекс ползунка
  const ratioValue = aspectRatios[ratioIndex];  // Получаем строку из массива по индексу
  document.getElementById('ratio-value').textContent = ratioValue;  // Обновляем отображаемое значение
}

// Функция для обновления отображаемого значения для Stylize Amount
function updateStylizeAmount() {
  const stylizeValue = document.getElementById('stylize').value;  // Получаем значение для Stylize Amount
  document.getElementById('stylize-value').textContent = stylizeValue;  // Обновляем отображаемое значение
}

// Обработчик для ползунка Aspect Ratio
document.getElementById('ratio').addEventListener('input', () => {
  updateAspectRatio();  // Обновляем отображаемое значение для Aspect Ratio
  saveData();  // Сохраняем данные
});

// Обработчик для ползунка Stylize Amount
document.getElementById('stylize').addEventListener('input', () => {
  updateStylizeAmount();  // Обновляем отображаемое значение для Stylize Amount
  saveData();  // Сохраняем данные
});

// Функция сохранения данных
function saveData() {
  const data = {
    ratio: document.getElementById('ratio').value,
    stylize: document.getElementById('stylize').value,
  };
  localStorage.setItem('promptData', JSON.stringify(data));
}

// Функция загрузки данных
function loadData() {
  const savedData = JSON.parse(localStorage.getItem('promptData'));
  if (!savedData) return;

  document.getElementById('ratio').value = savedData.ratio || 6;  // Загружаем индекс для Aspect Ratio
  document.getElementById('stylize').value = savedData.stylize || 500;

  // Обновляем отображаемые значения после загрузки данных
  updateAspectRatio();  // Обновляем значение для Aspect Ratio
  updateStylizeAmount();  // Обновляем значение для Stylize Amount
}

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', loadData);



// Слушатели для добавления/удаления персонажей
document.getElementById('add-character').addEventListener('click', () => {
  const characterDiv = document.createElement('div');
  characterDiv.className = 'character';
  characterDiv.innerHTML = `
    <h3>Character ${document.querySelectorAll('.character').length + 1}</h3>
    <label>
      Description:
      <input type="text" class="character-description" placeholder="e.g., A tall man with a hat">
    </label>
    <label>
      Clothing Style:
      <input type="text" class="character-clothing" placeholder="e.g., Casual">
    </label>
    <button type="button" class="remove-character">Remove</button>
  `;
  document.getElementById('characters-container').appendChild(characterDiv);

  characterDiv.querySelector('.remove-character').addEventListener('click', () => {
    characterDiv.remove();
    saveData();
  });

  saveData();
});

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', loadData);

// Автосохранение при изменении
document.getElementById('prompt-form').addEventListener('input', saveData);

// Массив значений для Aspect Ratio
const aspectRatios = [
  '1:4', '1:2', '9:16', '2:3', '3:4', '5:6', '1:1', '6:5', '4:3', '3:2', '16:9', '2:1', '4:1'
];

// Функция для генерации промпта
function generatePrompt() {
  const timeOfDay = document.getElementById('time-of-day').value;
  const environment = document.getElementById('environment').value;
  const activity = document.getElementById('activity').value;
  
  // Пример получения данных для персонажей
  let characters = '';
  const characterElements = document.querySelectorAll('.character');
  characterElements.forEach((character, index) => {
    const description = character.querySelector('.character-description').value;
    const clothing = character.querySelector('.character-clothing').value;
    characters += `Character ${index + 1}: ${description}, ${clothing}; `;
  });

  // Получаем значения ползунков
  const ratio = aspectRatios[document.getElementById('ratio').value];
  const stylizeAmount = document.getElementById('stylize').value;

  // Формируем строку промпта
  const prompt = `${timeOfDay}, ${environment}, ${activity}, ${characters} --q 2 --ar ${ratio} --stylize ${stylizeAmount}`;

  // Выводим промпт на экран
  document.getElementById('generated-prompt').textContent = prompt;
}

// Обработчик для кнопки "Generate Prompt"
document.getElementById('generate-prompt').addEventListener('click', generatePrompt);


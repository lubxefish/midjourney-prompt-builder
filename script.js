document.addEventListener('DOMContentLoaded', () => {
  const charactersContainer = document.getElementById('characters-container');
  let characterCount = 0;

  // Добавление нового персонажа
  document.getElementById('add-character').addEventListener('click', () => {
    characterCount++;
    const characterDiv = document.createElement('div');
    characterDiv.className = 'character';
    characterDiv.innerHTML = `
      <h3>Character ${characterCount}</h3>
      <label>
        Description:
        <input type="text" class="character-description" placeholder="e.g., A tall man with a hat">
      </label>
      <label>
        Clothing Style:
        <input type="text" class="character-clothing" placeholder="e.g., Casual">
      </label>
    `;
    charactersContainer.appendChild(characterDiv);
  });

  // Генерация промпта
  document.getElementById('generate-prompt').addEventListener('click', () => {
    const timeOfDay = document.getElementById('time-of-day').value;
    const environment = document.getElementById('environment').value;
    const activity = document.getElementById('activity').value;
    const emotion = document.getElementById('emotion').value;
    const ratio = document.getElementById('ratio').value;
    const stylize = document.getElementById('stylize').value;

    // Собираем описания персонажей
    const characterDescriptions = [];
    document.querySelectorAll('.character').forEach(character => {
      const description = character.querySelector('.character-description').value;
      const clothing = character.querySelector('.character-clothing').value;
      characterDescriptions.push(`${description}, ${clothing}`);
    });

    // Формируем полный промпт
    const prompt = `${timeOfDay}, ${environment}, ${activity}, ${emotion}, ${characterDescriptions.join('; ')}, --ar ${ratio} --stylize ${stylize}`;
    document.getElementById('generated-prompt').value = prompt;
  });
});
// Сохранение данных в localStorage
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

// Загрузка данных из localStorage
function loadData() {
  const savedData = JSON.parse(localStorage.getItem('promptData'));
  if (!savedData) return;

  document.getElementById('time-of-day').value = savedData.timeOfDay || '';
  document.getElementById('environment').value = savedData.environment || '';
  document.getElementById('activity').value = savedData.activity || '';
  document.getElementById('emotion').value = savedData.emotion || '';
  document.getElementById('ratio').value = savedData.ratio || '16:9';
  document.getElementById('stylize').value = savedData.stylize || '';

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

// Автосохранение при изменении
document.getElementById('prompt-form').addEventListener('input', saveData);

// Загрузка при загрузке страницы
document.addEventListener('DOMContentLoaded', loadData);

// Пример с обновлениями
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

// Обработчики событий для ползунков
document.getElementById('ratio').addEventListener('input', () => {
  const ratioValue = document.getElementById('ratio').value;
  document.getElementById('ratio-value').textContent = `${(1 / ratioValue).toFixed(2)}:1`;
  saveData();
});

document.getElementById('stylize').addEventListener('input', () => {
  const stylizeValue = document.getElementById('stylize').value;
  document.getElementById('stylize-value').textContent = stylizeValue;
  saveData();
});

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

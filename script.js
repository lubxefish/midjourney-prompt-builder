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

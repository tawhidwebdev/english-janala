// Vocabulary Learning Section
const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const loadLevelWords = (level_no) => {
  fetch(`https://openapi.programming-hero.com/api/level/${level_no}`)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data));
};

const displayLevelWords = (words) => {
  const levelContainer = document.getElementById('level-container')
  levelContainer.innerHTML = "";

  words.forEach(word => {
    const wordDiv = document.createElement('div');
    wordDiv.innerHTML = `
          <div class="p-14 bg-white space-y-4 text-center rounded-xl">
            <h3 class="text-[28px] text-black font-bold">${word.word}</h3>
            <p class="text-xl text-[#2a2a2d] font-medium">Meaning /Pronounciation</p>
            <span class="text-[28px] text-[#2a2a2d] font-semibold font-bangla">${word.meaning} / ${word.pronunciation}</span>
            <div class="flex justify-between mt-8">
              <div class="w-14 h-14 rounded-lg text-[#374957] bg-[rgba(26,144,255,0.1)] flex items-center justify-center text-xl"><i class="fa-solid fa-circle-exclamation"></i></div> 
              <div class="w-14 h-14 rounded-lg text-[#374957] bg-[rgba(26,144,255,0.1)] flex items-center justify-center text-xl"><i class="fa-solid fa-volume-high"></i></div>
            </div>
          </div>
    `
    levelContainer.append(wordDiv);
  })
}
const displayLessons = (lessons) => {
  const lessonContainer = document.getElementById('lessons-container')
  lessonContainer.innerHTML = "";
  for (const lesson of lessons) {
    const lessonDiv = document.createElement('div');
    lessonDiv.innerHTML = `
      <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary font-bold"><i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>
      `
    lessonContainer.append(lessonDiv);
  }
}

loadLessons();
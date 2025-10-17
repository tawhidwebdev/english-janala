// Vocabulary Learning Section
const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const removeActiveClasss = () => {
  const lessonButtons = document.querySelectorAll('.lesson-button');
  lessonButtons.forEach((button) => {
    button.classList.remove('active');
  });
}

const loadLevelWords = (level_no) => {
  fetch(`https://openapi.programming-hero.com/api/level/${level_no}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClasss();
      const lessonBtn = document.getElementById(`lesson-btn${level_no}`);
      lessonBtn.classList.add('active');
      displayLevelWords(data.data)
    } );
};

const displayLevelWords = (words) => {
  const levelContainer = document.getElementById('level-container')
  levelContainer.innerHTML = "";
  
  if(words.length === 0){
    levelContainer.innerHTML = `
      <div class="col-span-full text-center space-y-4 .font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-base/normal text-[#79716B] font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h3 class="text-4xl/normal text-[#292524] font-medium">নেক্সট Lesson এ যান।</h3>
      </div>
    `;
    return;
  }
  words.forEach(word => {
    const wordDiv = document.createElement('div');
    wordDiv.innerHTML = `
          <div class="p-4 lg:p-14 bg-white space-y-4 text-center rounded-xl h-full">
            <h3 class="text-[28px] text-black font-bold">${word.word ? word.word : "কোনো সন্ধান পাওয়া যায়নি।"}</h3>
            <p class="text-xl text-[#2a2a2d] font-medium">Meaning /Pronounciation</p>
            <span class="text-[28px] text-[#2a2a2d] font-semibold font-bangla">${word.meaning ? word.meaning : "শব্দটির অর্থ পাওয়া যায়নি।"} / ${word.pronunciation ? word.pronunciation : "শব্দটির উচ্চারণ পাওয়া যায়নি।"}</span>
            <div class="flex justify-between mt-10">
              <div onclick="my_modal_5.showModal()" class="w-14 h-14 rounded-lg text-[#374957] bg-[rgba(26,144,255,0.1)] flex items-center justify-center text-xl"><i class="fa-solid fa-circle-exclamation"></i></div> 
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
      <button id="lesson-btn${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn lesson-button btn-outline btn-primary font-bold"><i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>
      `
    lessonContainer.append(lessonDiv);
  }
}

loadLessons();
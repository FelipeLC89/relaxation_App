const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sons
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get the lenght of the outline
    const outlineLength = outline.getTotalLength();
    //Duração
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick differente sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select sound
    timeSelect.forEach(option =>{
        option.addEventListener("click", function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60
            )}`;
        });
    });


    //Função para tocar e pausar os áudios
    const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = 'meditation-app-master/svg/pause.svg';
      } else {
          song.pause();
          video.pause();
          play.src = 'meditation-app-master/svg/play.svg';
      }
    };
    //Animação para o círculo
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = 'meditation-app-master/svg/play.svg';
            video.pause();
        }
    };
};

app();
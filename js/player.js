// Audio player functionality
document.addEventListener('DOMContentLoaded', function() {
    const audio = new Audio('./Ed Sheeran - Perfect.mp3');
    const playerIcon = document.querySelector('.player-icon');
    const playerName = document.querySelector('.player-name');

    let isPlaying = false;

    // Set song name with circular text
    const text = 'ED SHEERAN - PERFECT • ';
    const fullText = text.repeat(3); // Repeat for smooth circle

    playerName.innerHTML = `
        <svg viewBox="0 0 200 200">
            <defs>
                <path id="circlePath" d="M 100, 100 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"/>
            </defs>
            <text>
                <textPath href="#circlePath" startOffset="0%">
                    ${fullText}
                </textPath>
            </text>
        </svg>
    `;

    const playIcon = document.querySelector('.player-icon__play');
    const pauseIcon = document.querySelector('.player-icon__pause');

    // Initially hide pause icon
    pauseIcon.style.display = 'none';

    // Play/Pause toggle
    playerIcon.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playerIcon.classList.remove('playing');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            audio.play();
            playerIcon.classList.add('playing');
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        isPlaying = !isPlaying;
    });

    // Reset when song ends
    audio.addEventListener('ended', function() {
        isPlaying = false;
        playerIcon.classList.remove('playing');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
});

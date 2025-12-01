document.addEventListener('DOMContentLoaded', function() {
    const snowflakeCount = 20;
    const body = document.body;

    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        
        const startX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 3 + 2; // 2-5 seconds
        const size = Math.random() * 10 + 10; // 10-20px
        const opacity = Math.random() * 0.5 + 0.3;

        snowflake.style.left = `${startX}px`;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.fontSize = `${size}px`;
        snowflake.style.opacity = opacity;
        
        body.appendChild(snowflake);

        // Reset snowflake after animation
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake();
        });
    }
});

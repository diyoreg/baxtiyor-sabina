// Query parametrdan Base64 ni decode qilib, ismni chiqarish
        console.log('hey')

document.addEventListener('DOMContentLoaded', function() {

    try {
        // URL dan 't' parametrini olish
        const urlParams = new URLSearchParams(window.location.search);
        const encodedName = urlParams.get('t');

        const greetingElement = document.getElementById('greeting');

        if (encodedName) {
            // Base64 ni decode qilish
            const decodedName = decodeURIComponent(escape(atob(encodedName)));
            greetingElement.innerHTML = `<b>Assalomu aleykum,</b><br> Hurmatli <b style="font-weight: 700;">${decodedName}</b>!`;
        } else {
            // Query yo'q bo'lsa default text
            greetingElement.innerHTML = '<b>Assalomu aleykum,</b> <br> Hurmatli <b style="font-weight: 700;">do\'stlar</b>!';
        }
    } catch (error) {
        // Error bo'lsa default text
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            greetingElement.innerHTML = '<b>Assalomu aleykum,</b><br> Hurmatli <b style="font-weight: 700;">do\'stlar va qarindoshlar</b>!';
        }
    }
});

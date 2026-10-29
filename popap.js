// Открытие по кнопке «Подробнее»
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-popup]');
    if (!trigger) return;

    e.preventDefault();
    const popup = document.getElementById(trigger.dataset.popup);
    if (!popup) return;

    popup.querySelector('.recipe-popup__inner').scrollTop = 0;
    popup.showModal();
});

document.querySelectorAll('.recipe-popup').forEach((popup) => {
    let pressedOnBackdrop = false;

    // Запоминаем, где начался клик. Если выделять текст в попапе и отпустить
    // мышь снаружи, попап не закроется.
    popup.addEventListener('pointerdown', (e) => {
        pressedOnBackdrop = e.target === popup;
    });

    // Клик вне попапа приходит на сам <dialog>, потому что внутренний блок
    // занимает всю его площадь, а снаружи только ::backdrop
    popup.addEventListener('click', (e) => {
        if (pressedOnBackdrop && e.target === popup) popup.close();
    });

    // Esc закрывает <dialog> сам. Здесь только ставим видео на паузу.
    popup.addEventListener('close', () => {
        popup.querySelectorAll('video').forEach((video) => video.pause());
    });
});

document.addEventListener('click', (e) => {
    // Закрытие по крестику
    const closeBtn = e.target.closest('[data-popup-close]');
    if (closeBtn) {
        closeBtn.closest('dialog').close();
        return;
    }

    // Открытие по «Подробнее»
    const trigger = e.target.closest('[data-popup]');
    if (!trigger) return;

    e.preventDefault();
    const popup = document.getElementById(trigger.dataset.popup);
    if (!popup) return;

    popup.querySelector('.recipe-popup__inner').scrollTop = 0;
    popup.showModal();
});
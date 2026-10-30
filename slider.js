document.querySelectorAll('[data-compare]').forEach((slider) => {
    const handle = slider.querySelector('.compare__handle');
    let pos = 50;
    let dragging = false;

    const setPos = (value) => {
        pos = Math.min(100, Math.max(0, value));
        slider.style.setProperty('--pos', pos + '%');
        handle.setAttribute('aria-valuenow', Math.round(pos));
        // прячем текст, когда линия почти перекрыла его слой
        slider.classList.toggle('is-left', pos < 25);
        slider.classList.toggle('is-right', pos > 75);
    };

    const posFromEvent = (e) => {
        const rect = slider.getBoundingClientRect();
        return ((e.clientX - rect.left) / rect.width) * 100;
    };

    slider.addEventListener('pointerdown', (e) => {
        // клик мимо кружка — плавно переезжаем
        if (!handle.contains(e.target)) {
            slider.classList.add('is-animating');
            setPos(posFromEvent(e));
            setTimeout(() => slider.classList.remove('is-animating'), 450);
        }
        dragging = true;
        slider.classList.add('is-dragging');
        slider.setPointerCapture(e.pointerId);
    });

    slider.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        slider.classList.remove('is-animating');
        setPos(posFromEvent(e));
    });

    const stop = () => {
        dragging = false;
        slider.classList.remove('is-dragging');
    };
    slider.addEventListener('pointerup', stop);
    slider.addEventListener('pointercancel', stop);

    // управление стрелками с клавиатуры
    handle.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === 'ArrowLeft')  { setPos(pos - step); e.preventDefault(); }
        if (e.key === 'ArrowRight') { setPos(pos + step); e.preventDefault(); }
        if (e.key === 'Home')       { setPos(0);   e.preventDefault(); }
        if (e.key === 'End')        { setPos(100); e.preventDefault(); }
    });

    setPos(50);
});

document.querySelectorAll('[data-compare]').forEach((compare) => {
    const update = () => {
        const pos = parseFloat(compare.style.getPropertyValue('--pos')) || 50;
        compare.classList.toggle('is-top-active', pos > 50);
    };

    new MutationObserver(update).observe(compare, { attributes: true, attributeFilter: ['style'] });
    update();
});
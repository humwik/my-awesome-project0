const form = document.getElementById('contactForm');

form?.addEventListener('submit', (e) => {
    // 1) Сброс старых сообщений об ошибках
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.setCustomValidity('');
        field.removeAttribute('aria-invalid');
    });

    // 2) Проверка валидности
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Показываем ошибки для каждого поля
        fields.forEach(field => {
            if (!field.checkValidity()) {
                field.setAttribute('aria-invalid', 'true');
                
                // Кастомные сообщения для разных типов ошибок
                if (field.validity.valueMissing) {
                    field.setCustomValidity('Это поле обязательно для заполнения');
                } else if (field.validity.typeMismatch && field.type === 'email') {
                    field.setCustomValidity('Введите корректный email, например: example@mail.ru');
                } else if (field.validity.patternMismatch && field.type === 'tel') {
                    field.setCustomValidity('Формат: +7 (900) 000-00-00');
                } else if (field.validity.tooShort) {
                    field.setCustomValidity(`Минимум ${field.minLength} символа`);
                }
            }
        });
        
        // Показываем браузерные подсказки
        form.reportValidity();
        return;
    }

    // 3) Если всё ок - закрываем модалку и сбрасываем форму
    e.preventDefault();
    alert('Форма успешно отправлена!'); // Можно убрать, если не нужно
    dlg.close();
    form.reset();
    
    // Сбрасываем атрибуты ошибок
    fields.forEach(field => {
        field.removeAttribute('aria-invalid');
    });
});
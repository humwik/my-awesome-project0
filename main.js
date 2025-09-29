// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const dlg = document.getElementById('contactDialog');
    const openBtn = document.getElementById('openDialog');
    const closeBtn = document.getElementById('closeDialog');
    const form = document.getElementById('contactForm');

    console.log('Элементы:', { dlg, openBtn, closeBtn, form });

    // Открытие модалки
    if (openBtn && dlg) {
        openBtn.addEventListener('click', function() {
            console.log('Кнопка нажата!');
            dlg.showModal();
        });
    }

    // Закрытие модалки
    if (closeBtn && dlg) {
        closeBtn.addEventListener('click', function() {
            dlg.close();
        });
    }

    // Обработка отправки формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка валидности
            if (!form.checkValidity()) {
                const fields = form.querySelectorAll('input, textarea');
                fields.forEach(field => {
                    if (!field.checkValidity()) {
                        field.setAttribute('aria-invalid', 'true');
                    } else {
                        field.removeAttribute('aria-invalid');
                    }
                });
                
                form.reportValidity();
                return;
            }
            
            // Если форма валидна
            const success = document.createElement('div');
            success.innerHTML = '✅ <strong>Успех!</strong> Форма отправлена!';
            success.style.cssText = 'position:fixed; top:20px; right:20px; background:#4CAF50; color:white; padding:15px; border-radius:8px; z-index:10000;';
            document.body.appendChild(success);
            setTimeout(() => success.remove(), 3000);
            dlg.close();
            form.reset();
            
            // Сброс подсветки ошибок
            const fields = form.querySelectorAll('input, textarea');
            fields.forEach(field => {
                field.removeAttribute('aria-invalid');
            });
        });
    }

    // ФИКС: Закрытие по клику на подложку, но не при выделении текста
    if (dlg) {
        let startX, startY;
        
        dlg.addEventListener('mousedown', function(e) {
            // Запоминаем где начался клик
            startX = e.clientX;
            startY = e.clientY;
        });

        dlg.addEventListener('click', function(e) {
            // Закрываем только если:
            // 1. Кликнули именно на подложку (dlg)
            // 2. Курсор не сдвинулся (значит не было выделения текста)
            if (e.target === dlg && 
                Math.abs(e.clientX - startX) < 5 && 
                Math.abs(e.clientY - startY) < 5) {
                dlg.close();
            }
        });
    }

    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    // Обработчик клика
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton(newTheme);
        });
    }
    
    function updateThemeButton(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️ Светлая' : '🌙 Тёмная';
        }
    }

    // Простая валидация телефона
    const phone = document.getElementById('phone');
    if (phone) {
        phone.addEventListener('blur', function() {
            const numbers = this.value.replace(/\D/g, '');
            if (numbers.length === 11) {
                this.removeAttribute('aria-invalid');
            } else if (this.value && numbers.length !== 11) {
                this.setAttribute('aria-invalid', 'true');
            }
        });
    }
});
// Простая валидация телефона
// Простая валидация телефона
const phone = document.getElementById('phone');
if (phone) {
    phone.addEventListener('input', function() {
        // Оставляем только цифры и +
        this.value = this.value.replace(/[^\d+]/g, '');
        
        // Ограничиваем длину
        if (this.value.length > 12) {
            this.value = this.value.substring(0, 12);
        }
    });

    phone.addEventListener('blur', function() {
        const numbers = this.value.replace(/\D/g, '');
        if (numbers.length === 11) {
            this.removeAttribute('aria-invalid');
        } else if (this.value && numbers.length !== 11) {
            this.setAttribute('aria-invalid', 'true');
        }
    });
}
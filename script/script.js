// Получение необходимых селекторов
const labelSum = document.querySelector('.sum-credit__label');
const labelTerm = document.querySelector('.term-credit__label');
const sumSlider = document.querySelector('.sum-credit');
const termSlider = document.querySelector('.term-credit');
const sumProgress = document.querySelector('.sum-credit__progress');
const termProgress = document.querySelector('.term-credit__progress');

// Вычисление начальной размера заливки слайдера от начала до положения ползунка
sumProgress.style.width = `${sumSlider.value * (381 - 21) / 100}px`;
// Вычисление начальной позиции ползунка для задания положения labelSum (сумма)
labelSum.style.left = sumProgress.offsetWidth - 173 - labelSum.offsetWidth * 0.2 + "px";

// Вычисление начальной размера заливки слайдера от начала до положения ползунка
termProgress.style.width = `${(termSlider.value - 3) * (381 - 21) / 27}px`;
// Вычисление начальной позиции ползунка для задания положения labelTerm (срок)
labelTerm.style.left = termProgress.offsetWidth - 173 - labelTerm.offsetWidth * 0.2 + "px";

// событие при перемещении ползунка
sumSlider.oninput = function () {
	// Вычисление размера заливки слайдера от начала до нового положения ползунка (пределы от 1 до 100)
	// <значение_слайдера> * (<ширина_слайдера> - <max_значение(100)>) / 100%
	sumProgress.style.width = `${this.value * (381 - 21) / 100}px`;
	// Задание положения плавающей суммы
	// <ширина_заливки> - <ширина_labelSum>, а дальше значения необходимые,
	// чтобы сумма находилась по центру ползунка (подбирал экспериментальным путем)
	labelSum.style.left = sumProgress.offsetWidth - (labelSum.offsetWidth * 0.05) - 173 + "px";
	// Вычисление разницы в положении от левой границы страницы sumSlider и labelSum
	const delta = sumSlider.getBoundingClientRect().left - labelSum.getBoundingClientRect().left;
	// если больше 0px
	if (delta > 0) {
		// прилипаем к левому краю слайдера
		labelSum.style.left = "-150px";
	} else if (delta < -300) // если меньше -300px
		// прилипаем к правому краю слайдера
		labelSum.style.left = "140px";
	// Вывод на экран выбранной суммы
	labelSum.textContent = this.value + ' 000 ₽';
};

// событие при перемещении ползунка
termSlider.oninput = function () {
	// Вычисление размера заливки слайдера от начала до нового положения ползунка (пределы от 3 до 30)
	// (<значение_слайдера(от 3 до 30)> - <min_значение(3)>) *
	// (<ширина_слайдера> - <ширина_ползунка>) / (<max_значение(30)> - <min_значение(3)>)
	termProgress.style.width = `${(this.value - 3) * (381 - 21) / (30 - 3)}px`;
	// Задание положения плавающей суммы
	// <ширина_заливки> - <ширина_labelTerm>, а дальше значения необходимые,
	// чтобы дни находились по центру ползунка (подбирал экспериментальным путем)
	labelTerm.style.left = termProgress.offsetWidth - (labelTerm.offsetWidth * 0.2) - 173 + "px";
	// Вычисление разницы в положении от левой границы страницы sumSlider и labelSum
	const delta = termSlider.getBoundingClientRect().left - labelTerm.getBoundingClientRect().left;
	// если больше 0px
	if (delta > 0) {
		// прилипаем к левому краю слайдера
		labelTerm.style.left = "-160px";
	} else if (delta < -300) // если меньше -300px
		// прилипаем к ПРАвому краю слайдера
		labelTerm.style.left = "145px";
	// Вывод на экран выбранной суммы

	labelTerm.textContent = this.value; // Вывод на экран выбранного срока

	// Проверка на соответствие 'день/дня/дней'
	if (this.value == 1 || this.value == 21) {
		labelTerm.textContent += ' день';
	} else if (this.value >= 2 && this.value <= 4 || this.value >= 22 && this.value <= 24) {
		labelTerm.textContent += ' дня';
	} else {
		labelTerm.textContent += ' дней';
	}
};

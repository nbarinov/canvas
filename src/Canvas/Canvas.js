import './canvas.css';

export default class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas'); // указатель на холст
    this.c = canvas.getContext('2d'); // указатель на контекст рисования 
    this.colorSelect = document.getElementById('colorSelect'); // селектор с цветами
    this.widthInput = document.getElementById('widthInput'); // указатель на input width
    this.valueInput = document.querySelector('.canvas__span'); // указатель на span value
    this.clearButton = document.getElementById('clear'); // указатель на кнопку clear

    this.x1 = 0;
    this.y1 = 0;
    this.color = colorSelect.value,
    this.width = widthInput.value;

    this.lines = new Array(); // массив линий

    this.changeValue = this.changeValue.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.omMouseMove = this.omMouseMove.bind(this);
    this.clear = this.clear.bind(this);
  }

  /**
   * Изменение занчения элемента
   * 
   * @param {*} element - элемент
   * @param {*} value - значение
   */
  changeValue(element, value) {
    if(this[element] !== value) {
      this[element] = value;
    }

    if(element === 'width') {
      this.valueInput.innerHTML = value;
    }
  }

  /**
   * Очистка холста
   */
  clear() {
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height); // очищаем хост
    this.lines = new Array(); // очищаем массив линий
  }

  /**
   * Отслеживание события нажатия кнопки мыши
   * 
   * @param {*} e - Mouse Event
   */
  onMouseDown(e) {
    // если зажата левая кнопка мыши
    if(e.which === 1) {
      // сохраняем позицию курсора
      this.x1 = e.offsetX;
      this.y1 = e.offsetY;

      // начинаем отслеживать перемещение курсора
      this.canvas.onmousemove = this.omMouseMove;
    }
  }

  /**
   * Отслеживания события перемещения курсора
   * 
   * @param {*} e - Mouse Event 
   */
  omMouseMove(e) {
    // удаляем последний элемент массива линий
    if(this.lines.length > 0) {
      delete this.lines[this.lines.length - 1];
    }

    // добавляем линию
    this.lines.push({
      path: [this.x1, this.y1, e.offsetX, e.offsetY],
      color: this.color,
      width: this.width,
    });
    
    // перерисовываем холст
    this.redrawLines();
  }

  /**
   * Отслеживание события разжатия кнопки мыши
   * 
   * @param {*} e - Mouse Event
   */
  onMouseUp(e) {
    // если координаты положения курсора не совпадают с начальными
    if (e.offsetX !== this.x1 && e.offsetY !== this.y1) {
      // добавляем новую линию
      this.lines.push({
        path: [this.x1, this.y1, e.offsetX, e.offsetY],
        color: this.color,
        width: this.width,
      });

      // перерисовываем холст
      this.redrawLines();
    }

    // заканчиваем отслеживание перемещения курсора
    this.canvas.onmousemove = null;
  }

  /**
   * Перерисовка хоста
   */
  redrawLines() {
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height); // очищаем хост

    this.lines.map(line => this.drawLine(line)); // добавляем линии
  }

  /**
   * Отрисовка линии
   * 
   * @param {*} line - объект линии
   */
  drawLine(line) {
    this.c.save();

    this.c.beginPath();
    this.c.lineWidth = line.width;
    this.c.strokeStyle = line.color;
    this.c.moveTo(line.path[0], line.path[1]);
    this.c.lineTo(line.path[2], line.path[3]);
    this.c.stroke();

    this.c.restore();
  }

  /**
   * Запуск
   */
  run() {
    // отслеживаем события параметром
    this.colorSelect.addEventListener('change', e => this.changeValue('color', e.target.value));
    this.widthInput.oninput = e => this.changeValue('width', e.target.value);
    // отслеживаем события клика
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.clearButton.addEventListener('click', this.clear);
  }
}
import './canvas.css';

export default class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas'); // указатель на холст
    this.c = canvas.getContext('2d'); // указатель на контекст рисования 
    this.colorSelect = document.getElementById('colorSelect'); // селектор с цветами
    this.widthInput = document.getElementById('widthInput');
    this.valueInput = document.querySelector('.canvas__span');

    this.x1 = 0;
    this.y1 = 0;
    this.color = colorSelect.value,
    this.width = widthInput.value;

    this.changeValue = this.changeValue.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  changeValue(element, value) {
    if(this[element] !== value) {
      this[element] = value;
    }

    if(element === 'width') {
      this.valueInput.innerHTML = value;
    }
  }

  onMouseDown(e) {
    this.x1 = e.offsetX;
    this.y1 = e.offsetY;
  }

  onMouseUp(e) {
    if (e.offsetX !== this.x1 && e.offsetY !== this.y1) {
      this.c.beginPath();
      this.c.lineWidth = this.width;
      this.c.strokeStyle = this.color;
      this.c.moveTo(this.x1, this.y1);
      this.c.lineTo(e.offsetX, e.offsetY);
      this.c.stroke();
    }
  }

  run() {
    // отслеживаем события параметром
    this.colorSelect.addEventListener('change', e => this.changeValue('color', e.target.value));
    this.widthInput.oninput = e => this.changeValue('width', e.target.value);
    // отслеживаем события клика
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
  }
}
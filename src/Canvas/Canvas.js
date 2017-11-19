import './canvas.css';

export default class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas'); // указатель на холст
    this.c = canvas.getContext('2d'); // указатель на контекст рисования 
    this.colorSelect = document.getElementById('colorSelect'); // селектор с цветами
    this.widthInput = document.getElementById('widthInput');

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
  }

  onMouseDown(e) {
    this.x1 = e.clientX;
    this.y1 = e.clientY;
  }

  onMouseUp(e) {
    if (e.clientX !== this.x1 && e.clientY !== this.y1) {
      this.c.beginPath();
      this.c.lineWidth = this.width;
      this.c.strokeStyle = this.color;
      this.c.moveTo(this.x1, this.y1);
      this.c.lineTo(e.clientX, e.clientY);
      this.c.stroke();
    }
  }

  run() {
    // отслеживаем события параметром
    this.colorSelect.addEventListener('change', e => this.changeValue('color', e.target.value));
    this.widthInput.addEventListener('change', e => this.changeValue('width', e.target.value));
    // отслеживаем события клика
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
  }
}
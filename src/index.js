import Canvas from './Canvas';

const c = new Canvas({
    canvas: 'canvas',
    color: 'colorSelect',
    width: 'widthInput',
    widthValue: 'widthValue',
    clear: 'clear',
});
c.run();
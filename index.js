let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const getCanvas = (url) => fetch(url)
  .then(response => response.json())
  .then(arrData => {
    let arr = [];
    arrData.forEach(el => {
      el.forEach(el => arr.push(el))
    })
  return arr;
})

const canvasDraw = (arr, color) => {

  let canWidth = canvas.getBoundingClientRect().width / Math.sqrt(arr.length);
  let x = 0;
  let y = 0;

  arr.forEach(el => {

    if (color == 'rgb') {
      ctx.fillStyle = `rgb(${el[0]},${el[1]},${el[2]})`;
    };

    if (color == 'hex') {
      ctx.fillStyle = `#${el}`;
    };

    ctx.fillRect(x, y, canWidth, canWidth);
    x += canWidth;

    if (x == canvas.getBoundingClientRect().width) {
      x = 0;
      y += canWidth;
    }
  });
}

const getImg = (image) => {
  
  let pic = new Image();
  pic.src = image;
  pic.addEventListener('load', () => {
    ctx.drawImage(pic, 0, 0, 512, 512);
  });
}


const showCanvas = () => {
  let fourToFour = document.getElementById('four-to-four');
  let thirtyTwoByThirtyTwo = document.getElementById('thirty-two-by-thirty-two');
  let image = document.getElementById('image');


  fourToFour.addEventListener('click', async () => {
  let arr = await getCanvas('./data/4x4.json');
  await canvasDraw(arr, 'hex');
  });

  thirtyTwoByThirtyTwo.addEventListener('click', async () => {
    let arr = await getCanvas('./data/32x32.json');
    await canvasDraw(arr, 'rgb');
  });

  image.addEventListener('click', async () => {
    let image = './data/image.png';
    getImg(image);
  });
};

document.addEventListener('DOMContentLoaded', showCanvas);
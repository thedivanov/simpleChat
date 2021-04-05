// function getImage() {
//     let seed = 2;
//     let url = 'https://avatars.dicebear.com/api/human/' + seed + '.svg';

//     let img;
//     let p1 = createImage(url);
//     p1.then(res => {
//         img = res;
//         document.getElementById('hehm').appendChild(img);
//         console.log('res: ', img, " ", res);
//     });
//     console.log(img);
 
// }

// function createImage(url) {
//     return new Promise((resolve, _) => {
//         let img = document.createElement('img');
//         img.src = url;
//         resolve(img);
//     })
// }

// getImage();

let seed = 2;
    let url = 'https://avatars.dicebear.com/api/human/' + seed + '.svg';

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))


toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0')
  .then(dataUrl => {
    console.log('RESULT:', dataUrl)
  })
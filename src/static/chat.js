const WS = new WebSocket('ws://localhost:8080/ws/chat');

var user = {};



const getAvatar = url => fetch(url)
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}));

// ------------------WS BLOCK------------------

WS.onopen = () => {
    console.log('WebSocket open connetcion');
    getUserData();
}

WS.onerror = error => {
    console.log('WebSocket close the connection with error: ', error.data);
}

WS.onmessage = mess => {
    const message = JSON.parse(mess.data);
    console.log('mess: ', mess.data);

    switch (message.type) {
        case 'newMSG':
            createMessage(message.text, decodeImageFromBase64(message.avatar), message.username);

            break;
    }
}

// -----------------END OF WS BLOCK--------------

function sendMSG() {
    let text = document.getElementById('chat-input').value;
    if (!text || !user.username || !user.avatar) {
        return;
    }
    document.getElementById('chat-input').value = '';
    const msg = {
        type: "sendMSG",
        text: text,
        avatar: user.avatar,
        username: user.username,
    }
    WS.send(JSON.stringify(msg));
}

function getUserData() {
    let seed = getRandomInt();
    let url = 'https://avatars.dicebear.com/api/human/' + seed + '.svg';

    let p1 = getAvatar(url);
    p1.then(res => {
        let img = document.createElement('img');
        img.src = res;
        img.id = 'avatar';
        user.avatar = res;
        document.getElementById('user-avatar').appendChild(img);

        user.username = getUsername();
        let userDiv = document.createElement('div');
        userDiv.id = 'username';
        userDiv.className = 'text-white';
        userDiv.innerText = user.username;
        document.getElementById('user_info').appendChild(userDiv);
    })
   
}

function getRandomInt(max = 10000) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getUsername() {
    arr = ['Hello World', 'Kek Memovich', 'Red Sckined', 'The Flash', '"Superman"', 'BestProgrammerInTh3w0rld', 'Skilled Guy'];

    return arr[getRandomInt(arr.length)];
}

function createMessage(text, avatar, username) {
    if (!text || !avatar || !username) return;
    console.log('useravatar: ', avatar);

    let message = document.createElement('div');
    message.className = "bg-red-900 w-full";

    let avatarDiv = document.createElement('div');
    avatarDiv.className = 'flex';
    avatarDiv.id = 'avatar_div';

    let ava = document.createElement('img');
    ava.src = avatar.src;
    ava.id = 'message_avatar';
    avatarDiv.appendChild(ava);

    let user_name = document.createElement('div');
    user_name.innerText = username;
    avatarDiv.appendChild(user_name);

    let usernameDiv = document.createElement('div');
    usernameDiv.innerText = username;

    let message_text = document.createElement('div');
    message_text.className = 'bg-green-600';
    message_text.innerText = text;

    message.appendChild(avatarDiv);
    message.appendChild(message_text);

    document.getElementById('mess').insertBefore(message, document.getElementById('mess').firstChild);
}

function decodeImageFromBase64(data) {
    image = new Image();
    image.src = data;

    return image;
}
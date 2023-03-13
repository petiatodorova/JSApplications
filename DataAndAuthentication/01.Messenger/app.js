const url = `http://localhost:3030/jsonstore/messenger`;
const messages = document.getElementById('messages');


function attachEvents() {
    document.getElementById('submit').addEventListener('click', postMessage);
    document.getElementById('refresh').addEventListener('click', loadAllMessages);
}

async function loadAllMessages() {
    let res = await fetch(url);

    if (res.ok) {
        let data = await res.json();
        messages.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n');
    } else {
        return `HTTP error: ${res.status}`;
    }
}

async function postMessage() {
    let author = document.getElementsByName('author')[0].value;
    let content = document.getElementsByName('content')[0].value;

    let data = {
        'author': author,
        'content': content
    }
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    document.getElementsByName('author')[0].value = '';
    document.getElementsByName('content')[0].value = '';
}



attachEvents();
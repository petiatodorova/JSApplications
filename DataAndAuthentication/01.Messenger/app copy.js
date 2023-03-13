const url = `http://localhost:3030/jsonstore/messenger`;
const messages = document.getElementById('messages');


function attachEvents() {
    document.getElementById('submit').addEventListener('click', postMessage);
    document.getElementById('refresh').addEventListener('click', loadAllMessages);
}

async function loadAllMessages() {
    const res = await fetch(url);
    const data = await res.json();

    messages.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n');
}

async function postMessage() {
    const [author, content] = [document.getElementsByName('author')[0], document.getElementsByName('content')[0]];
    if (author.value !== '' && content.value !== '') {
        await request(url, { author: author.value, content: content.value });
        // messages += `${author.value}: ${content.value}`;
        author.value = '';
        content.value = '';
    } else {
        alert('Error! All fields are required!')
    }


}

async function request(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option)
        }
    };

    const response = await fetch(url, option);

    return response.json();

}

attachEvents();
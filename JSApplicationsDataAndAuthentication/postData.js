function postData() {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const data = {
        author: 'Test Author',
        title: 'The Title'
    };

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(url, options);
}
async function doRequest() {
    let url = `http://localhost:3030/jsonstore/messenger`;
    let res = await fetch(url);

    if (res.ok) {
        let data = await res.json();
        return Object.values(data);
    } else {
        return `HTTP error: ${res.status}`;
    }
}

doRequest();
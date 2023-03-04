start();

function start() {
    document.getElementById('create_btn').addEventListener('click', postData);
    document.getElementById('load_btn').addEventListener('click', loadData);
}

async function loadData() {
    const url = 'http://localhost:3030/jsonstore/collections/autoparts';
    const response = await fetch(url);
    const data = await response.json();

    const rows = Object.values(data).map(createRow);
    document.getElementById('table_body').replaceChildren(...rows);
}

async function postData() {
    // console.log('posting');
    const label = document.getElementById('part_label').value;
    const price = Number(document.getElementById('part_price').value);
    const qty = Number(document.getElementById('part_qty').value);

    const partData = {
        label,
        price,
        qty
    }

    const url = 'http://localhost:3030/jsonstore/collections/autoparts';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(partData)
    };

    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result);
}

function createRow(record) {
    const element = document.createElement('tr');
    element.innerHTML = `
    <td>${record._id}</td>
    <td>${record.label}</td>
    <td>EUR ${record.price}</td>
    <td>${record.qty}</td>
    <td></td>`

    return element;
}
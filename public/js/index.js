/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function clearText() {
    document.getElementById('url').value = '';
}

function postUrl() {
    const url = document.getElementById('url').value;
    fetch('/shortenUrl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url
        })
    }).then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }).then(json => {
        document.getElementById('output').style.display = 'block';
        document.getElementById('shorten-url').innerText = json.shortenUrl;
    }).catch(error => {
        console.log('Fetch Error: ', error);
    });
}

async function copyToClipboard() {
    const text = document.getElementById('shorten-url').innerText;
    await navigator.clipboard.writeText(text);
}
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.querySelector('#userId').value;
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;

    const body = {
        id: Number(id),
        title: title,
        content: content
    };

    const res = await fetch('http://localhost:3010/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
});
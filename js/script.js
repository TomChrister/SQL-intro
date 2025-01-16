// Submit form
document.querySelector('form').addEventListener("submit", async (e) => {
    e.preventDefault();
    const content = document.querySelector("#content").value;
    const id = document.querySelector("#userId").value;

    const body = {
        content: content,
        id: id,
    };

    const res = await fetch ("http://localhost:3010/test", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data = await res.json();
    console.log(data);
});


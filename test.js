async function postTest() {
    const res = await fetch("http://localhost:1030/test", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ content: `Første fra node'; DROP TABLE test;` }),
    });
    const data = await res.text();
    console.log(data);
}

postTest();
export function getAveragesMures(data) {
    return fetch('http://localhost:4200/allAverageMS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({key:data}),
    })
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function countUrbanRural(year) {
    return fetch(`http://localhost:4200/countUrbanRural/${year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => error.json());
}

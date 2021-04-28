export function countUrbanRural() {
    return fetch('http://localhost:4200/countUrbanRural', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => error.json());
}

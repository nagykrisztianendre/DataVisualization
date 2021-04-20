export function getAllAverageInOne() {
    return fetch('http://localhost:4200/allGradesInOne', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => error.json());
}

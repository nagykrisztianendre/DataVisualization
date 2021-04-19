export function getAllAverage() {
    return fetch('http://localhost:4200/allGrades', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => error.json());
}

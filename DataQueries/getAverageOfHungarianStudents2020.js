export function getAverageOfHungarianStudents2020() {
    return fetch('http://localhost:4200/grades2020', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => error.json());
}

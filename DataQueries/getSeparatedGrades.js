export function separatedGrades(year) {
    return fetch(`http://localhost:4200/separatedGrades/all/${year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function separatedGradesMagyar(year) {
    return fetch(`http://localhost:4200/separatedGrades/magyar/${year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function countUrbanRural(year) {
    return fetch(`http://localhost:4200/countUrbanRural/all/${year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => error.json());
}

export function countUrbanRuralMagyar(year) {
    return fetch(`http://localhost:4200/countUrbanRural/magyar/${year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => error.json());
}

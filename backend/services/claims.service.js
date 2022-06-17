const ClaimModel = require('../models/claims.model');

const names = [
    'Olivia', 'Liam', 'Emma', 'Noah', 'Amelia', 'Oliver', 'Ava', 'Elijah', 'Sophia', 'Lucas',
    'Charlotte', 'Levi', 'Isabella', 'Mason', 'Mia', 'Asher', 'Luna', 'James', 'Harper', 'Ethan',
    'Gianna', 'Mateo', 'Evelyn', 'Leo', 'Aria', 'Jack', 'Ella', 'Benjamin', 'Ellie', 'Aiden', 'Mila',
    'Logan', 'Layla', 'Grayson', 'Avery', 'Jackson', 'Camila', 'Henry', 'Lily', 'Wyatt', 'Scarlett',
    'Sebastian', 'Sofia', 'Carter', 'Nova', 'Daniel', 'Aurora', 'William', 'Chloe', 'Alexander', 'Riley',
    'Ezra', 'Nora', 'Owen', 'Hazel', 'Michael', 'Abigail', 'Muhammad', 'Rylee', 'Julian', 'Penelope',
    'Hudson', 'Elena', 'Luke', 'Zoey', 'Samuel', 'Isla', 'Jacob', 'Eleanor', 'Lincoln', 'Elizabeth',
    'Gabriel', 'Madison', 'Jayden', 'Willow', 'Luca', 'Emilia', 'Maverick', 'Violet', 'David', 'Emily',
    'Josiah', 'Eliana', 'Elias', 'Stella', 'Jaxon', 'Maya', 'Kai', 'Paisley', 'Anthony', 'Everly',
    'Isaiah', 'Addison', 'Eli', 'Ryleigh', 'John', 'Ivy', 'Joseph', 'Grace', 'Matthew'
];

const last_names = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
    'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore',
    'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez'
];

const randomNumber = (max, min) => (
    Math.floor(Math.random() * (max - min + 1) + min))

let claims = Array(50).fill(0).map((_, i) => ({
    id: `xybanvcdz-${i}`,
    "name_title": null,
    "first_name": names[randomNumber(names.length - 1, 0)],
    "middle_name": "S",
    "last_name": last_names[randomNumber(last_names.length - 1, 0)],
    "suffix": null,
    "ssn": randomNumber(999999999, 100000000),
    "claim_date": `${randomNumber(12, 1)}/${randomNumber(29, 1)}/${randomNumber(2022, 1901)}`,
    "street1": null,
    "street2": null,
    "street3": null,
    "street4": null,
    "city": null,
    "state": null,
    "zip": randomNumber(90120, 21101),
    'description': `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Tempor id eu nisl nunc mi ipsum faucibus. Dictum at tempor commodo
    ullamcorper a lacus vestibulum.
    `.slice(
        Math.min(randomNumber(240, 0), randomNumber(240, 0)),
        Math.max(randomNumber(240, 0), randomNumber(240, 0))
    )
}));

class ClaimsService {
    static read() {
        return (
            claims
        )
    }

    static create(data) {
        /**
         * Do not use this alpha generator to create id's
         * Bad Practice will create dupplicate id's.
        */
        const alpha = Array(26).fill().map(
            (_, i) => String.fromCharCode(97 + i)
        );
        let chars = [];
        for (let i = 0; i < 12; ++i) {
            chars = [
                ...chars, alpha[
                Math.round(Math.random() * 26)
                ]
            ];
        }
        data = {
            ...data, id: chars.join('')
        }
        const claim = new ClaimModel(data)
        claims = [
            ...claims, claim
        ]
        return (
            claims
        )
    }

    static retrieve(id) {
        const claim = claims.filter(obj => obj.id == id)
        return (
            claim[0]
        )
    }

    static update(id, data) {
        claims.map(obj => obj.id == id && Object.assign(obj, data))
        return (
            claims
        )
    }

    static delete(id) {
        claims = claims.filter(obj => obj.id != id)
        return (
            claims
        )
    }
}

module.exports = ClaimsService;

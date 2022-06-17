const UserModel = require('../models/user.model');

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

let users = Array(50).fill(0).map((_, i) => ({
  id: `hsofasfop-${i}`,
  name_title: null,
  first_name: names[randomNumber(names.length - 1, 0)],
  middle_name: "",
  last_name: last_names[last_names.length - 1, 0],
  ssn: randomNumber(999999999, 100000000),
  date: `${randomNumber(12, 1)}/${randomNumber(29, 1)}/${randomNumber(2022, 1901)}`,
  street1: null,
  street2: null,
  city: null,
  state: null,
  zip: randomNumber(90120, 21101),
}));

class UserService {

  static read() {
    return (
      users
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
    const user = new UserModel(data)

    users = [
      ...users, user
    ]
    return (
      users
    )
  }

  static retrieve(id) {
    const user = users.filter(obj => obj.id == id)
    return (
      user[0]
    )
  }

  static update(id, data) {
    users.map(obj => obj.id == id && Object.assign(obj, data))
    return (
      users
    )
  }

  static delete(id) {
    users = users.filter(obj => obj.id != id)

    return (
      users
    )
  }
}

module.exports = UserService;

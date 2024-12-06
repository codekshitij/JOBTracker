const bcrypt = require('bcryptjs');

const passwordToHash = 'password123'; // Replace with your input password

bcrypt.hash(passwordToHash, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});
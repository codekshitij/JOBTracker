const bcrypt = require('bcryptjs');

const inputPassword = 'password123'; // Replace with the password you want to test
const hashedPassword = '$2a$10$6ZJmg4uX.aewz0NYGsoFYOvBweOM66enuoLtmj7rZRk7hXreyxKZq'; // Replace with the hash from your database

bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error('Error comparing passwords:', err);
    } else {
        console.log('Password valid:', result); // Should print true if the input matches the hash
    }
});

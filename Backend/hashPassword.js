const bcrypt = require('bcryptjs');
const { User } = require('./src/models'); // Adjust the path as per your project structure

async function rehashPasswords() {
    const users = await User.findAll();

    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Rehash password
        user.password = hashedPassword;
        await user.save(); // Save updated hash back to the database
        console.log(`Updated password for: ${user.email}`);
    }

    console.log('All passwords rehashed and updated!');
}

rehashPasswords()
    .then(() => process.exit())
    .catch(err => {
        console.error('Error while rehashing passwords:', err);
        process.exit(1);
    });

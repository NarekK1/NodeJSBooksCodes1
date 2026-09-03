import bcrypt from 'bcrypt';

//salt rounds for hashing passwords
const saltRounds = 10;
 
//function to hash password
export const hashPassword = (password) => {
    //generate salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //log the salt
    console.log(salt);

    //hash the password with the salt
    return bcrypt.hashSync(password, salt);
};

//function to compare password
export const comparePassword = (plain, hashed) => bcrypt.compareSync(plain, hashed);
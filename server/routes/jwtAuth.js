const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");


// register route

router.post("/register", async (req, res) => {
try {

    // destructure
    
    const { name, email, password} = req.body;

    // if user exist

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

  if (user.rows.length !== 0) {
      return res.status(401).send("user already exist");
  }

//   bcrypt

const saltRound = 10;
const salt = await bcrypt.genSalt(saltRound);

const bcryptPassword = await bcrypt.hash(password, salt);

// enter new user in database

const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

// res.json(newUser.rows[0]);

//  generating jwt


const token = jwtGenerator(newUser.rows[0].user_id);



res.json({ user_details:newUser.rows[0], jwt:token });


} catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
}
});


// login route

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

module.exports = router;
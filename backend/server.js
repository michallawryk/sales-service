const express = require('express');
const pool = require('./database');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const secret = process.env.JWT_SECRET || 'secret';

app.post('/api/login', async (req, res) => {
  let { username, password} = req.body
  
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rowCount > 0) {
      let validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (validPassword) {
        const token = jwt.sign({ id: user.rows[0].id}, secret, { expiresIn: '1h' });
        res.json({ token });
      }
      else {
        res.status(400).json({ error: 'Invalid password' });
      }
    } else {
      res.status(400).json({ error: 'User does not exist' });
    }
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
})

app.post('/api/register', async (req, res) => {
  let { username, email, password} = req.body
  let hashedPAssword = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPAssword, email])
    res.status(201).json({ message: 'Successfully added new user'})
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'User already exists' })
  }
})

app.get("/api/ads/list", async (req, res) => {
  try {
    const ads = await pool.query('SELECT * FROM ads ORDER BY updated_date DESC')
    res.status(200).json(ads.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.post("/api/ads/search", async (req, res) => {
  let { question } = req.body;
  try {
    const pattern = `%${question}%`;
    const ads = await pool.query(
      `SELECT * FROM ads WHERE title ILIKE $1 OR description ILIKE $1 ORDER BY updated_date DESC`, 
      [pattern]
    )
    res.status(200).json(ads.rows)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.post("/api/users/ads/list", async (req, res) => {
  let { owner_id } = req.body
  try {
    const ads = await pool.query('SELECT * FROM ads WHERE owner_id=$1 ORDER BY updated_date DESC', [owner_id])
    res.status(200).json(ads.rows)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.post('/api/ads/fav/add', async (req, res) => {
  let { user_id, ad_id } = req.body
  try {
    await pool.query('INSERT INTO fav (user_id, ad_id) VALUES ($1, $2)', [user_id, ad_id])
    res.status(201).json({ message: 'Successfully added new fav'})
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Could not add fav' })
  }
})

app.post('/api/ads/fav/delete', async (req, res) => {
  let { user_id, ad_id } = req.body
  try {
    await pool.query('DELETE FROM fav WHERE user_id=$1 AND ad_id=$2', [user_id, ad_id])
    res.status(200).json({ message: `Successfully deleted fav from user ${user_id}`})
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Could not delete fav' })
  }
})

app.post("/api/users/fav/list", async (req, res) => {
  let { user_id } = req.body
  try {
    const ads = await pool.query('SELECT ads.* FROM ads JOIN fav ON ads.id = fav.ad_id WHERE fav.user_id = $1 ORDER BY updated_date DESC', [user_id])
    res.status(200).json(ads.rows)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/api/ads/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try{
    let ads = await pool.query('SELECT ads.*, users.username AS owner_name From ads JOIN users ON ads.owner_id = users.id WHERE ads.id = $1',[id]);
    if(ads.rows.length == 0) {
      return res.status(404).json({error: 'Advertisement not found' });
    }
    res.json(ads.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(port)
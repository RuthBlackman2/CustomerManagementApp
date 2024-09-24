
const cors = require('cors');

const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const dotenv = require('dotenv')
const pg = require('pg');
dotenv.config()

const { Pool } = pg;

const pool = new Pool({
  user:'postgres',
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PWD,
  port: 5432,
})


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// get all customers
app.get('/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY uid ASC');

    res.status(200).json(result.rows)

  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  }
})

// get customer with id
app.get('/customers/:id', async (req, res) => {
  const {id} = req.params

  try{
    const result = await pool.query(`SELECT * FROM customers WHERE uid = $1`, [id]);

    if(result.rows.length > 0){
      res.status(200).json(result.rows)
    }else{
      res.status(404).json({message: 'Customer not found'})
    }

  }catch (err){
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  }
})

// create a new customer - post
app.post('/customers', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Bad request: name, email, and password are required.' });
  }

  pool.query(
    `INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING uid`,
    [name, email, password],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const customerId = results.rows[0].uid; 
      res.status(201).json({ message: `New customer added with ID ${customerId}` });
    }
  );
});

// update a customer - put
app.put('/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!id || isNaN(id) || !name || !email || !password) {
    return res.status(400).json({ message: 'Bad request: valid id, name, email, and password are required.' });
  }

  try {
    const customerCheck = await pool.query(`SELECT 1 FROM customers WHERE uid = $1`, [id]);
    
    if (customerCheck.rowCount === 0) {
      return res.status(404).json({ message: `Customer with ID ${id} not found.` });
    }

    await pool.query(
      `UPDATE customers SET name = $1, email = $2, password = $3 WHERE uid = $4`,
      [name, email, password, id]
    );

    res.status(200).json({ message: `Customer with ID ${id} updated successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// delete a customer - delete
app.delete('/customers/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Bad request: ID must be a number.' });
  }

  try {
    const customerCheck = await pool.query(`SELECT 1 FROM customers WHERE uid = $1`, [id]);

    if (customerCheck.rowCount === 0) {
      return res.status(404).json({ message: `Customer with ID ${id} not found.` });
    }

    await pool.query(`DELETE FROM customers WHERE uid = $1`, [id]);

    res.status(200).json({ message: `Customer deleted with ID ${id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var db = require("./database.js");
var db2 = require("./database.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


app.get('/api/get', (req, res) => {
  db.all('SELECT * FROM users10', (err, userdata) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving the database' });
    } else {
      res.json(userdata);
    }
  });
});


app.post('/api/create-account', (req, res) => {
  const { No, password } = req.body;

  if (!No || !password) {
    return res.status(400).json({ error: 'No and password are required fields' });
  }

  const sql = 'INSERT INTO users10 (No, password) VALUES (?, ?)';
  const params = [No, password];
  
  db.run(sql, params, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Account is created successfully' });
  });
});

app.post('/api/signin', (req, res) => {
    const { No, password } = req.body;
  
    
    const sql = 'SELECT No, password FROM users10 WHERE No = ?';
  
    
    db.get(sql, [No], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving the database' });
      } else if (row && row.password === password) {
        
        res.json({
          message: 'Logging is successful',
          data: row,
        });
      } else {
        
        res.status(401).json({
          error: 'Invalid data',
        });
      }
    });
  });


  app.post('/api/data', (req, res) => {
    const { first, last, email, phone,address, city, state, code, position, comments} = req.body;
  
    if (!req.body) {
      return res.status(400).json({ error: 'please fill out the required fields' });
    }
  
    const sql = 'INSERT INTO employees2 (first, last, email, phone,address, city, state, code, position, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [first, last, email, phone,address, city, state, code, position, comments];
    
    db2.run(sql, params, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Data is added successfully' });
    });
  });

  app.get('/api/get/data', (req, res) => {
    db.all('SELECT * FROM employees2', (err, userdata) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving the database' });
      } else {
        res.json(userdata);
      }
    });
  });

  app.delete('/api/delete/:taskId', (req, res) => {
    const taskId = req.params.taskId;
  
    db.run('DELETE FROM employees2 WHERE id = ?', [taskId], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Data deleted successfully' });
      });
    });


    app.put('/api/put/:taskId', (req, res) => {
      const taskId = req.params.taskId;
      const updatedTask = req.body;

      db.run('UPDATE employees2 SET first = ?, last = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, code = ?, position = ?, comments = ?  WHERE id = ?', [updatedTask.first, updatedTask.last, updatedTask.email, updatedTask.phone, updatedTask.address, updatedTask.city, updatedTask.state, updatedTask.code, updatedTask.position, updatedTask.comments, taskId], (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Data updated successfully' });
        });
      });
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

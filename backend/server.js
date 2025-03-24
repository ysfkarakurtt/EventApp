const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const socket = require('socket.io')


app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', methods: ["GET", "POST"], allowedHeaders: ["Content-Type"], credentials: true }));

// == Db connection ==
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'event_app'
});

db.connect((err) => {
    if (err) {
        console.error("DB connection error: " + err.stack);
        return;
    }
    console.log("DB connected successful.");
});

// == User Operation ==

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE username= ? AND password = ? ";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err)
            return res.json("Login unsuccesful");
        if (data.length > 0) {
            const userId = data[0].id;

            return res.json({ message: "login success", id: userId });
        }
        else {
            return res.json("login failed");
        }
    })
})

app.post('/user', (req, res) => {
    const sql = "SELECT * FROM user WHERE id= ?  ";
    db.query(sql, [req.body.login_id,], (err, data) => {
        if (err)
            return res.json("User not found");
        if (data.length > 0) {
            return res.json({ message: "User found", user: data[0] });
        }
        else {
            return res.json("user failed");
        }
    })
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user ";
    db.query(sql, [], (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened");
        }
        res.status(200).json(result);
    })
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO user (name_surname, gender, birth, username, password) VALUES (?,?,?,?,?)";
    db.query(sql, [req.body.name_surname, req.body.gender, req.body.birth, req.body.username, req.body.password], (err, result) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).send("Error happened");
        }
        const userID = result.insertId;
        console.log("Inserted user ID:", userID);
        res.status(200).json({ message: "User saved successful", userID: userID });
    });
});

app.post('/delete_user', (req, res) => {
    const sql = "DELETE FROM user WHERE id=?";

    db.query(sql, [req.body.id], (err, result) => {

        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened.");
        }
        res.status(200).send("User deleted successful")
    })
})

app.post('/delete_participant', (req, res) => {
    const sql = "DELETE FROM participant WHERE event_id=?";

    db.query(sql, [req.body.id], (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened");
        }
        res.status(200).send("Participant deleted successful")
    })
})


app.post('/update_profile', (req, res) => {
    const sql = "UPDATE user SET username = ?, password = ?, email = ?, name_surname = ?, birth = ?, gender = ?, img = ? , location = ?, interest = ? WHERE id = ?";

    db.query(sql, [req.body.username, req.body.password, req.body.email, req.body.name_surname, req.body.birth, req.body.gender, req.body.imgPath, req.body.location, req.body.selectedCategoriesString, req.body.login_id], (err, result) => {

        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened.");
        }
        res.status(200).send("Profile edited.")
    })
})

// == Participant Operation ==

app.post('/join_event', (req, res) => {
    const sql = "SELECT * FROM event JOIN participant ON event.id = participant.event_id WHERE participant.user_id = ?";

    db.query(sql, [req.body.userID], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Error happened.");
        }

        return res.json({ message: "User points found.", events: result });
    });
});

app.post('/save_participant', (req, res) => {
    const sql = "INSERT INTO participant (event_id,user_id) VALUES(?,?)";

    db.query(sql, [req.body.eventID, req.body.userID], (err, result) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).send("Error happened.");
        }
        res.status(200).send("Joined event successful.")
    })
})

// == Point Operation ==

app.post('/save_point', (req, res) => {
    const sql = "INSERT INTO point (user_id,points,date) VALUES(?,?,?)";

    db.query(sql, [req.body.userID, req.body.point, req.body.date,], (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened");
        }
        res.status(200).send("Point added.")
    })
})

app.post('/points', (req, res) => {
    const sql = "SELECT SUM(points) AS total_points FROM point WHERE user_id = ?";

    db.query(sql, [req.body.userID], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Error happened");
        }

        const totalPoints = result[0].total_points || 0;

        return res.json({ message: "User points found", total_points: totalPoints });
    });
});

// == Event Operation ==

app.post('/add', (req, res) => {
    const sql = "INSERT INTO event (name,img,category,description,date,time,location,user_id) VALUES(?,?,?,?,?,?,?,?)";

    db.query(sql, [req.body.eventName, req.body.imgPath, req.body.category, req.body.description, req.body.date, req.body.time, req.body.location, req.body.login_id], (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened");
        }
        res.status(200).send("")
    })
})

app.post('/edit', (req, res) => {
    const sql = "UPDATE event SET name = ?, category = ?, description = ?, date= ?, time= ?, location = ?, img = ? WHERE id = ?";

    db.query(sql, [req.body.eventName, req.body.category, req.body.description, req.body.date, req.body.time, req.body.location, req.body.img, req.body.id], (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened.");
        }
        res.status(200).send("Event edited.")
    })
})

app.post('/delete', (req, res) => {
    const sql = "DELETE FROM event WHERE id=?";
    db.query(sql, [req.body.id], (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened.");
        }
        res.status(200).send("Event deleted.")
    })
})


app.post('/my_event', (req, res) => {
    const sql = "SELECT * FROM event WHERE user_id= ?  ";

    db.query(sql, [req.body.login_id,], (err, data) => {
        if (err)
            return res.json("User events not found.");

        if (data.length > 0) {
            return res.json({ message: "User events found", user: data });
        }
        else {
            return res.json("Event not found");
        }
    })
})

app.post('/event_detail', (req, res) => {
    const sql = "SELECT * FROM event WHERE id= ?  ";

    db.query(sql, [req.body.id,], (err, data) => {
        if (err)
            return res.json("User events not found.");

        if (data.length > 0) {
            return res.json({ message: "User events found", user: data });
        }
        else {
            return res.json("event not found");
        }
    })
})

app.get('/events', (req, res) => {
    const sql = "SELECT * FROM event ";
    db.query(sql, [], (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened");
        }
        res.status(200).json(result);
    })
})

app.post('/interest_events', (req, res) => {
    const { category, location, historyCategory } = req.body;

    const sql = " SELECT *, (CASE WHEN category = ? THEN 3 WHEN category LIKE ? THEN 2 ELSE 0 END) AS category_score, (CASE WHEN location = ? THEN 3 WHEN location LIKE ? THEN 2 ELSE 0 END) AS location_score, (CASE WHEN category = ? THEN 3 WHEN category LIKE ? THEN 2 ELSE 0 END) AS history_category_score FROM event ORDER BY (category_score + location_score + history_category_score) DESC, category_score DESC, location_score DESC, history_category_score DESC";

    const values = [category, `%${category}%`, location, `%${location}%`, historyCategory, `%${historyCategory}%`];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened");
        }
        res.status(200).json(result);
    })
})

app.post('/check_event_conflict', (req, res) => {
    const userId = req.body.userID;
    const newEventDate = req.body.newEventDate;
    const newEventTime = req.body.newEventTime;

    const sql = `
        SELECT * 
        FROM participant ue
        JOIN event e ON ue.event_id = e.id
        WHERE ue.user_id = ? AND e.date = ? AND e.time = ?
    `;

    const values = [
        userId,
        newEventDate,
        newEventTime
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error", err);
            return res.status(500).send("Error happened");
        }

        if (result.length > 0) {
            return res.status(409).send("Time conflict found!");
        }

        res.status(200).send("Time conflict not found.");
    });
});

// == Multer Settings ==
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    const imageUrl = req.file.filename;

    res.status(200).json({ imageUrl });
});

app.use('/upload', express.static(path.join(__dirname, '../frontend/public/uploads')));
const server = app.listen(8081, () => { console.log("Listening on port 8081..."); });

const io = socket(server, { cors: { origin: 'http://localhost:5173', methods: ["GET", "POST"], allowedHeaders: ["Content-Type"], credentials: true } });

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })
});
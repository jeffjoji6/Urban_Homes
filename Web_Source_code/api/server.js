const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer  = require('multer')
const nodemailer = require("nodemailer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //  cb(null, '../public/uploads')
    cb(null, '../uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })

const app = express();
app.use(cors({
  credentials: true,
  origin: true, // Allow all origins
}));


app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'yourSecretKey', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
}));



app.get('/all/', (req, res) => {
  const q = 'SELECT full_name,user_type,experience FROM users u JOIN users_details p ON u.user_id = p.user_id';


  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//-------------------------------------------DATABASE CONNECTION----------------------------------------------------


const db = mysql.createConnection({
    host: '103.145.51.250',
    user: 'HalaHomeUsr',
    password: 'Nypl08$06',
    database: 'halahomeappdb'
})


//-------------------------------------------QUERY METHODS-----------------------------------------------------------

app.post('/queries', (req,res) => {
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const q = "INSERT INTO queries (name,email,phone,company,message,created_at) VALUES (?);";
  const values = [
    req.body.name,
    req.body.email,
      req.body.phone,
      req.body.company,
      req.body.message,
      createdAt
    ];
    
    db.query(q,[values],(err,data) => {
      if(err) return res.json(err)
      return res.json("Signed Up succesfully")
  })
})
//-------------------------------------------OTP METHODS-----------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 25,
  secure: "ENCRYPTION" === "tls",
  auth: {
    user: "dev@waysaheadglobal.com",
    pass: "Singapore@2022",
  },
});

app.post('/signup/otp', async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;

  // Check if the email already exists in the database
  const checkUserExistQuery = "SELECT user_id FROM users WHERE email = ?";
  const checkUserExistValues = [email];

  db.query(checkUserExistQuery, checkUserExistValues, async (userExistError, userExistResult) => {
    if (userExistError) {
      return res.status(500).send("Internal Server Error");
    }

    if (userExistResult.length > 0) {
      // User with the same email already exists
      return res.status(400).send("User already exists. Log-in instead.");
    }

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    const HTML = `<!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width">
        <title>HalaHomes Welcome and OTP Verification</title>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    
            @media only screen and (max-width: 599px) {
                .tableCon {
                    width: 100% !important;
                }
                .midText {padding: 15px !important; font-size: 16px !important; line-height: 26px !important;}
                .serviceCon {padding: 0 15px 15px 15px !important;}
                .serviceHd {font-size: 26px !important;}
                .serviceSubHd {font-size: 20px !important;}
            }
        </style>
    </head>
    
    <body style="margin:10px; background:#fff;">
        <table border="0" cellspacing="0" cellpadding="0" class="tableCon" width="800" align="center"
            style="font-family: 'Roboto', sans-serif; color: #000; border: 1px solid #eeeeee;">
            <tr>
                <td bgcolor="#404B60" align="center"><br></td>
            </tr>
            <tr>
                <td class="midText" style="padding: 35px; font-family: 'Roboto', sans-serif; color: #404B60; font-size: 20px; line-height: 30px;">
                    
                    Dear ${name} <br><br>
                    Welcome to HalaHomes! We are excited to have you on board.<br>
                    Your OTP for account verification is: <strong>${otp}</strong><br><br>
                    Please use this OTP to complete the verification process. If you didn't request this, please ignore this message.<br><br>
                    
                    Best regards,<br>
                    The HalaHomes Team
                </td>
            </tr>       
            <tr>
                <td bgcolor="#994b00" style="padding: 20px 0;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center" style="padding-bottom: 10px;"><a href="#" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px; text-decoration: none;">Privacy Policy</a></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px;">Copyright &copy; 2023 HalaHomes</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    try {
      const mailOptions = {
        from: "dev@waysaheadglobal.com",
        to: email,
        subject: "Your OTP for Account Verification",
        html: HTML.replace('${otp}', otp), // Replace '${otp}' with the actual variable
      };

      const info = await transporter.sendMail(mailOptions);
      const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

      console.log("Email sent:", info.response);
      const saveOTPQuery = "INSERT INTO users (otp, email_verified_at, email) VALUES (?, ?, ?)";
      db.query(saveOTPQuery, [otp, timestamp, email], (saveOTPError, saveOTPResult) => {
        if (saveOTPError) {
          return res.json({ success: false, message: saveOTPError });
        }

        return res.json({ success: true, message: "OTP sent successfully" });
      });

    } catch (error) {
      console.error("Error sending email:", error);
      return res.json({ success: false, message: "Error sending email" });
    }
  });
});



app.post('/login/otp', (req, res) => {
  const email = req.body.email;

  // Check if the user exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], async (checkUserError, checkUserResult) => {
    if (checkUserError) {
      return res.status(500).send("Internal Server Error");
    }

    if (checkUserResult.length === 0) {
      // User does not exist, return an error
      return res.status(400).send("User does not exist");
    }

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Update your email template with the OTP
    const HTML = `<!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width">
        <title>HalaHomes OTP Verification</title>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    
            @media only screen and (max-width: 599px) {
                .tableCon {
                    width: 100% !important;
                }
                .midText {padding: 15px !important; font-size: 16px !important; line-height: 26px !important;}
                .serviceCon {padding: 0 15px 15px 15px !important;}
                .serviceHd {font-size: 26px !important;}
                .serviceSubHd {font-size: 20px !important;}
            }
        </style>
    </head>
    
    <body style="margin:10px; background:#fff;">
        <table border="0" cellspacing="0" cellpadding="0" class="tableCon" width="800" align="center"
            style="font-family: 'Roboto', sans-serif; color: #000; border: 1px solid #eeeeee;">
            <tr>
                <td bgcolor="#404B60" align="center"><br></td>
            </tr>
            <tr>
                <td class="midText" style="padding: 35px; font-family: 'Roboto', sans-serif; color: #404B60; font-size: 20px; line-height: 30px;">
                    
                    Dear ${email} <br><br>
                    Your OTP for account verification is: <strong>${otp}</strong><br><br>
                    Please use this OTP to complete the verification process. If you didn't request this, please ignore this message.<br><br>
                    
                    Best regards,<br>
                    The HalaHomes Team
                </td>
            </tr>       
            <tr>
                <td bgcolor="#994b00" style="padding: 20px 0;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center" style="padding-bottom: 10px;"><a href="#" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px; text-decoration: none;">Privacy Policy</a></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px;">Copyright &copy; 2023 HalaHomes</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    try {
      const mailOptions = {
        from: "dev@waysaheadglobal.com",
        to: email,
        subject: "Your OTP for Account Verification",
        html: HTML,
      };

      // Send the email with OTP
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);

      // Save the OTP in the database
      const saveOTPQuery = "UPDATE users SET otp = ? WHERE email = ?";
      db.query(saveOTPQuery, [otp, email], (saveOTPError, saveOTPResult) => {
        if (saveOTPError) {
          return res.json({ success: false, message: "Error saving OTP" });
        }

        return res.json({ success: true, message: "OTP sent successfully" });
      });

    } catch (error) {
      console.error("Error sending email:", error);
      return res.json({ success: false, message: "Error sending email" });
    }
  });
});



//-------------------------------------------LOGIN/SIGNUP METHODS----------------------------------------------------


app.post('/login', (req, res) => {
    const email = req.body.email;
    const otp = Number(req.body.otp);

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.json(err);
        } 
        else {
            if (results.length > 0){
                const storedOtp = results[0].otp;
                const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const updatedAt = createdAt;
                res.cookie('user_id', results[0].user_id, { maxAge: 86400000, httpOnly: false });
                res.cookie('Full Name', results[0].full_name, { maxAge: 86400000, httpOnly: false });
                res.cookie('Category', results[0].user_type, { maxAge: 86400000, httpOnly: false });
                if (Number(otp) === storedOtp) {
                  const q = "INSERT INTO notifications (user_id,notification,created_at, updated_at) VALUES (?);";
                  const values = [
                      results[0].user_id,
                       results[0].full_name + " has logged in.",
                      createdAt, 
                      updatedAt
                  ];

                  db.query(q,[values],(err,data) => {
                      if(err) return res.json(err)
                      return res.json({ message: 'Login successful', user: results[0].user_id, status: results[0].status,});
                  })

                } else {
                    return res.json({ message: 'Invalid credentials' });
                }
            } else {
                return res.json(results);
            }
        }
    });
});

app.post('/users', (req, res) => {
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;

  // Check if the provided OTP matches the stored OTP for the given email
  const checkOTPQuery = "SELECT user_id FROM users WHERE email = ? AND otp = ?";
  const checkOTPValues = [req.body.email, req.body.otp];

  db.query(checkOTPQuery, checkOTPValues, (otpCheckError, otpCheckResult) => {
    if (otpCheckError) {
      return res.status(500).send("Internal Server Error");
    }

    if (otpCheckResult.length === 0) {
      // Invalid OTP provided
      return res.status(400).send("Invalid OTP provided");
    }

    // Check if the phone number or email already exist in the database
    const checkUserExistQuery = "SELECT user_id FROM users WHERE phone = ? OR email = ?";
    const checkUserExistValues = [req.body.phone, req.body.email];

    db.query(checkUserExistQuery, checkUserExistValues, (userExistError, userExistResult) => {
      if (userExistError) {
        return res.status(500).send("Internal Server Error");
      }

      if (userExistResult.length > 1) {
        // User with the same phone number or email already exists
        return res.status(400).send("User already exists");
      }

      // Valid OTP and user does not already exist, proceed with the user update
      const updateUserQuery = "UPDATE users SET full_name=?, user_type=?, phone=?, created_at=?, updated_at=? WHERE email=? AND otp=?;";
      const updateUserValues = [
        req.body.full_name,
        req.body.user_type,
        req.body.phone,
        createdAt,
        updatedAt,
        req.body.email,
        req.body.otp
      ];

      db.query(updateUserQuery, updateUserValues, (updateError, updateResult) => {
        if (updateError) {
          return res.json(updateError);
        } else {
          const notifQuery = "INSERT INTO notifications (user_id, notification, created_at, updated_at) VALUES (?);";
          const notifValues = [
            updateResult.insertId,
            req.body.full_name + " (" + req.body.email + ")" + " has created an account as a " + req.body.user_type,
            createdAt,
            updatedAt
          ];

          db.query(notifQuery, [notifValues], (notifError, notifResult) => {
            if (notifError) {
              return res.json(notifError);
            }

            const userDetailsQuery = "INSERT INTO users_details (user_id, created_at, updated_at) VALUES (?, ?, ?);";
            const userDetailsValues = [
              updateResult.insertId,
              createdAt,
              updatedAt
            ];

            db.query(userDetailsQuery, userDetailsValues, (userDetailsError, userDetailsResult) => {
              if (userDetailsError) {
                return res.json(userDetailsError);
              }

              res.json("Signed Up successfully");
            });
          });
        }
      });
    });
  });
});



//-------------------------------------------COMMUNITY METHODS----------------------------------------------------

app.post('/interests',(req,res) => {
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
     const updatedAt = createdAt;
    const q = "INSERT INTO users_details (id,user_id,recommended_topic,featured_home_disscussion,created_at,updated_at) VALUES (?);";
    const values = [
        req.body.id,
        req.body.user_id,
        req.body.recommended_topic,
        req.body.featured_home_disscussion,
        createdAt,
        updatedAt
    ];

    db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        return res.json("poted succesfully")
    })
})

app.get('/posts/', (req, res) => {
  let q = 'SELECT * FROM posts';

  const queryParams = [];
  if (req.query.user_id) {
    q += ' WHERE user_id = ?';
    queryParams.push(req.query.user_id);
  } else if (req.query.post_id) {
    q = 'SELECT u.user_id, u.profile_pic,p.media_url ,`full_name`, `question`, `description`, `intrest_category_id`, `post_id`, p.created_at, like_count FROM posts p JOIN users u ON p.user_id = u.user_id WHERE p.post_id = ? AND p.status=1';
    queryParams.push(req.query.post_id);
  }

  db.query(q, queryParams, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/posts/:intrest_category_id', (req, res) => {
  const interest_category_id = req.params.intrest_category_id;
  const currentUserId = req.query.user_id; // Assuming user ID is available in the request (e.g., from authentication middleware)
  
  const q = `
      SELECT u.user_id, u.full_name, u.profile_pic,p.question, p.description, p.intrest_category_id, p.post_id, p.views, p.created_at, p.like_count  
      FROM posts p 
      JOIN users u ON p.user_id = u.user_id 
      WHERE p.intrest_category_id = ? 
      AND p.status=1

  `;
  
  db.query(q, [interest_category_id, currentUserId], (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  });
});

app.post('/upload',upload.single("file"),function(req,res){
    const file = req.file
    // console.log(file.filename)
    res.status(200).json(file.filename)
})

app.post('/posts/',(req,res) => {

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const full_name = req.cookies['Full Name'];
    const updated_at = created_at;
    const q = "INSERT INTO posts (user_id,question,description,media_url,intrest_category_id,created_at,updated_at) VALUES (?);";
    const values = [
        req.body.user_id,
        req.body.question,
        req.body.description,
        req.body.media_url,
        req.body.recommended_topic,
        created_at,
        updated_at
    ];

    db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        else{
          const notif_q = "INSERT INTO notifications (user_id,notification,created_at, updated_at) VALUES (?);";
                  const notif_values = [
                      req.body.user_id,
                      full_name+" made a post.",
                      created_at, 
                      updated_at
                  ];

                  db.query(notif_q,[notif_values],(err,data) => {
                      if(err) return res.json(err)
                      res.json("Posted successfully")})
            }
    })
})


//-------------------------------------------VIEW METHODS----------------------------------------------------


app.post('/posts/view_count', (req, res) => {
    const post_id = req.body.post_id; // Assuming postId is received from the request
    const user_id = req.body.user_id; // The substring you want to check
    // Check if the substring exists in the existing text
    const selectQuery = `SELECT views FROM posts WHERE post_id = ${post_id}`;
    db.query(selectQuery, (selectErr, selectResult) => {
      if (selectErr) {
        res.status(500).send('Error fetching data from the database');
      } else {
        let existingText = selectResult[0].views;
        if (existingText === null) {
            existingText = user_id;
          } else if (existingText.includes(user_id)) {
            // res.status(400).send('Substring already exists in the text');
            // return;
          } else {
            // Concatenate the new string to the existing text
            existingText += `,${user_id}`;
          }
    
          // Update the database with the concatenated text
          const updateQuery = `UPDATE posts SET views = '${existingText}' WHERE post_id = ${post_id}`;
          db.query(updateQuery, (updateErr, updateResult) => {
            if (updateErr) {
              res.status(500).send('Error updating data in the database');
            } 
          });
        }
    });
  });


//-------------------------------------------lIKE/DISLIKE METHODS----------------------------------------------------

app.post('/posts/likes/', (req, res) => {
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updatedAt = createdAt;
    const q = "INSERT INTO likes (user_id, post_id, created_at, updated_at) VALUES (?);";
    const values = [
      req.body.user_id,
      req.body.post_id,
      createdAt,
      updatedAt
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      const incrementQuery = 'UPDATE posts SET like_count = like_count + 1 WHERE post_id = ?';
      db.query(incrementQuery, [req.body.post_id], (err, result) => {
        if (err) {
          console.error('Error incrementing like count:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }return res.status(200).json({ message: 'Post liked successfully' });
      });
    });
  });

app.delete('/posts/dislikes/', (req, res) => {
  const { user_id, post_id } = req.body;
  if (!user_id || !post_id) {
    return res.status(400).json({ error: 'Missing user_id or post_id' });
  }

  const q = 'DELETE FROM likes WHERE user_id = ? AND post_id = ?';
  const values = [user_id, post_id];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error deleting dislike:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: 'No matching record found to delete' });
    }
    const decrementQuery = 'UPDATE posts SET like_count = CASE WHEN like_count > 0 THEN like_count - 1 ELSE 0 END WHERE post_id = ?';
    db.query(decrementQuery, [post_id], (err, result) => {
      if (err) {
        console.error('Error decrementing like count:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(200).json({ message: 'Post disliked successfully' });
    });
  });
});
  

app.get('/posts/likes/:user_id', (req,res) => {
    const user_id = req.params.user_id;
    const q = "SELECT post_id FROM likes WHERE user_id =(?) ";
    db.query (q,[user_id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.get('/comments/likes/:user_id', (req,res) => {
    const user_id = req.params.user_id;
    const q = "SELECT comments_id FROM likes WHERE user_id =(?) ";
    db.query (q,[user_id],(err,data)=>{

        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post('/comments/likes/', (req, res) => {
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updatedAt = createdAt;
    const q = "INSERT INTO likes (user_id, comments_id, created_at, updated_at) VALUES (?);";
    const values = [
      req.body.user_id,
      req.body.comment_id,
      createdAt,
      updatedAt
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
  
      // Update the like_count in the comments table
      const incrementQuery = 'UPDATE comments SET like_count = like_count + 1 WHERE id = ?';
      db.query(incrementQuery, [req.body.comment_id], (err, result) => {
        if (err) {
          console.error('Error incrementing like count:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Comment liked successfully' });
      });
    });
  });
  
  app.delete('/comments/dislikes/', (req, res) => {
    const { user_id, comment_id } = req.body;
    if (!user_id || !comment_id) {
      return res.status(400).json({ error: 'Missing user_id or comment_id' });
    }
  
    const q = 'DELETE FROM likes WHERE user_id = ? AND comments_id = ?';
    const values = [user_id, comment_id];
  
    db.query(q, values, (err, data) => {
      if (err) {
        console.error('Error deleting dislike:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: 'No matching record found to delete' });
      }
      const decrementQuery = 'UPDATE comments SET like_count = CASE WHEN like_count > 0 THEN like_count - 1 ELSE 0 END WHERE id = ?';
      db.query(decrementQuery, [comment_id], (err, result) => {
        if (err) {
          console.error('Error decrementing like count:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Comment disliked successfully' });
      });
    });
  });
  

//-------------------------------------------WISHLIST METHODS----------------------------------------------------

// Add a post to the wishlist
app.post('/wishlist/add', (req, res) => {
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const q = "INSERT INTO wishlists (user_id, wishlist_post_id, created_at) VALUES (?, ?, ?)";
  const values = [
    req.body.user_id,
    req.body.wishlist_post_id,
    createdAt
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error adding post to wishlist:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.status(200).json({ message: 'Post added to wishlist successfully' });
  });
});

app.delete('/wishlist/remove', (req, res) => {
  const { user_id, wishlist_post_id } = req.body;
  if (!user_id || !wishlist_post_id) {
    return res.status(400).json({ error: 'Missing user_id or wishlist_post_id' });
  }
  
  const q = 'DELETE FROM wishlists WHERE user_id = ? AND wishlist_post_id = ?';
  const values = [user_id, wishlist_post_id];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error removing post from wishlist:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: 'No matching record found to delete from wishlist' });
    }
    
    return res.status(200).json({ message: 'Post removed from wishlist successfully' });
  });
});

app.post('/wishlist/portfolio/add', (req, res) => {
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const q = "INSERT INTO wishlists (user_id, wishlist_user_id, created_at) VALUES (?, ?, ?)";
  const values = [
    req.body.user_id,
    req.body.wishlist_user_id,
    createdAt
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error adding user to wishlist:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.status(200).json({ message: 'Portfolio added to wishlist successfully' });
  });
});

app.delete('/wishlist/portfolio/remove', (req, res) => {
  const { user_id, wishlist_user_id } = req.body;
  if (!user_id || !wishlist_user_id) {
    return res.status(400).json({ error: 'Missing user_id or wishlist_user_id' });
  }

  const q = 'DELETE FROM wishlists WHERE user_id = ? AND wishlist_user_id = ?';
  const values = [user_id, wishlist_user_id];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error removing user from wishlist:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: 'No matching record found to delete from wishlist' });
    }

    return res.status(200).json({ message: 'user removed from wishlist successfully' });
  });
});
// Get wishlist posts by user_id
app.get('/wishlist/portfolio/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const wishlist_user_id= req.query.user_id
  const q =  req.query.user_id?"SELECT * FROM wishlists WHERE user_id = ? AND wishlist_user_id= ?":"SELECT * FROM wishlists w JOIN users u ON w.wishlist_user_id=u.user_id WHERE w.user_id = ?";
  const qf =  req.query.wishlisted_user_id?"SELECT * FROM wishlists w JOIN users u ON w.user_id=u.user_id WHERE w.wishlist_user_id = ?":q;
  db.query(qf, [user_id,wishlist_user_id], (err, data) => {
    if (err) {
      console.error('Error fetching wishlist posts:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(data);
  });
});

app.get('/wishlist/posts/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const q = "SELECT wishlist_post_id FROM wishlists WHERE user_id = ?";
  db.query(q, [user_id], (err, data) => {
    if (err) {
      console.error('Error fetching wishlist posts:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(data);
  });
});


//-------------------------------------------COMMENTS METHODS----------------------------------------------------


app.post('/posts/comments/', (req,res) => {

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updated_at = created_at;
    const q = "INSERT INTO comments (user_id,post_id,content,modified_by,modified_on,created_at,updated_at) VALUES (?);";
    const values = [
        req.body.user_id,
        req.body.post_id,
        req.body.content,
        req.body.user_id,
        created_at,
        created_at,
        updated_at
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        return res.json("posted succesfully")
    })
})

app.get('/posts/comments/:post_id', (req, res) => {
  const post_id = req.params.post_id;
  const currentUserId = req.query.user_id; // Assuming user ID is available in the request (e.g., from authentication middleware)
  
  const q = `
      SELECT c.user_id, c.id, u.full_name, u.profile_pic ,c.like_count, c.created_at, c.content 
      FROM comments c 
      JOIN users u ON c.user_id = u.user_id 
      WHERE c.post_id = ? 
      AND c.user_id NOT IN (
          SELECT reported_id 
          FROM report
          WHERE user_id = ? AND type = 1
      )
  `;
  
  db.query(q, [post_id, currentUserId], (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  });
});


//-------------------------------------------PORTFOLIO--------------------------------------------------

app.get('/portfolio/:user_id', (req, res) => {
  const query = `
    SELECT
      p.id AS portfolio_id,
      p.user_id,
      p.category,
      p.media_url AS cover_img,
      pd.id AS portfolio_details_id,
      pd.media_url AS project_img,
      pd.area,
      pd.length,
      pd.width,
      pd.location
    FROM 
      portfolio p
    
    LEFT JOIN 
      portfolio_details pd ON p.id = pd.portfolio_id
    WHERE 
      p.user_id = ?`;

  db.query(query, [req.params.user_id], (err, data) => {
    if (err) {
      console.error('Error fetching portfolio data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const restructuredPortfolio = {};
    data.forEach(item => {
      const portfolioID = item.portfolio_id;

      if (!restructuredPortfolio[portfolioID]) {
        restructuredPortfolio[portfolioID] = {
          portfolio_id: item.portfolio_id,
          user_id: item.user_id,
          category: item.category,
          cover_img: item.cover_img,
          details: []
        };
      }

      restructuredPortfolio[portfolioID].details.push({
        portfolio_details_id: item.portfolio_details_id,
        project_img: item.project_img,
        area: item.area,
        length: item.length,
        width: item.width,
        location: item.location
      });
    });

    const finalPortfolioData = Object.values(restructuredPortfolio);
    res.status(200).json(finalPortfolioData);
  });
});

app.get('/portfolio/details/:id', (req, res) => {
  const query = `
    SELECT
    pd.id ,
    pd.media_url,
    pd.area,
    pd.length,
    pd.width,
    pd.location,
    p.category
    FROM 
      portfolio_details pd
    JOIN 
      portfolio p
       ON pd.portfolio_id= p.id
    WHERE 
      pd.id = ?`;

  db.query(query, [req.params.id], (err, data) => {
    if (err) {
      console.error('Error fetching portfolio data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(data);
  });
});

app.post('/portfolio/details', (req,res) =>{
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updated_at = created_at;
  const q = "INSERT INTO portfolio_details (portfolio_id,media_url,area,length,width,location,created_at, updated_at) VALUES (?);";
                const values = [
                    req.body.portfolio_id,
                    req.body.media_url,
                    req.body.area,
                    req.body.length,
                    req.body.width,
                    req.body.location,
                    created_at, 
                    updated_at
                ];

                db.query(q,[values],(err,data) => {
                    if(err) return res.json(err)
                    res.json("Project added successfully")})
          

})
app.post('/portfolio/:user_id', (req,res) =>{
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updated_at = created_at;
  const q = "INSERT INTO portfolio (user_id,created_at, updated_at) VALUES (?);";
                const values = [
                    req.params.user_id,
                    created_at, 
                    updated_at
                ];

                db.query(q,[values],(err,data) => {
                    if(err) return res.json(err)
                    res.json("Project added successfully")})
          

})
app.post('/portfolio/cover/:portfolio_id', (req, res) => {
  const media_url = req.body.media_url;
  const portfolioId = req.params.portfolio_id;

  // Update the media_url for the cover image of the portfolio
  const updateQuery = 'UPDATE portfolio SET media_url = ? WHERE id = ?';
  db.query(updateQuery, [media_url, portfolioId], (err, result) => {
    if (err) {
      console.error('Error updating cover image:', err);
      return res.status(500).json({ error: 'Error updating cover image' });
    }

    res.status(200).json({ message: 'Cover image updated successfully' });
  });
});

app.post('/portfolio/category/:portfolio_id', (req, res) => {
  const category = req.body.category;
  const portfolioId = req.params.portfolio_id;

  // Update the media_url for the cover image of the portfolio
  const updateQuery = 'UPDATE portfolio SET category = ? WHERE id = ?';
  db.query(updateQuery, [category, portfolioId], (err, result) => {
    if (err) {
      console.error('Error updating cover image:', err);
      return res.status(500).json({ error: 'Error updating cover image' });
    }

    res.status(200).json({ message: 'Cover image updated successfully' });
  });
});

app.delete('/portfolio/:portfolio_id', (req, res) => {
  const portfolioId = req.params.portfolio_id;

  // Delete portfolio details associated with the portfolio_id
  const deleteDetailsQuery = 'DELETE FROM portfolio_details WHERE portfolio_id = ?';
  db.query(deleteDetailsQuery, [portfolioId], (errDetails, dataDetails) => {
    if (errDetails) {
      console.error('Error deleting portfolio details:', errDetails);
      return res.status(500).json({ error: 'Error deleting portfolio details' });
    }

    // Delete portfolio based on portfolio_id
    const deletePortfolioQuery = 'DELETE FROM portfolio WHERE id = ?';
    db.query(deletePortfolioQuery, [portfolioId], (errPortfolio, dataPortfolio) => {
      if (errPortfolio) {
        console.error('Error deleting portfolio:', errPortfolio);
        return res.status(500).json({ error: 'Error deleting portfolio' });
      }

      res.status(200).json({ message: 'Portfolio and its details deleted successfully' });
    });
  });
});
app.delete('/portfolio/details/:portfolio_id', (req, res) => {
  const portfolioId = req.params.portfolio_id;
    const deletePortfolioQuery = 'DELETE FROM portfolio_details WHERE id = ?';
    db.query(deletePortfolioQuery, [portfolioId], (errPortfolio, dataPortfolio) => {
      if (errPortfolio) {
        console.error('Error deleting project:', errPortfolio);
        return res.status(500).json({ error: 'Error deleting portfolio' });
      }

      res.status(200).json({ message: 'Portfolio and its details deleted successfully' });
    });
});
//-------------------------------------------PROFILE----------------------------------------------------

app.get('/profile/display/', (req,res) => {
  const q = req.query.user_id?"SELECT p.profile_pic,u.user_id,`user_type`, `full_name`, `email`, `phone`, `city`, `provience`,`about_us` FROM users p LEFT JOIN users_details u ON p.user_id = u.user_id WHERE p.user_id = ?":"SELECT * FROM users";
  db.query (q,[req.query.user_id],(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
})
})

//-------------------------------------------USER PROFILE----------------------------------------------------

app.get('/UserProfile/Profile/:user_id', (req,res) => {
  const user_id = req.params.user_id;
  const q = "SELECT u.user_id, u.profile_pic, u.full_name, u.email, u.phone, p.user_id, p.city, p.provience, p.zip_code, p.company_name, p.about_us, p.experience FROM users u LEFT JOIN users_details p ON u.user_id = p.user_id WHERE u.user_id = ?";
  db.query(q,[user_id],(err,data) => {
      if(err) return res.json(err)
      return res.json(data)
  })
})

app.post('/UserProfile/Profile/', (req, res) => {
  const q = `
  UPDATE users_details SET company_name = ?, about_us = ?, city = ?, provience = ?, zip_code = ?, experience = ? WHERE user_id = ?
  `;
  const [company_name, about_us, city, provience,zip_code,experience,  user_id] = [req.body.company_name,req.body.about_us, req.body.city, req.body.provience, req.body.zip_code, req.body.experience, Number(req.body.user_id)];
  db.query(q, [company_name, about_us, city, provience, zip_code, experience, user_id], (err, data) => {
    if (err) {
      return res.json(err);
    }

    // Now, update the users table
    let updateUsersQuery = `
      UPDATE users
      SET full_name = ?, profile_pic = ? ,email = ?, phone = ?
      WHERE user_id = ?;
    `;

    const [full_name,profile_pic, email, phone, user_id] = [req.body.name, req.body.profile_pic, req.body.email, req.body.phone, Number(req.body.user_id)];
    
    if(!profile_pic){
      updateUsersQuery=`
      UPDATE users
      SET full_name = ?,email = ?, phone = ?
      WHERE user_id = ?;
    `;
    }

    let queryData;

    if (!profile_pic) {
      queryData = [full_name, email, phone, user_id];
    } else {
      queryData = [full_name, profile_pic, email, phone, user_id];
    }

    db.query(updateUsersQuery,queryData, (updateErr, updateData) => {
      if (updateErr) {
        console.log(updateErr)
        return res.json(updateErr);
      }
      else{
        const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const updated_at = created_at;
        const notif_q = "INSERT INTO notifications (user_id,notification,created_at, updated_at) VALUES (?);";
                const notif_values = [
                    req.body.user_id,
                    req.body.full_name+" updated their profile.",
                    created_at, 
                    updated_at
                ];

                db.query(notif_q,[notif_values],(err,data) => {
                    if(err) return res.json(err)
                    res.json("Data updated or inserted successfully")})
          }
    });
  });
});

//-------------------------------------------FIND PROFESSIONATIONALS----------------------------------------------------

// app.get('/users/:category/:city', (req,res) => {
//   const category = req.params.category;
//   const city = req.params.city;
//   console.log(city)
//   const q = "SELECT full_name, about_us,rating,experience,u.user_id FROM users_details u JOIN users p ON u.user_id = p.user_id WHERE category = ? AND city = ?";
//   db.query (q,[category,city],(err,data)=>{
//     if(err) return res.json(err)
//     return res.json(data)
// })
// })
app.get('/users', (req, res) => {
  const [category, city, rating, experience] = [req.query.category,req.query.city,req.query.rating,req.query.experience]; // Extract parameters from query
  let q = "SELECT full_name, about_us, rating, experience, u.user_id,city FROM users_details u JOIN users p ON u.user_id = p.user_id WHERE p.user_type = ? ";
  const values = [category];

  if (city) {
    q += " AND city = ?";
    values.push(city);
  }
  if (rating) {
    q += " AND rating >= ?";
    values.push(rating);
  }

  if (experience) {
    switch (experience) {
      case 'Less than 5 Years':
        q += " AND experience < 5";
        break;
      case '5-10 Years':
        q += " AND experience >= 5 AND experience < 10";
        break;
      case '10-20 Years':
        q += " AND experience >= 10 AND experience < 20";
        break;
      case '20 Years and above':
        q += " AND experience >= 20";
        break;
      default:
        break;
    }
  }

  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/report', (req, res) => {
  const [user_id, reported_id, type] = [req.body.user_id, req.body.reported_id, req.body.type];

  if (!user_id || !reported_id || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;

  const q = "INSERT INTO report (user_id, reported_id, type, reason, created_at, updated_at) VALUES (?, ?, ?, '', ?, ?)";
  const values = [user_id, reported_id, type, createdAt, updatedAt];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error reporting/blocking user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Fetch full names for both user_id and reported_id
    const namesQuery = "SELECT full_name FROM users WHERE user_id IN (?, ?)";
    const namesValues = [user_id, reported_id];

    db.query(namesQuery, namesValues, (nameErr, nameData) => {
      if (nameErr) {
        console.error('Error fetching full names:', nameErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const [userFullName, reportedFullName] = nameData.map(row => row.full_name);

      const notif_q = "INSERT INTO notifications (user_id,notification,created_at, updated_at) VALUES (?);";
      const notif_values = [
        req.body.user_id,
        `${reportedFullName} reported ${userFullName}.`,
        createdAt,
        updatedAt
      ];

      db.query(notif_q, [notif_values], (notifErr, notifData) => {
        if (notifErr) {
          console.error('Error inserting notification:', notifErr);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'User reported/blocked successfully' });
      });
    });
  });
});


//----------------------------------------------MESSAGES------------------------------------------------------

app.get('/messages/', (req,res) => {
  const user_id = req.query.user_id;
  const q = `SELECT m.*, 
  CASE 
    WHEN m.user_id = ? THEN u1.full_name 
    WHEN m.receiver_id = ? THEN u2.full_name
  END as sender
  FROM messages m 
    JOIN users u1 ON m.receiver_id = u1.user_id 
    JOIN users u2 ON m.user_id = u2.user_id 
  WHERE m.user_id = ? OR m.receiver_id = ?
  `;
  db.query(q,[user_id,user_id,user_id,user_id],(err,data) => {
      if(err) return res.json(err)
      return res.json(data)
  })
})

app.post('/messages/', (req, res) => {
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = createdAt;
  const [ user_id, receiver_id, message ] = [req.body.user_id,req.body.receiver_id, req.body.message];
  const q = `INSERT INTO messages (user_id, receiver_id, messages,created_at,updated_at) VALUES (?, ?, ?,?,?)`;
  db.query(q, [user_id, receiver_id, message,createdAt,updatedAt], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    // If successful, return a success message or the inserted data
    return res.status(200).json({ message: 'Message sent successfully.', inserted_id: result.insertId });
  });
});
// ----------------------Top Contributors-------------------

// All based Top Contributors
app.get("/top-contributors/all", async (req, res) => {
  const query = `
                  SELECT
                  user_id,
                  full_name,
                  profile_pic,
                  comment_count,
                  like_count,
                  post_count,
                  (comment_count+like_count+post_count) as TotalLCP
              FROM (
                  SELECT
                      u.user_id,
                      u.profile_pic,
                      u.full_name,
                      COUNT(DISTINCT c.id) AS comment_count,
                      COUNT(DISTINCT l.id) AS like_count,
                      COUNT(DISTINCT p.post_id) AS post_count,
                      RANK() OVER (ORDER BY (COUNT(DISTINCT c.id) + COUNT(DISTINCT l.id) + COUNT(DISTINCT p.post_id)) DESC) AS rnk
                  FROM
                      users u
                  LEFT JOIN
                      comments c ON u.user_id = c.user_id
                  LEFT JOIN
                      likes l ON u.user_id = l.user_id
                  LEFT JOIN
                      posts p ON u.user_id = p.user_id
                  GROUP BY
                      u.user_id, u.full_name
              ) AS ranked_data
              WHERE rnk <= 5
              ORDER BY
              TotalLCP DESC
            LIMIT 5;
                    `;

  try {
    const results = await db.query(query, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(404).send({
          status: 0,
          messages: "result not found...",
        });
      } else {
        // console.log("result: ", results);
        // res.json(results);
        res.send(results);
      }
    });
  } catch (error) {
    console.error("Error fetching top contributors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//---------Current-Date Top Contributors-----------

app.get("/top-contributors/today", async (req, res) => {
  

  const query = `
          SELECT
          user_id,
          full_name,
          profile_pic,
          comment_count,
          like_count,
          post_count,
          (comment_count + like_count + post_count) AS TotalLCP
        FROM (
          SELECT
              u.user_id,
              u.profile_pic,
              u.full_name,
              COUNT(DISTINCT c.id) AS comment_count,
              COUNT(DISTINCT l.id) AS like_count,
              COUNT(DISTINCT p.post_id) AS post_count,
              RANK() OVER (ORDER BY (COUNT(DISTINCT c.id) + COUNT(DISTINCT l.id) + COUNT(DISTINCT p.post_id)) DESC) AS rnk
          FROM
              users u
          LEFT JOIN
              comments c ON u.user_id = c.user_id AND DATE(c.created_at) = CURRENT_DATE
          LEFT JOIN
              likes l ON u.user_id = l.user_id AND DATE(l.created_at) = CURRENT_DATE
          LEFT JOIN
              posts p ON u.user_id = p.user_id AND DATE(p.created_at) = CURRENT_DATE
          GROUP BY
              u.user_id, u.full_name
        ) AS ranked_data
        WHERE
          rnk <= 5 
          ORDER BY
            TotalLCP DESC
          LIMIT 5;
        `;

  try {
    const results = await db.query(query, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(404).send({
          status: 0,
          messages: "result not found...",
        });
      } else {
        // console.log("result: ", results);
        // res.json(results);
        res.send(results);
      }
    });
  } catch (error) {
    console.error("Error fetching top contributors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//---------Weekly Top Contributors-----------

app.get("/top-contributors/weekly", async (req, res) => {
  const query = `
            SELECT
            user_id,
            full_name,
            profile_pic,
            comment_count,
            like_count,
            post_count,
            (comment_count + like_count + post_count) AS TotalLCP
          FROM (
            SELECT
                u.user_id,
                u.profile_pic,
                u.full_name,
                COUNT(DISTINCT c.id) AS comment_count,
                COUNT(DISTINCT l.id) AS like_count,
                COUNT(DISTINCT p.post_id) AS post_count,
                RANK() OVER (ORDER BY (COUNT(DISTINCT c.id) + COUNT(DISTINCT l.id) + COUNT(DISTINCT p.post_id)) DESC) AS rnk
            FROM
                users u
            LEFT JOIN
                comments c ON u.user_id = c.user_id AND c.created_at >= CURRENT_DATE - INTERVAL 1 WEEK
            LEFT JOIN
                likes l ON u.user_id = l.user_id AND l.created_at >= CURRENT_DATE - INTERVAL 1 WEEK
            LEFT JOIN
                posts p ON u.user_id = p.user_id AND p.created_at >= CURRENT_DATE - INTERVAL 1 WEEK
            GROUP BY
                u.user_id, u.full_name
          ) AS ranked_data
          WHERE
            rnk <= 5
          ORDER BY
            TotalLCP DESC
          LIMIT 5;


        `;

  try {
    const results = await db.query(query, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(404).send({
          status: 0,
          messages: "result not found...",
        });
      } else {
        // console.log("result: ", results);
        // res.json(results);
        res.send(results);
      }
    });
  } catch (error) {
    console.error("Error fetching top contributors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//---------Monthly Top Contributors-----------

app.get("/top-contributors/monthly", async (req, res) => {
 

  const query = `
      SELECT
      user_id,
      full_name,
      profile_pic,
      comment_count,
      like_count,
      post_count,
      (comment_count + like_count + post_count) AS TotalLCP
    FROM (
      SELECT
          u.user_id,
          u.profile_pic,
          u.full_name,
          COUNT(DISTINCT c.id) AS comment_count,
          COUNT(DISTINCT l.id) AS like_count,
          COUNT(DISTINCT p.post_id) AS post_count,
          RANK() OVER (ORDER BY (COUNT(DISTINCT c.id) + COUNT(DISTINCT l.id) + COUNT(DISTINCT p.post_id)) DESC) AS rnk
      FROM
          users u
      LEFT JOIN
          comments c ON u.user_id = c.user_id AND c.created_at >= CURRENT_DATE - INTERVAL 1 MONTH
      LEFT JOIN
          likes l ON u.user_id = l.user_id AND l.created_at >= CURRENT_DATE - INTERVAL 1 MONTH
      LEFT JOIN
          posts p ON u.user_id = p.user_id AND p.created_at >= CURRENT_DATE - INTERVAL 1 MONTH
      GROUP BY
          u.user_id, u.full_name
    ) AS ranked_data
    WHERE
      rnk <= 5
    ORDER BY
      TotalLCP DESC
    LIMIT 5;


        `;

  try {
    const results = await db.query(query, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(404).send({
          status: 0,
          messages: "result not found...",
        });
      } else {
        // console.log("result: ", results);
        // res.json(results);
        res.send(results);
      }
    });
  } catch (error) {
    console.error("Error fetching top contributors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//-------------------------------------------PORT ALLOCATION----------------------------------------------------

app.listen(8081, ()=> {
    console.log("listening");
})
const express = require("express");
const mysql = require("mysql2");
const app = express();
// import cors from "cors";
const cors = require("cors");

// Parse JSON bodies
app.use(express.json());

// allow all origins (simple version)
app.use(cors());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

let con = mysql.createConnection({
  host: "localhost",
  user: "myDBuser",
  password: "123456",
  database: "mydb1",
});

con.connect((err) => {
  if (err) {
    console.log("connection failed:", err.message);
  }
  console.log("db connect");
});

app.get("/install", (req, res) => {
  const product_table = `
    CREATE TABLE IF NOT EXISTS products (
      product_id INT AUTO_INCREMENT PRIMARY KEY,
      product_url VARCHAR(255) NOT NULL,
      product_name VARCHAR(255) NOT NULL
    )
  `;

  con.query(product_table, (err) => {
    if (err) return res.status(500).send(err.message);

    const product_description = `
      CREATE TABLE IF NOT EXISTS product_description (
        description_id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        product_brief_description VARCHAR(255),
        product_description VARCHAR(255),
        product_image VARCHAR(255),
        product_link VARCHAR(255),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      )
    `;

    con.query(product_description, (err) => {
      if (err) return res.status(500).send(err.message);

      const price_tab = `
        CREATE TABLE IF NOT EXISTS price_table (
          price_id INT AUTO_INCREMENT PRIMARY KEY,
          product_id INT NOT NULL,
          price INT,
          FOREIGN KEY (product_id) REFERENCES products(product_id)
        )
      `;

      con.query(price_tab, (err) => {
        if (err) return res.status(500).send(err.message);

        res.send("All tables created successfully ");
      });
    });
  });
});

// app.post("/add-product", (req, res) => {
//   console.log(req.body);
//   const {
//     product_name,
//     product_url,
//     product_brief_description,
//     desription,
//     produc_img,
//     product_link,
//     stating_price,
//     price_range,
//     user_name,
//     user_password,
//   } = req.body;
//   console.log(product_name);

//   let insertProducts = `
//     INSERT INTO products (product_url, product_name)
//     VALUES (?, ?)
// `;
//   let insertProductDesc = `INSERT INTO product_description ( product_id,product_brief_description ,product_description,product_image,product_link) VALUES (?,?,?,?,?)`;

//   let insertprice = `INSERT INTO price_table (product_id, price) VALUES (?, ?)`;

//   let insertOrder = `INSERT INTO order_table( user_id , product_id  ) VALUES (?, ?)`;

//   let inserUser = `INSERT INTO user_table( user_name , user_password) VALUES (?, ?) `;

//   con.query(insertProducts, [product_url, product_name], (err, result) => {
//     if (err) console.log("err"`${err}`);
//     console.log(result);
//     const product_id = result.insertId;
//     con.query(
//       insertProductDesc,
//       [
//         product_id,
//         product_brief_description,
//         desription,
//         produc_img,
//         product_link,
//       ],
//       (err, result) => {
//         if (err) {
//           console.log("err", err);
//         } else console.log(result);
//       },
//     );
//     con.query(
//       insertprice,
//       [product_id, stating_price, price_range],
//       (err, result) => {
//         if (err) {
//           console.log("err", err);
//         }
//       },
//     );
//     con.query(inserUser, [user_name, user_password], (err, result) => {
//       if (err) {
//         console.log("err", err);
//       }
//     });
//   });
// });
app.post("/add-product", (req, res) => {
  const {
    product_name,
    product_url,
    product_brief_description,
    desription,
    produc_img,
    product_link,
    stating_price,
  } = req.body;

  let insertProducts = `
    INSERT INTO products (product_url, product_name) 
    VALUES (?, ?)
  `;

  con.query(insertProducts, [product_url, product_name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Product insert failed" });
    }

    const product_id = result.insertId;

    con.query(
      `INSERT INTO product_description 
      (product_id, product_brief_description, product_description, product_image, product_link)
      VALUES (?, ?, ?, ?, ?)`,
      [
        product_id,
        product_brief_description,
        desription,
        produc_img,
        product_link,
      ],
      (err2) => {
        if (err2) {
          console.log(err2);
          return res.status(500).json({ error: "Description insert failed" });
        }
      },
    );

    con.query(
      `INSERT INTO price_table (product_id, price) VALUES (?, ?)`,
      [product_id, stating_price],
      (err3) => {
        if (err3) {
          console.log(err3);
          return res.status(500).json({ error: "Price insert failed" });
        }
      },
    );

    return res.json({
      message: "Product inserted successfully",
      product_id,
    });
  });
});
app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.get("/iphones", (req, res) => {
  con.query(
    `SELECT *         
    FROM products
    LEFT JOIN product_description 
    ON products.product_id = product_description.product_id
    LEFT JOIN price_table 
   ON products.product_id = price_table.product_id`,
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json({products:rows});
    },
  );
});

app.listen(3001, () => {
  console.log(` App running on http://localhost:${3001}`);
});

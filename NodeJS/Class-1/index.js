const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/health", (req, res) => {
  console.log({
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
  });
  res.json({
    success: true,
    message: "Server is healthy"
  });
});

// items (temporary data)
let items = [
  { id: 1, name: "Item 1", price: 10 },
  { id: 2, name: "Item 2", price: 20 },
  { id: 3, name: "Item 3", price: 30 },
];

app.get("/items", (req, res) => {
    res.json({
        success: true,
        data: items
    })
})

app.post("/addNewItem", (req, res) => {
    console.log("Body data : ", req.body);

    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            success: false,
            message: "Name and Price are required fields"
        })
    }

    items.push(req.body);
    res.json({
        success: true,
        message: "New item added successfully",
        data: items
    })
})

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found coming from middleware"
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

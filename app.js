const express = require('express');
const app = express();
const port = 3000; // Choose a suitable port

// Serve static files
app.use(express.static('public'));

// Use EJS for rendering
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const multer = require('multer');
const pdftoexcel = require('pdf-to-excel');

// Storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Convert PDF to Excel
app.post('/convert', upload.single('pdfFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const pdfData = req.file.buffer;
    const excelFilePath = 'converted.xlsx';

    pdf-to-excel(pdfData, excelFilePath)
        .then(() => {
            res.download(excelFilePath);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Conversion failed.');
        });
});

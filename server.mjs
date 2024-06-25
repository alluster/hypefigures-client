import path from 'path';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Get the directory name from the file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/dist')));
app.use('/logos', express.static(path.join(__dirname, '/public/logos')));
app.use('/integration-logos', express.static(path.join(__dirname, '/public/integration-logos')));

app.set('port', process.env.PORT || 9500);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/dist", "index.html"));
});

const server = app.listen(app.get('port'), () => {
	console.log('listening on port ', server.address().port);
});

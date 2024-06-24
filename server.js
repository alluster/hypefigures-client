import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/public/dist')));
app.set('port', process.env.PORT || 9500);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/dist", "index.html"));
});

const server = app.listen(app.get('port'), () => {
	console.log('listening on port ', server.address().port);
});

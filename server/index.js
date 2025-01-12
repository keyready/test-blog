const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const { sequelize } = require('./models');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Замените на ваш фронтенд
    credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));


// моковая задержка для имитации задержки сети
app.use('/*', (req, res, next) => {
    setTimeout(() => next(), 1000)
})

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

app.use('/static/', express.static(path.resolve(__dirname, './uploads/')))

// {force: true}
sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
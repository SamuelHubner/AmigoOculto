import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import siteRoutes from './routes/site';
import { requestInterceptor } from './utils/requestIntercepter';
import adminRoutes from './routes/admin';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', requestInterceptor);

app.use('/', siteRoutes);
app.use("/admin", adminRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`😎 Server running on port ${port}`);
    });
}

const regularServer = http.createServer(app);
if ( process.env.NODE_ENV === 'production' ) { 
    console.log('Production server');
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}
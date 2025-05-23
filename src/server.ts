import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from 'fs';
import siteRoutes from './routes/site';
import { requestInterceptor } from './utils/requestIntercepter';
import adminRoutes from './routes/admin';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

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
    const option = {
        key: fs.readFileSync(process.env.SSL_KEY as string || ''),
        cert: fs.readFileSync(process.env.SSL_CERT as string || '')
    };

    const secServer = https.createServer(option, app);
    runServer(80, regularServer);
    runServer(443, secServer);
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}

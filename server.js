import app from './index.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';

app.listen(3000, () => {
    console.log('server is running at 3000');
    connectUsingMongoose();
});


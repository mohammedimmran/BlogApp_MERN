const express = require("express");
const dotenv= require("dotenv");
const cors  = require('cors');
dotenv.config();

const dbConnect = require("./config/db/dbConnect");

const { userRegisterCtrl } = require("./controller/users/usersCtrl");


const usersRoute = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middleware/error/errorHandler");
const postRoute = require("./route/posts/postsRoute");
const commentRoutes = require("./route/comments/commentRoute");
const emailMsgRoutes = require("./route/emailMsg/emailMsgRoute")
const categoryRoutes = require("./route/category/categoryRoute")

const app = express()


dbConnect();

app.use(express.json());
app.use(cors());
// custom middleware
// const logger = (req , res , next) =>{
//     console.log("Logger");
//     next();
// }

// usage
// app.use(logger);


// app.post('/api/users/register' ,userRegisterCtrl );
//    |
// usersroute
//    |

app.use('/api/users' , usersRoute);
app.use('/api/posts',postRoute);
app.use('/api/comments', commentRoutes);
app.use('/api/emailMsg' , emailMsgRoutes);
app.use('/api/category' , categoryRoutes);












// error errorHandler  call after all routes
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(PORT))
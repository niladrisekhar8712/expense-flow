import express,{Express} from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: 'https://expense-flow-fawn.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const mongoURI:string = "mongodb+srv://Niladri:m8rAdfZ1SIcT4EuB@cluster0.7dboe1h.mongodb.net/";

mongoose
.connect(mongoURI)
.then(() => console.log("Connected"))
.catch((err) => console.log(err));

app.use("/financial-records", financialRecordRouter);

app.listen(port,()=>{
    console.log("server is running at "+port);
});

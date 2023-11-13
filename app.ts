import express, {Express, Request, Response} from 'express'
import morgan from "morgan"

const app: Express = express()

app.use(express.json())
app.listen()

//cors
app.use((req:Request,res:Response,next)=>{
    res.header("Access-Control-Allow-Origin", "*"),
		res.header(
			"Access-Control-Allow-Headers",
			"Origin,X-Request-With,Content-Type,Accept,Authorization,ngrok-skip-browser-warning"
		),
		res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE"),
		next();
})

//log
morgan.token("splitter", (req:Request) => {
	return "\x1b[36m--------------------------------------------\x1b[0m\n";
});
morgan.token("statusColor", (req:Request, res:Response, args) => {
	// get the status code if response written
	let status = (
		typeof res.headersSent !== "boolean"
			? Boolean(res.header)
			: res.headersSent
	)
		? res.statusCode
		: null;

	// get status color
	var color =
        status !== null ?
		status >= 500
			? 31 // red
			: status >= 400
			? 33 // yellow
			: status >= 300
			? 36 // cyan
			: status >= 200
			? 32 // green
			: 0 // no color
        :0

	return "\x1b[" + color + "m" + status + "\x1b[0m";
});

app.use(
	morgan(
		`:splitter\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - :res[content-length] [ :date[iso] ]`,
		{
			skip: (req) => req.baseUrl.slice(0, 8) === "/options",
		}
	)
);

import PaymentRoute from "./router/payment.router"


app.get("/", (req, res) => {
	res.send("Welcome to Payment Service");
});

app.use("/payment",PaymentRoute)

export default app
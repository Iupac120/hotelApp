"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const connect_1 = __importDefault(require("./utils/connect"));
const logger_1 = __importDefault(require("./utils/logger"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const hotel_routes_1 = __importDefault(require("./routes/hotel.routes"));
const room_routes_1 = __importDefault(require("./routes/room.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const image_routes_1 = __importDefault(require("./routes/image.routes"));
const passport_routes_1 = __importDefault(require("./routes/passport.routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./utils/passport.utils");
const passport_1 = __importDefault(require("passport"));
//import deserializeUser from "./middleware/deserializeUser"
const error_handler_1 = require("./errors/error.handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)(
//     {
//     origin:config.get('origin') ,
//     credentials: true
// }
));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
const sessionStore = (0, connect_pg_simple_1.default)(express_session_1.default);
const store = new sessionStore({
    pool: connect_1.default,
    tableName: 'session'
});
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'Iupac120',
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false } //secure should be true on production when using http
}));
//assign session
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use((0, morgan_1.default)('tiny'));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//app.use(deserializeUser)//assign middleware to every end point request
app.use("/api/auth", auth_routes_1.default);
app.use("/api/hotels", hotel_routes_1.default);
app.use("/api/rooms", room_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/product", product_routes_1.default);
app.use("/api/cart", session_routes_1.default);
app.use("/api/order", order_routes_1.default);
app.use("/", image_routes_1.default);
app.use("/", passport_routes_1.default);
app.use(error_handler_1.errorHandler);
const PORT = process.env.PORT || 5000; //config.get<number>('port');
app.listen(PORT, async () => {
    logger_1.default.info(`server is listening at port ${PORT}`);
    //await connect()
    //routes(app)
});

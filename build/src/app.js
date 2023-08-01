"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./utils/logger"));
const express_session_1 = __importDefault(require("express-session"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const hotel_routes_1 = __importDefault(require("./routes/hotel.routes"));
const room_routes_1 = __importDefault(require("./routes/room.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
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
app.use((0, cors_1.default)({
    origin: config_1.default.get('origin'),
    credentials: true
}));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'Iupac120',
    resave: true,
    saveUninitialized: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//app.use(deserializeUser)//assign middleware to every end point request
app.use("/api/auth", auth_routes_1.default);
app.use("/api/hotels", hotel_routes_1.default);
app.use("/api/rooms", room_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/", image_routes_1.default);
app.use("/", passport_routes_1.default);
app.use(error_handler_1.errorHandler);
const PORT = config_1.default.get('port');
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`server is listening at port ${PORT}`);
    //await connect()
    //routes(app)
}));

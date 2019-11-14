import HomeController from "./home/controllers/HomeController";
import GitController from "./home/controllers/GitController";

export default {
    '/': HomeController,
    '/git': GitController,
    '/test': import("./Test"),
};
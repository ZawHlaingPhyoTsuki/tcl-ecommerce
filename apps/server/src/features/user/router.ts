import { Router } from "express";
import { requireAuth } from "@/middlewares";
import { getUserFavouritesController } from "./controller";

const router: Router = Router();

router.get("/me/favourites", requireAuth, getUserFavouritesController);

export default router;

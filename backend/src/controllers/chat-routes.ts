
import { Router } from "express";
import {
    chatCompletionValidator,
    validate,
} from "../utils/validators.js";
import {
    generateChatCompletion,
} from "../controllers/chat-controllers.js";

const chatRoutes = Router();

chatRoutes.post(
    "/new",
    validate(chatCompletionValidator),
    generateChatCompletion
);

export default chatRoutes;
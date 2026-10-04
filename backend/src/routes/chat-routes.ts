import { Router } from 'express'
import { verifyToToken } from '../utils/token-manager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';
import { generateChatCompletion } from '../controllers/chat-controllers.js';

const chatRoutes = Router();
chatRoutes.post("/new",validate(chatCompletionValidator),verifyToToken,generateChatCompletion);

export default chatRoutes;
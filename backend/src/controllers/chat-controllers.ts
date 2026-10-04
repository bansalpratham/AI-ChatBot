import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../configs/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai'

export const generateChatCompletion = async (req:Request , res:Response,next:NextFunction) => {
        const {message} = req.body;

        try {
            const user = await User.findById(res.locals.jwtData.id);
            if (!user) return res.status(401).json({message:"User not registered OR Token malfunctioned"})
    
            //grab chats of user
    
            const chats = user.chats.map(({role,content})=>({role,content})) as ChatCompletionRequestMessage[] ;
            chats.push({content:message,role:"user"});
            user.chats.push({content:message,role:"user"});
    
            //send all chats with new one to openAI API
    
            const config = configureOpenAI();
            const openai = new OpenAIApi(config);
    
            // get latest response
    
            const chatResponse = await openai.createChatCompletion({
                model:"gpt-3.5-turbo",
                messages:chats,
            })
            const assistantMessage = chatResponse.data.choices[0]?.message;
            if (!assistantMessage) {
                return res.status(500).json({ message: "No response received from OpenAI" });
            }
            user.chats.push(assistantMessage);
            await user.save();
            return res.status(200).json({chats: user.chats});
        } catch (error) {
            return res.status(500).json({message:"Something went wrong"});
        }
}
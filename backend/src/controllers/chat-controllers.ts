import { Request, Response } from "express";
import User from "../models/User.js";
import { configureGemini } from "../configs/openai-config.js";

export const generateChatCompletion = async (
    req: Request,
    res: Response
) => {
    const { message } = req.body;

    try {
        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                message: "Please provide a message",
            });
        }

        // Temporary development user. No JWT required.
        const devEmail = "developer@example.com";

        let user = await User.findOne({ email: devEmail });

        if (!user) {
            user = await User.create({
                name: "Developer",
                email: devEmail,
                password: "development-only",
                chats: [],
            });
        }

        const chats = user.chats.map(({ role, content }) => ({
            role: role === "assistant" ? "model" : "user",
            parts: [{ text: content }],
        }));

        chats.push({
            role: "user",
            parts: [{ text: message.trim() }],
        });

        const gemini = configureGemini();

        const chatResponse = await gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: chats,
        });

        const assistantText = chatResponse.text;

        if (!assistantText) {
            return res.status(500).json({
                message: "No response received from Gemini",
            });
        }

        user.chats.push(
            { role: "user", content: message.trim() },
            { role: "assistant", content: assistantText }
        );

        await user.save();

        return res.status(200).json({
            chats: user.chats,
        });
    } catch (error) {
        console.error("Gemini API error:", error);

        return res.status(500).json({
            message: "Failed to generate a response. Check the backend terminal.",
        });
    }
};
import { WebSocketServer } from "ws";
import crypto from "crypto";

const wss = new WebSocketServer({ port: 8080 });

// Helper to generate unique session codes
function generateSessionCode() {
    return crypto.randomBytes(3).toString("hex").toUpperCase();
}

// Memory storage for active sessions
const sessions = {}; 

wss.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (rawMessage) => {
        try {
            const data = JSON.parse(rawMessage);
            const { type, code } = data;

            // 1. CREATE SESSION
            if (type === "create_session") {
                const newCode = generateSessionCode();
                sessions[newCode] = [socket];
                socket.code = newCode;
                socket.send(JSON.stringify({ 
                    type: "session_created", 
                    code: newCode 
                }));
                console.log(`Session created: ${newCode}`);
            } 

            // 2. JOIN SESSION
            else if (type === "join_session") {
                if (sessions[code]) {
                    if (!sessions[code].includes(socket)) {
                        sessions[code].push(socket);
                    }
                    socket.code = code;
                    
                    // Tell the joiner they are in
                    socket.send(JSON.stringify({ 
                        type: "joined_session", 
                        code,
                        participants: sessions[code].length
                    }));

                    // Notify others in the room
                    sessions[code].forEach(client => {
                        if (client !== socket && client.readyState === 1) {
                            client.send(JSON.stringify({
                                type: "user_joined",
                                participants: sessions[code].length
                            }));
                        }
                    });
                } else {
                    socket.send(JSON.stringify({ error: "Invalid session code" }));
                }
            }

            // 3. BROADCAST UPDATES (The most important part)
            else if (type === "form_update" && code && sessions[code]) {
                sessions[code].forEach(client => {
                    // Send the raw message string to save CPU 
                    // and ensure keys like 'content' or 'formData' stay intact
                    if (client !== socket && client.readyState === 1) {
                        client.send(rawMessage.toString());
                    }
                });
            }

        } catch (error) {
            console.error("Message error:", error);
        }
    });

    socket.on("close", () => {
        const code = socket.code;
        if (code && sessions[code]) {
            sessions[code] = sessions[code].filter(s => s !== socket);
            
            if (sessions[code].length > 0) {
                sessions[code].forEach(client => {
                    if (client.readyState === 1) {
                        client.send(JSON.stringify({
                            type: "user_left",
                            participants: sessions[code].length
                        }));
                    }
                });
            } else {
                delete sessions[code];
                console.log(`Session ${code} closed (no users left)`);
            }
        }
    });
});

console.log("🚀 WebSocket server running on ws://localhost:8080");
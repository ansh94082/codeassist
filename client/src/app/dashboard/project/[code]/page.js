"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from "@codemirror/view";
import { EditorState, Annotation } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { defaultKeymap } from "@codemirror/commands";
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language";
import axios from "axios";

const remoteChange = Annotation.define();

export default function CollaborativeEditor() {
    const { code: sessionCode } = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    
    const editorRef = useRef(null);
    const viewRef = useRef(null);
    const ws = useRef(null);
    const hasJoinedSession = useRef(false);
    const isInitialized = useRef(false);

    const [connectionStatus, setConnectionStatus] = useState("connecting");
    const [output, setOutput] = useState("$ Terminal ready...\n");
    const [language, setLanguage] = useState("javascript");
    const [isExecuting, setIsExecuting] = useState(false);
    const [participants, setParticipants] = useState(1);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/");
        }
    }, [status, router]);

    useEffect(() => {
        if (isInitialized.current) return;
        if (!sessionCode) return;
        if (status === "loading") return;
        if (status === "unauthenticated") return;

        isInitialized.current = true;

        // Initialize CodeMirror
        if (!viewRef.current && editorRef.current) {
            try {
                viewRef.current = new EditorView({
                    state: EditorState.create({
                        doc: "// Happy coding!\n",
                        extensions: [
                            lineNumbers(),
                            syntaxHighlighting(defaultHighlightStyle),
                            javascript(),
                            highlightActiveLine(),
                            drawSelection(),
                            keymap.of(defaultKeymap),
                            EditorView.updateListener.of(update => {
                                if (update.docChanged && !update.transactions.some(tr => tr.annotation(remoteChange))) {
                                    const content = update.state.doc.toString();
                                    if (ws.current?.readyState === WebSocket.OPEN) {
                                        ws.current.send(JSON.stringify({
                                            type: "form_update",
                                            code: sessionCode,
                                            content: content
                                        }));
                                    }
                                }
                            }),
                            EditorView.theme({
                                "&": { height: "100%", backgroundColor: "#1e1e1e" },
                                ".cm-content": { color: "#d4d4d4", caretColor: "#ffffff", padding: "10px 0" },
                                ".cm-gutters": { backgroundColor: "#1e1e1e", color: "#858585", border: "none" },
                                ".cm-activeLineGutter": { backgroundColor: "#2a2a2a" }
                            })
                        ]
                    }),
                    parent: editorRef.current
                });
            } catch (error) {
                console.error("Error initializing CodeMirror:", error);
            }
        }

        // Initialize WebSocket
        ws.current = new WebSocket("ws://localhost:8080");

        ws.current.onopen = () => {
            setConnectionStatus("connected");
            if (!hasJoinedSession.current) {
                ws.current.send(JSON.stringify({ 
                    type: "join_session", 
                    code: sessionCode 
                }));
                hasJoinedSession.current = true;
            }
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.error) {
                alert(`Session error: ${data.error}`);
                router.push("/dashboard");
                return;
            }

            if (data.type === "joined_session") {
                setParticipants(data.participants);
            }

            if (data.type === "user_joined") {
                setParticipants(data.participants);
                setOutput(prev => prev + `> User joined (${data.participants} total)\n`);
            }

            if (data.type === "user_left") {
                setParticipants(data.participants);
                setOutput(prev => prev + `> User left (${data.participants} remaining)\n`);
            }

            if (data.type === "form_update" && viewRef.current) {
                const remoteContent = data.content;
                const currentContent = viewRef.current.state.doc.toString();
                
                if (remoteContent !== undefined && remoteContent !== currentContent) {
                    viewRef.current.dispatch({
                        changes: { from: 0, to: currentContent.length, insert: remoteContent },
                        annotations: remoteChange.of(true)
                    });
                }
            }
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnectionStatus("error");
        };

        ws.current.onclose = () => {
            setConnectionStatus("disconnected");
        };

        return () => {
            if (viewRef.current) {
                viewRef.current.destroy();
                viewRef.current = null;
            }
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
            hasJoinedSession.current = false;
            isInitialized.current = false;
        };
    }, [sessionCode, router, status]);

    const runCode = async () => {
        if (isExecuting || !viewRef.current) return;
        setIsExecuting(true);
        const codeToRun = viewRef.current.state.doc.toString();
        setOutput(prev => prev + `> Running ${language}...\n`);

        try {
            const res = await axios.post('https://onecompiler-apis.p.rapidapi.com/api/v1/run', {
                language,
                files: [{ name: 'index.js', content: codeToRun }]
            }, {
                headers: {
                    'x-rapidapi-key': process.env.NEXT_PUBLIC_COMPILE_API,
                    'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com'
                }
            });
            setOutput(prev => prev + (res.data.stdout || res.data.stderr || "No output") + "\n");
        } catch (err) {
            console.error("Execution error:", err);
            setOutput(prev => prev + "Execution Error: " + (err.message || "Unknown error") + "\n");
        } finally {
            setIsExecuting(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="h-screen bg-[#0c0c0c] flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#0c0c0c] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#141414]">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => router.push("/dashboard")} 
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ← Dashboard
                    </button>
                    <h1 className="text-white font-mono bg-white/5 px-3 py-1 rounded">
                        Session: {sessionCode}
                    </h1>
                    <span className={
                        connectionStatus === "connected" 
                            ? "text-green-500 text-sm" 
                            : connectionStatus === "connecting"
                            ? "text-yellow-500 text-sm"
                            : "text-red-500 text-sm"
                    }>
                        {connectionStatus === "connected" ? "● Live" : 
                         connectionStatus === "connecting" ? "○ Connecting..." : "○ Offline"}
                    </span>
                    <span className="text-gray-400 text-sm">
                        👥 {participants} {participants === 1 ? "user" : "users"}
                    </span>
                </div>
                <div className="flex gap-3">
                    <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value)} 
                        className="bg-white/5 text-white border border-white/10 rounded px-3 py-2 outline-none focus:ring-2 ring-purple-500"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                    <button 
                        onClick={runCode} 
                        disabled={isExecuting} 
                        className="bg-green-600 px-6 py-2 rounded font-bold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isExecuting ? "Running..." : "Run"}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div ref={editorRef} className="flex-1 border-r border-white/5 overflow-auto" style={{ minHeight: 0 }} />
                <div className="w-1/3 bg-[#080808] p-4 font-mono text-sm text-green-400 overflow-y-auto whitespace-pre-wrap">
                    {output}
                </div>
            </div>
        </div>
    );
}
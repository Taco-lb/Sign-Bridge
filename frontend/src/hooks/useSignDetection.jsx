import { useRef, useState, useCallback } from "react";
import io from "socket.io-client";

export default function useSignDetector(websocketURL) {
    const [prediction, setPrediction] = useState("");
    const [cameraOn, setCameraOn] = useState(false);
    const socket = useRef(null);
    const frameInterval = useRef(null);

    const captureFrame = useCallback((webcamRef) => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                const base64String = imageSrc.split(",")[1];
                socket.current.emit("frame", base64String);
            }
        }
    }, []);

    const startCamera = useCallback((webcamRef) => {
        setCameraOn(true);
        socket.current = io(websocketURL, { transports: ["websocket", "polling"] });

        frameInterval.current = setInterval(() => captureFrame(webcamRef), 200);

        socket.current.on("prediction", (prediction) => {
            setPrediction(prediction);
        });

        socket.current.on("connect_error", (err) => {
            console.error("WebSocket connection error:", err);
        });

    }, [captureFrame, websocketURL]);

    const stopCamera = useCallback(() => {
        setCameraOn(false);
        setPrediction("");

        if (frameInterval.current) {
            clearInterval(frameInterval.current);
        }
        if (socket.current) {
            socket.current.disconnect();
            socket.current.off();
            socket.current = null;
        }
    }, []);

    return { prediction, cameraOn, startCamera, stopCamera };
}
import { toast } from "react-toastify";

export const localH = import.meta.env.VITE_API_URL;
export const ngrok = import.meta.env.VITE_API_NGROK;
export const websocketURL = ngrok.replace("https://", "wss://");

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "del", "space"
];

export function notify (type, title, message) {    
    toast[type](
        <div>
            <strong style={{ fontSize: "16px", color: `${type === "success" ? "green" : type === "error" ? "red" : "var(--main-color"}`}}>
                {title}
            </strong>
            <p style={{ margin: 0, fontSize: "0.75rem" }}>{message}</p>
        </div>,
    );
};

export function getTextWidth (text, element) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = getComputedStyle(element).font;
    return context.measureText(text).width;
};

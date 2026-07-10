import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements} from "@stripe/react-stripe-js";

const STRIPE_KEY = "pk_test_51QBJZFEnGRkoyIm8OrJQEsspSYRUWfMXiWLtHPqqjjrVEEAAoE5lhAh3XKOJ4n2bQuWuf2DjfaGih8WDinVEIyYG006dWT5j5l";
const stripePromise = loadStripe(STRIPE_KEY);

createRoot(document.getElementById("root")).render(
<Elements stripe={stripePromise}>
    <App />
</Elements>
);


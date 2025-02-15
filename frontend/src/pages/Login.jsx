import { useState } from "react";
import anime from "animejs";

const LoginForm = () => {
  const [current, setCurrent] = useState(null);

  const animatePath = (offset, array) => {
    if (current) current.pause();
    setCurrent(
      anime({
        targets: "path",
        strokeDashoffset: {
          value: offset,
          duration: 700,
          easing: "easeOutQuart",
        },
        strokeDasharray: {
          value: array,
          duration: 700,
          easing: "easeOutQuart",
        },
      })
    );
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Login</div>
          <div className="eula">
            By logging in you agree to the ridiculously long terms that you didn't
            bother to read
          </div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient id="linearGradient" x1="13" y1="193.5" x2="307" y2="193.5" gradientUnits="userSpaceOnUse">
                <stop style={{ stopColor: "#ff00ff" }} offset="0" />
                <stop style={{ stopColor: "#ff0000" }} offset="1" />
              </linearGradient>
            </defs>
            <path
              d="m 40,120 240,0 c 0,0 25,0.8 25,35 0,34.2 -25,35 -25,35 h -240 c 0,-0.02 -25,4.01 -25,38.5 0,34.49 25,38.5 25,38.5 h 215 c 0,0 20,-1 20,-25 0,-24 -20,-25 -20,-25 h -190 c 0,0 -20,1.71 -20,25 0,24 20,25 20,25 h 168.57"
              fill="none"
              stroke="url(#linearGradient)"
              strokeWidth="4"
              strokeDasharray="240 1386"
            />
          </svg>
          <div className="form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onFocus={() => animatePath(0, "240 1386")}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onFocus={() => animatePath(-336, "240 1386")}
            />
            <input
              type="submit"
              id="submit"
              value="Submit"
              onFocus={() => animatePath(-730, "530 1386")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

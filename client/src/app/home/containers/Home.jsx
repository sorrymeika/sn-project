import React from "react";
import { Button } from "antd";

export default function Home({ onButtonClick, toSignIn }) {
    return (
        <div>
            Home
            <br />
            <br />
            <Button onClick={onButtonClick}>Click me to `Test`!</Button>
            <br />
            <Button onClick={toSignIn}>Click me to `sign-in`!</Button>
        </div>
    );
}

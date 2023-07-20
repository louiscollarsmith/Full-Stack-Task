"use client";

import { Button } from "antd";
import { useEffect, useState } from "react";
import { Fetch } from "../utils/api";

export default function Home() {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    Fetch("GET", "/time").then((response) => setTime(response.time));
  }, []);

  return (
    <main className="flex flex-col space-y-2 items-center justify-center w-full h-full p-24">
      <span>{time}</span>
      <Button>Button</Button>
    </main>
  );
}

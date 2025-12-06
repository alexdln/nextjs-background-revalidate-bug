"use client";

import { useState, useEffect } from "react";

export function ClientTime() {
  const [date, setDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(new Date().toISOString());
  }, []);

  return <>{date}</>;
}

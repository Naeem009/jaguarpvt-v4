"use client";

import { useEffect } from "react";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

function serialize(data: JsonLdProps["data"]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  const json = serialize(data);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = json;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [json]);

  return null;
}

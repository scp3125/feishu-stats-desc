"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { bitable } from "@lark-base-open/js-sdk";
import { Spin } from "antd";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const setLocale = async () => {
      const language = await bitable.bridge.getLanguage();

      router.push("/" + language);
    };
    setLocale();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Spin size="large" />
    </div>
  );
}

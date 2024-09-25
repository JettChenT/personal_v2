"use client";

import { Icon } from "@iconify/react";
import { useAuthStore } from "./store";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TopSettings() {
  const {
    apiKey,
    semipublicKey,
    privateKey,
    setApiKey,
    setSemipublicKey,
    setPrivateKey,
  } = useAuthStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <p className="italic">an ephemeral stream of random stuff.</p>
        <Icon
          icon="lucide:settings"
          className="cursor-pointer"
          onClick={() => setShowSettings(!showSettings)}
        />
      </div>
      {showSettings && (
        <div className="space-y-4 border p-2">
          <div>
            <Label htmlFor="semipublicKey">Semi-public Key</Label>
            <Input
              id="semipublicKey"
              type="password"
              value={semipublicKey}
              onChange={(e) => setSemipublicKey(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="privateKey">Private Key</Label>
            <Input
              id="privateKey"
              type="password"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

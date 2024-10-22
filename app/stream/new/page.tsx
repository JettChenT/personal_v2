"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "../store";
import { toast } from "sonner";

export default function NewStreamPost() {
  const { apiKey, setApiKey } = useAuthStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [encryptLevel, setEncryptLevel] = useState("PUBLIC");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          title,
          content,
          encryptLevel,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create stream post");
      }

      setIsSuccess(true);
      toast.success("Your stream post has been created.");
      setTitle("");
      setContent("");
      setEncryptLevel("PUBLIC");
    } catch (error) {
      toast.error("Failed to create stream post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Create a new stream post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              className="resize-none"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="encryptLevel">Encryption Level</Label>
            <Select
              value={encryptLevel}
              onValueChange={(value) => setEncryptLevel(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select encryption level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="SEMIPUBLIC">Semi-Public</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Enter your API key. It will be saved in the auth store.
            </p>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Post..." : "Create Post"}
          </Button>
          {isSuccess && (
            <p className="text-green-500 mt-2">Post created successfully!</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

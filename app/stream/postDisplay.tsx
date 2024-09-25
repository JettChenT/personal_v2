"use client";
import { StreamPost } from "@prisma/client";
import { useMemo } from "react";
import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { managedNonce } from "@noble/ciphers/webcrypto";
import { utf8ToBytes } from "@noble/ciphers/utils";
import { useAuthStore } from "./store";

function EncryptedPostDisplay(post: StreamPost) {
  return (
    <div className="p-2 border bg-gray-100">
      <h2 className="text-xl font-bold">Encrypted Post</h2>
      <p className="text-sm text-gray-500">Content is encrypted</p>
      <p className="text-sm text-gray-500">
        Encryption Level: {post.encryptLevel}
      </p>
    </div>
  );
}

const enforce_key = (key: string): string => {
  return key.padEnd(32, "\0").slice(0, 32);
};

const decryptPost = (key: string, post: StreamPost): StreamPost | null => {
  const chacha = managedNonce(xchacha20poly1305)(utf8ToBytes(enforce_key(key)));
  const decryptField = (field: string) => {
    try {
      return new TextDecoder().decode(
        chacha.decrypt(Buffer.from(field, "base64"))
      );
    } catch (error) {
      return null;
    }
  };

  const decryptedTitle = decryptField(post.title);
  const decryptedContent = decryptField(post.content);

  if (decryptedTitle === null || decryptedContent === null) {
    return null;
  }

  return {
    ...post,
    title: decryptedTitle,
    content: decryptedContent,
  };
};

export function StreamPostDisplay({ post }: { post: StreamPost }) {
  const { semipublicKey, privateKey } = useAuthStore();

  const proced_post = useMemo(() => {
    switch (post.encryptLevel) {
      case "PUBLIC":
        return post;
      case "SEMIPUBLIC":
        if (!semipublicKey) return null;
        return decryptPost(semipublicKey, post);
      case "PRIVATE":
        if (!privateKey) return null;
        return decryptPost(privateKey, post);
    }
  }, [post, semipublicKey, privateKey]);

  if (!proced_post) return <EncryptedPostDisplay {...post} />;

  return (
    <div key={post.id} className="p-2 border">
      <h2 className="text-xl font-bold">{proced_post.title}</h2>
      <p className="text-sm text-gray-500">
        {proced_post.createdAt.toLocaleString()}
      </p>
      <p className="text-gray-700 mt-1">{proced_post.content}</p>
    </div>
  );
}

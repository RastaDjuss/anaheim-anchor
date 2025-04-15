'use client';

import * as React from "react";
import PostCard from "../../components/feed/PostCard";
import NewPostFeature from "../../components/feed/new-post-feature";

interface Post {
    id: string;
    creator: string;
    content: string;
    timestamp: string;
}

const MOCK_POSTS: Post[] = [
    {
        id: "1",
        creator: "wallet-address-1",
        content: "This is my first post!",
        timestamp: "2023-01-01T12:00:00Z",
    },
    {
        id: "2",
        creator: "wallet-address-2",
        content: "Welcome to the decentralized network!",
        timestamp: "2023-01-02T14:45:00Z",
    },
];
const FeedPage = () => {
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adapte au format local
    };

    return (
      <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Feed</h1>
          <NewPostFeature />
          <div className="feed mt-4 space-y-4">
              {MOCK_POSTS.map((post) => (
                <PostCard
                  key={post.id}
                  post={{
                      creator: post.creator,
                      content: post.content,
                      timestamp: formatTimestamp(post.timestamp),
                  }}
                />
              ))}
          </div>
      </div>
    );
};
export default FeedPage;
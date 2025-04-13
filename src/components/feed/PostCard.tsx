const PostCard = ({ post }: PostProps) => {
    return (
        <div className="border rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500">{post.creator}</p>
            <p className="text-lg font-medium">{post.content}</p>
            <p className="text-xs text-gray-400">
                {new Date(post.timestamp).toLocaleString()}
            </p>
        </div>
    );
};
export type Post = {
    creator: string;
    content: string;
    timestamp: string;
};

type PostProps = {
    post: Post;
};
export default PostCard; // Add this line// src/components/feed/feed-ui/PostCard.tsx



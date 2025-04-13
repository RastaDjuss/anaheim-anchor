import React from 'react';
import { useMutation } from '@tanstack/react-query';

const NewPostForm = () => {
    const [content, setContent] = React.useState('');

    const mutation = useMutation<Response, Error, { content: string }>({
        mutationFn: async (newPost) => {
            return fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ content });
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post..."
                className="w-full p-2 border rounded"
            />
            <button type="submit" className="btn mt-2">
                Submit
            </button>
        </form>
    );
};

export default NewPostForm;
"use client";


import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const NewPostFeature = () => {
    const [content, setContent] = React.useState(''); // Gestion de l'état local du formulaire

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
        mutation.mutate({ content }); // Envoie la mutation avec le contenu
        setContent(''); // Réinitialise le formulaire après soumission
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Write a new post..."
            />
          <button
            type="submit"
            className="btn bg-blue-500 text-white rounded p-2"
            disabled={mutation.status === 'pending'}
          >
              {mutation.status === 'pending' ? 'Submitting...' : 'Submit'}
          </button>
      </form>
    );
};

export default function ClustersFeature() {
  const [cluster, setCluster] = useState("");

  return (
    <div>
      <h1>Cluster Component</h1>
      <p>Cluster sélectionné : {cluster}</p>
    </div>
  );
}
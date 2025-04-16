import React from 'react';

function FeedDataAccess({ children }: { children: React.ReactNode }): JSX.Element {
	return <div>{children}</div>;
}

const DataAccess = () => {
	return <FeedDataAccess>Content here</FeedDataAccess>;
};
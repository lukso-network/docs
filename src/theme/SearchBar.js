import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import AskCookbook from '@cookbookdev/docsbot/react';

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <AskCookbook
        apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjEwM2M3NTliMTZhM2M0YzE3YzU0MDEiLCJpYXQiOjE3MTIzNDAwODUsImV4cCI6MjAyNzkxNjA4NX0.4TtEbis5Pj2d5QQLnbQFeZiiQ63JBWZu2v35gDGAO94"
      />
    </>
  );
}

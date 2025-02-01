"use client";
import { useEffect, useState } from 'react';

export type PushEvent = {
  repository: {
    name: string;
  };
  head_commit: {
    message: string;
    committer: {
      name: string;
    };
  };
};

const PushEventDisplay = () => {
  const [pushData, setPushData] = useState<PushEvent>();

  useEffect(() => {
    const fetchPushData = async () => {
      try {
        const response = await fetch('/api/webhook');
        const data = await response.json();
        
        if (response.ok) {
          setPushData(data);
        } else {
          console.error(data.message || 'Failed to fetch push data');
        }
      } catch (error) {
        console.error('Error fetching push data:', error);
      }
    };

    fetchPushData();
  }, []);

  if (!pushData) {
    return <p>Loading webhook data...</p>;
  }

  return (
    <div>
      <h2>Latest GitHub Push Event</h2>
      <p><strong>Repository:</strong> {pushData.repository.name}</p>
      {/* <p><strong>Commit Message:</strong> {pushData.head_commit.message}</p> */}
      <p><strong>Committer:</strong> {pushData.head_commit.committer.name}</p>
    </div>
  );
};

export default PushEventDisplay;
'use client';
import { useEffect } from 'react';

export default function ResumePage() {
  useEffect(() => {
    // Redirect to PDF file
    window.location.href = '/resume.pdf';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to resume...</p>
    </div>
  );
} 
'use client';

import { useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const GoogleAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed.current) {
      return;
    }

    const token = searchParams?.get('token');
    console.log('Google callback - token received:', token ? token.substring(0, 20) + '...' : 'none');
    
    if (token) {
      hasProcessed.current = true;
      
      login(token)
        .then(() => {
          console.log('Login successful, redirecting to dashboard');
          router.push('/dashboard');
        })
        .catch((error) => {
          console.error('Login failed:', error);
          hasProcessed.current = false; // Allow retry on error
          alert('Authentication failed. Please try again.');
          router.push('/');
        });
    } else {
      console.error('No token in callback URL');
      hasProcessed.current = true;
      alert('Authentication failed. No token received.');
      router.push('/');
    }
  }, [router, searchParams, login]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <p>Please wait while we are authenticating you...</p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          If this takes too long, please check the browser console for errors.
        </p>
      </div>
    </div>
  );
};

const GoogleAuthCallbackPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GoogleAuthCallback />
  </Suspense>
);

export default GoogleAuthCallbackPage;

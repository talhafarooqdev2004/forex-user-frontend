'use client';

import { useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const GoogleAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      
      try {
        // Store token in localStorage (forex-admin will handle user fetching)
        localStorage.setItem('authToken', token);
        console.log('Token stored, redirecting to admin dashboard');
        
        // Redirect immediately to admin dashboard (forex-admin app)
        // The admin app will fetch user data when it loads
        const adminDashboardUrl = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL || 'http://localhost:3001/dashboard';
        window.location.href = adminDashboardUrl;
      } catch (error) {
        console.error('Failed to store token:', error);
        hasProcessed.current = false; // Allow retry on error
        alert('Authentication failed. Please try again.');
        router.push('/');
      }
    } else {
      console.error('No token in callback URL');
      hasProcessed.current = true;
      alert('Authentication failed. No token received.');
      router.push('/');
    }
  }, [router, searchParams]);

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

'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const AuthSync = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams?.get('token');
    const logout = searchParams?.get('logout');
    const redirect = searchParams?.get('redirect');

    if (token) {
      console.log('Syncing token to frontend localStorage');
      localStorage.setItem('authToken', token);
    }

    if (logout === 'true') {
      console.log('Clearing token from frontend localStorage');
      localStorage.removeItem('authToken');
    }

    if (redirect) {
      console.log('Redirecting to:', redirect);
      window.location.href = redirect;
    } else {
      window.location.href = '/';
    }
  }, [searchParams]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4ff',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Synchronizing session...</p>
      </div>
    </div>
  );
};

export default function AuthSyncPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSync />
    </Suspense>
  );
}

'use client';

import { useEffect } from 'react';

export default function DashboardRedirect() {
    useEffect(() => {
        // Redirect to admin dashboard (forex-admin app)
        const adminDashboardUrl = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL || 'http://localhost:3001/dashboard';
        window.location.href = adminDashboardUrl;
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <p>Redirecting to dashboard...</p>
        </div>
    );
}

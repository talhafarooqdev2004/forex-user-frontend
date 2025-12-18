import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { packageService } from '@/services/packageService';
import OrderClient from './OrderClient';

export default async function OrderPage({
    searchParams,
}: {
    searchParams: Promise<{ packageId?: string; gateway?: string }>;
}) {
    const params = await searchParams;
    const packageId = params.packageId ? parseInt(params.packageId) : null;
    const gateway = params.gateway || '';

    if (!packageId) {
        redirect('/packages');
    }

    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || 'en';

    const packageData = await packageService.getPackageById(packageId, locale);

    if (!packageData) {
        redirect('/packages');
    }

    return <OrderClient packageData={packageData} selectedGateway={gateway} initialLocale={locale} />;
}


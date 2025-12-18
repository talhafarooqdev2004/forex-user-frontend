import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PaymentSuccessClient from './PaymentSuccessClient';

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ transactionId?: string; packageId?: string }>;
}) {
    const params = await searchParams;
    const transactionId = params.transactionId;
    const packageId = params.packageId;

    if (!transactionId) {
        redirect('/packages');
    }

    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || 'en';

    return (
        <PaymentSuccessClient
            transactionId={transactionId}
            packageId={packageId}
            locale={locale}
        />
    );
}


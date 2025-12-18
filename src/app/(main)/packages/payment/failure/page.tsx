import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PaymentFailureClient from './PaymentFailureClient';

export default async function PaymentFailurePage({
    searchParams,
}: {
    searchParams: Promise<{ transactionId?: string; error?: string }>;
}) {
    const params = await searchParams;
    const transactionId = params.transactionId;
    const error = params.error;

    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || 'en';

    return (
        <PaymentFailureClient
            transactionId={transactionId}
            error={error}
            locale={locale}
        />
    );
}


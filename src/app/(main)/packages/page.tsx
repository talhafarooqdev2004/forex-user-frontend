import { packageService } from "@/services/packageService";
import { cookies } from 'next/headers';
import { PackagesClient } from "./PackagesClient";

export default async function Packages() {
    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || 'en';

    const subscriptionPackages = await packageService.getPackages(locale);

    return <PackagesClient initialData={subscriptionPackages} initialLocale={locale} />;
}
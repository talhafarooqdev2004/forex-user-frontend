import { packageService } from "@/services/packageService";
import { cookies } from 'next/headers';
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || 'en';

    const subscriptionPackages = await packageService.getPackages(locale);

    return <DashboardClient subscriptionPackages={subscriptionPackages} />;
}
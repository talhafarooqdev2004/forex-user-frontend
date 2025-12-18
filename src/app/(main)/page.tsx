import { educationService } from "@/services/educationService";
import HomeClient from "./HomeClient";
import { cookies } from "next/headers";

export default async function HomePage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value ?? "en";

    const educations = await educationService.getEducations(locale);

    return (
        <>
            <main>
                <HomeClient
                    initialEducations={educations}
                    initialLocale={locale}
                />
            </main>
        </>
    );
} 
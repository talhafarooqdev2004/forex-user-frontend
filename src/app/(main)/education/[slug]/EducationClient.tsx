import PageWithHeroLayout from "@/components/layouts/PageWithHeroLayout";
import SingleEducationLayout from "@/components/education/SingleEducationLayout";
import { EducationDTO } from "@/types/results/EducationsIndexResultDTO";

interface EducationClientProps {
    initialEducation: EducationDTO;
    slug: string;
    initialLocale: string;
}

export default function EducationClient({ initialEducation, slug, initialLocale }: EducationClientProps) {
    return (
        <PageWithHeroLayout alignItems="flex-start" stickyAside={true}>
            <SingleEducationLayout initialEducation={initialEducation} slug={slug} initialLocale={initialLocale} />
        </PageWithHeroLayout>
    );
}


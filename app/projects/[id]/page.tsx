import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";
import { ProjectDetails } from "@/components/projects/ProjectDetails";

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedLayout>
      <ProjectDetails id={params.id} />
    </ProtectedLayout>
  );
}
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  // Check authentication on the server
  const session = await getServerAuthSession();
  
  if (!session) {
    // Redirect to login with the current path as callback URL
    const returnUrl = `/projects/${params.id}`;
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(returnUrl)}`);
  }
  return <ProjectDetails id={params.id} />;
}
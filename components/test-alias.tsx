// Test file to check if aliases work
import { Spinner } from "@/components/ui/spinner";

export function TestAlias() {
  return (
    <div>
      <Spinner size="lg" />
      <p>If you can see this, the alias import is working!</p>
    </div>
  );
}
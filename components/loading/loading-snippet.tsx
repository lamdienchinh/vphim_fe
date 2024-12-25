import { LoaderCircle } from "lucide-react";

export default function LoadingSnippet() {
  return (
    <div className="animate-spin h-fit w-fit">
      <LoaderCircle />
    </div>
  );
}

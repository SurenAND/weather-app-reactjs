import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { Toaster, toast } from "sonner";

export default function HomeTemplate() {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    toast.success(`Welcome ${state.username}`);
  }, [state.username]);

  return (
    <>
      <div>HomeTemplate</div>
      <Toaster richColors position="top-right" />
    </>
  );
}

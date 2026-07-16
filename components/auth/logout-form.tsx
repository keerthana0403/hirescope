import { LogOut } from "lucide-react";

export function LogoutForm() {
  return (
    <form
      action={async () => {
        "use server";

        const { signOut } = await import("@/lib/auth");

        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </form>
  );
}

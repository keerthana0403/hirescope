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
      <button>Logout</button>
    </form>
  );
}

import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="max-w-3xl p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">VoltCare</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to VoltCare — a demo site. This is a minimal index page added
          so the static export produces an `index.html` for GitHub Pages.
        </p>
      </div>
    </main>
  );
}

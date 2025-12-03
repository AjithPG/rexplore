export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-background sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
            Rexplore
          </h1>
          <p className="max-w-md text-lg leading-8 text-muted-foreground">
            Help people discover free learning and earning opportunities online
          </p>
        </div>
      </main>
    </div>
  );
}

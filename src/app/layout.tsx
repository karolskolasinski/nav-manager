import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <head>
        <title>Nav manager</title>
        <meta name="description" content="Zarządzaj listą nawigacji" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[whitesmoke]">
        {children}
      </body>
    </html>
  );
}

'use client';

export default function Footer() {
  return (
    <footer className="sticky bottom-0 bg-secondary p-4 text-secondary-foreground">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} by AppWay</p>
      </div>
    </footer>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed w-screen bottom-0 left-0 flex flex-none py-3 border-t border-gray-200 justify-center items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <p className="text-sm">
        &copy; {currentYear} Tune Tube App. All rights reserved.
      </p>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      &copy; {new Date().getFullYear()} FitTrackPro. All rights reserved.
    </footer>
  );
}
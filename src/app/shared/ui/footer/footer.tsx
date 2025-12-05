export default function Footer() {
  return (
    <footer className="bg-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col items-center justify-center gap-1">
        <p className="text-gray-700 text-center text-sm font-medium">
          Share your thoughts, connect with friends, and see what’s happening!
        </p>
        <div className="w-12 h-[2px] bg-blue-500 rounded-full my-1"></div>
        <p className="text-gray-400 text-xs text-center">
          &copy; {new Date().getFullYear()} SocialMedia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

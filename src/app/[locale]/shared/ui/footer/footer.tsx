export default function Footer({ messages }: { messages: any }) {
  return (
    <footer className="bg-white shadow-lg dark:bg-zinc-900 dark:text-gray-200 mt-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col items-center justify-center gap-1">
        <p className="text-gray-700 text-center text-sm font-medium dark:text-gray-300">
          {messages?.footer?.content}
        </p>
        <div className="w-12 h-[2px] bg-blue-500 rounded-full my-1"></div>
        <p className="text-gray-400 text-xs text-center">
          &copy; {new Date().getFullYear()} {messages?.footer?.copyright}
        </p>
      </div>
    </footer>
  );
}

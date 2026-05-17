export default function HeroSection() {
  return (
    <section className="bg-white px-4 sm:px-6 pt-10 sm:pt-12 pb-8 sm:pb-10 text-center">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Stay organized,{" "}
          <span className="text-emerald-500">get things done</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md mx-auto">
          A clean, distraction-free task manager that helps you focus on what matters.{" "}
          <span className="hidden sm:inline"><br /></span>
          Create, prioritize, and track your tasks with ease.
        </p>
      </div>
    </section>
  );
}
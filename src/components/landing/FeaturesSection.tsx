import { CirclePlus, LayoutList, Flag, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CirclePlus,
    title: "Create Tasks",
    description:
      "Quickly add tasks with titles, descriptions, priorities, and due dates.",
  },
  {
    icon: LayoutList,
    title: "Track Progress",
    description: "Organize tasks by status: To Do, In Progress, and Done.",
  },
  {
    icon: Flag,
    title: "Set Priorities",
    description:
      "Mark tasks as Low, Medium, or High priority to stay focused on what matters.",
  },
  {
    icon: CalendarDays,
    title: "Due Dates",
    description:
      "Never miss a deadline with clear due date tracking for every task.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#f5f5f0] flex-1 py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Everything you need to stay productive
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            Built for people who want a simple, effective way to manage their work.
          </p>
        </div>

        {/* Feature cards — 1 col on mobile, 2 on sm, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="bg-white border-0 shadow-none rounded-xl"
            >
              <CardContent className="pt-5 pb-5 px-4 sm:px-5 space-y-3">
                <div className="w-8 h-8 rounded-md bg-[#e6f5ef] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#1a9e6e]" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
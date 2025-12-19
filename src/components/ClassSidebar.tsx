import { ArrowRightIcon, ITIcon, XIcon } from "../assets/Icons";

const categories = ["IT", "BA", "DS"];

interface ClassSidebarProps {
  selectedClass?: string;
  onSelectClass: (category: string) => void;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ClassSidebar = ({
  selectedClass: selectedCategory,
  onSelectClass: onSelectCategory,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
}: ClassSidebarProps) => {
  return (
    <>
      <div
        className={
          isCollapsed ? "hidden" : "fixed inset-0 bg-black/50 z-40 lg:hidden"
        }
        onClick={onCloseMobile}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gray-900 border-r border-gray-800 z-50 transition-all duration-300 flex flex-col ${
          isCollapsed ? "-translate-x-full lg:translate-x-0 w-16" : "w-52"
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-white">Classes</h2>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {/* Desktop Toggle Button */}
            <button
              onClick={onToggleCollapse}
              className="hidden p-0.5 lg:flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ArrowRightIcon
                width={24}
                height={24}
                className={`transition-transform duration-500 ${
                  isCollapsed ? "" : "rotate-180"
                }`}
              />
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-800">
          <button
            onClick={() => onSelectCategory("")}
            className={`w-full rounded-lg py-2 transition-colors flex items-center ${
              !selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            } ${!isCollapsed ? "px-3" : "px-1 justify-center"}`}
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              {!isCollapsed && (
                <span className="text-sm font-medium whitespace-nowrap">
                  All Classes
                </span>
              )}
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          {categories.map((category) => (
            <div key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full flex items-center gap-2 text-gray-400 py-2 hover:text-white transition-colors rounded-lg ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                } ${!isCollapsed ? "px-3" : "px-1.5 justify-center"}`}
              >
                <div
                  className={`text-blue-400 ${
                    selectedCategory === category ? "text-white" : ""
                  }`}
                >
                  <ITIcon />
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {category}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

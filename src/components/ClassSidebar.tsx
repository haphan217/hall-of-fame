import { collection, getDocs } from "firebase/firestore";
import { ArrowRightIcon, ITIcon, XIcon } from "../assets/Icons";
import { db } from "../utils/firebaseConfig";
import { useEffect, useState } from "react";
import type { Category } from "../types";

interface ClassSidebarProps {
  selectedClass?: string;
  onSelectClass: (category?: Category) => void;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ClassSidebar = ({
  selectedClass,
  onSelectClass,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
}: ClassSidebarProps) => {
  const docRef = collection(db, "categories");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(docRef);
      const cats = querySnapshot.docs.map((doc) => doc.data() as Category);
      setCategories(cats);

      onSelectClass(cats[0]);
    })();
  }, []);

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

          <div className="flex items-center ml-auto">
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

        <div className="flex-1 overflow-auto p-4 space-y-2">
          {categories.map((category) => (
            <div key={category.name}>
              <button
                onClick={() => onSelectClass(category)}
                className={`w-full flex items-center gap-2 text-gray-400 py-2 hover:text-white transition-colors rounded-lg ${
                  selectedClass === category.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                } ${!isCollapsed ? "px-3" : "px-1.5 justify-center"}`}
              >
                <div
                  className={`text-blue-400 ${
                    selectedClass === category.name ? "text-white" : ""
                  }`}
                >
                  <ITIcon />
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {category.name}
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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiSliders,
  FiGrid,
  FiList,
  FiDownload,
  FiPlus,
  FiGlobe,
  FiMoon,
} from "react-icons/fi";

interface Font {
  id: number;
  name: string;
  designer: string;
  styles: number;
  family: string;
  category: string;
  languages: string[];
}

const categories = [
  "All",
  "Sans Serif",
  "Serif",
  "Display",
  "Handwriting",
  "Monospace",
];
const languages = [
  "Latin",
  "Korean",
  "Japanese",
  "Chinese",
  "Cyrillic",
  "Greek",
];

const sampleFonts: Font[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: ["Roboto", "Open Sans", "Lato", "Montserrat", "Noto Sans"][i % 5],
  designer: [
    "Google",
    "Steve Matteson",
    "Łukasz Dziedzic",
    "Julieta Ulanovsky",
    "Google",
  ][i % 5],
  styles: [12, 10, 8, 6, 14][i % 5],
  family: "sans-serif",
  category: ["Sans Serif", "Serif", "Display", "Handwriting", "Monospace"][
    i % 5
  ],
  languages: [
    "Latin",
    "Korean",
    "Japanese",
    "Chinese",
    "Cyrillic",
    "Greek",
  ].slice(0, (i % 4) + 2),
}));

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewSize, setPreviewSize] = useState(32);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("Latin");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visibleFonts, setVisibleFonts] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredFonts = sampleFonts
    .filter(
      (font) =>
        font.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "All" || font.category === selectedCategory) &&
        font.languages.includes(selectedLanguage)
    )
    .slice(0, visibleFonts);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1000
    ) {
      setVisibleFonts((prev) => Math.min(prev + 8, sampleFonts.length));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? "dark bg-gray-900" : "bg-white"
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold dark:text-white">Fonts</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <FiMoon className="w-5 h-5 dark:text-white" />
              </button>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <FiSliders className="w-5 h-5 dark:text-white" />
              </button>
              <div className="flex items-center space-x-2 border dark:border-gray-700 rounded-lg p-1">
                <button
                  className={`p-2 rounded ${
                    viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <FiGrid className="w-5 h-5 dark:text-white" />
                </button>
                <button
                  className={`p-2 rounded ${
                    viewMode === "list" ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <FiList className="w-5 h-5 dark:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="mt-4 space-y-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search fonts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 py-4">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedCategory === category
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center space-x-4">
                      <FiGlobe className="text-gray-400" />
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="bg-transparent border dark:border-gray-700 rounded-lg p-2 dark:text-white"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preview Size */}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Preview size
                      </span>
                      <input
                        type="range"
                        min="16"
                        max="96"
                        value={previewSize}
                        onChange={(e) => setPreviewSize(Number(e.target.value))}
                        className="w-48"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {previewSize}px
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`grid ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          } gap-6`}
        >
          {filteredFonts.map((font) => (
            <motion.div
              key={font.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold dark:text-white">
                    {font.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                      <FiPlus className="w-5 h-5 dark:text-white" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                      <FiDownload className="w-5 h-5 dark:text-white" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {font.languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Designed by {font.designer} • {font.styles} styles •{" "}
                  {font.category}
                </p>
                <div
                  className="mt-4 border-t dark:border-gray-700 pt-4 dark:text-white"
                  style={{
                    fontFamily: font.family,
                    fontSize: `${previewSize}px`,
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

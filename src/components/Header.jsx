import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBook, FaNewspaper, FaGithub } from "react-icons/fa";
import slugify from './utils/slugify'; // Import the slugify function
import Listoftools from "./Tools/listoftools";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Load courses from JSON
  useEffect(() => {
    fetch("/data/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Filter courses based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses([]);
    } else {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  // Handle clicks outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full bg-bg-500/95 shadow-custom-dark z-50">
      <div className="flex items-center justify-between px-4 py-2 md:hidden">
        <Link to="/" className="flex items-center">
          <img src="/data/bioinformatics tools news.png" alt="Logo" className="w-24 drop-shadow-custom-color" />
        </Link>
        <div className="relative flex-1 mx-4" ref={searchRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          {showResults && filteredCourses.length > 0 && (
            <ul className="absolute bg-white border border-gray-200 mt-1 w-full rounded-md shadow-lg z-50">
              {filteredCourses.map((course) => {
                const courseSlug = slugify(course.title);
                return (
                  <li key={course.id} className="px-4 py-2 hover:bg-gray-100">
                    <Link to={`/course/${courseSlug}`} className="text-black">
                      {course.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <a
          href="https://github.com/MattiUllahKhan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary-500 transition duration-300"
        >
          <FaGithub className="text-5xl" />
        </a>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-bg-500 bg-opacity-95 shadow-custom-color z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center flex-wrap w-full">
          <Link to="/" className="flex flex-col items-center text-white hover:text-primary-500 transition duration-300 flex-1 min-w-0">
            <FaHome className="text-sm mb-1" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/courses" className="flex flex-col items-center text-white hover:text-primary-500 transition duration-300 flex-1 min-w-0">
            <FaBook className="text-sm mb-1" />
            <span className="text-xs">Learn</span>
          </Link>
          <Link to="/news" className="flex flex-col items-center text-white hover:text-primary-500 transition duration-300 flex-1 min-w-0">
            <FaNewspaper className="text-sm mb-1" />
            <span className="text-xs">News</span>
          </Link>
          <a
            href="https://github.com/MattiUllahKhan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-white hover:text-primary-500 transition duration-300 flex-1 min-w-0"
          >
            <FaGithub className="text-sm mb-1" />
            <span className="text-xs">GitHub</span>
          </a>
        </div>
      </nav>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-between items-center px-4 py-2">
        <Link to="/" className="flex items-center">
          <img src="/data/bioinformatics tools news.png" alt="Logo" className="w-28" />
        </Link>
        <div className="relative flex-1 mx-4" ref={searchRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search courses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {showResults && filteredCourses.length > 0 && (
            <ul className="absolute bg-white border border-gray-200 mt-1 rounded-md shadow-lg z-50">
              {filteredCourses.map((course) => {
                const courseSlug = slugify(course.title);
                return (
                  <li key={course.id} className="px-4 py-2 hover:bg-gray-100">
                    <Link to={`/course/${courseSlug}`} className="text-black">
                      {course.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-secondary-400 text-white hover:underline hover:bg-primary-500 transition duration-300 px-4 py-2">
            Home
          </Link>
          <Link to="/courses" className="hover:text-secondary-400 text-white hover:underline hover:bg-primary-500 transition duration-300 px-4 py-2">
            Courses
          </Link>
          <Link to="/news" className="hover:text-secondary-400 text-white hover:underline hover:bg-primary-500 transition duration-300 px-4 py-2">
            News
          </Link>
          <a
            href="https://github.com/MattiUllahKhan" target="_blank"
            className="hover:text-secondary-400 text-white hover:underline hover:bg-primary-500 transition duration-300 px-4 py-2"
          >
            Github
          </a>
        </div>
      </nav>
      <Listoftools />
    </header>
  );
};

export default Header;

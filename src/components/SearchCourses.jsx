import React, { useState } from 'react';
import coursesData from '../data/courses.json'; // Adjust the path to your courses.json file

const SearchCourses = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  // Filter courses based on the search query
  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="border rounded-md shadow-md p-4 flex flex-col"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{course.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <div className="mt-auto">
                <p className="text-primary-500 font-semibold mb-2">
                  ${course.price}
                </p>
                <a
                  href={course.videoUrl}
                  className="text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-md text-center block"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchCourses;

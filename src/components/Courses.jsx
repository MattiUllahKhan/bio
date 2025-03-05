import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slugify from './utils/slugify'; // Import the slugify function
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Courses = ({ searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/data/courses.json'); // Fetch from /data/courses.json in public
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load course data.");
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    searchQuery ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );





  if (error) {
    return <div className="py-16"><p className="text-center text-red-500">Error loading courses: {error}</p></div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Bioinformatics Latest Courses are covered Here - Bioinformatics Tools News</title>
        <meta name="description" content="Bioinformatics tools news covers latest tools of bioinformatics , their usage , automation and smart way to get insightful data with reasonable efforts." />
        <meta name="keywords" content="Bioinformatics Tools News, Bioinformatics Tools Courses, Bioinformatics Courses, Bioinformatics Guide, Bioiformatics Tools , Matti Ullah Khan" />
        <meta property="og:title" content="Bioinformatics Latest Courses are covered Here - Bioinformatics Tools News" />
        <meta property="og:description" content="Bioinformatics tools news covers latest tools of bioinformatics , their usage , automation and smart way to get insightful data with reasonable efforts." />
        <meta property="og:image" content="https://raw.githubusercontent.com/MattiUllahKhan/bio/refs/heads/main/images/courses/courses-bioinformatics-%26-biotechnology.webp" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Bioinformatics Latest Courses are covered Here - Bioinformatics Tools News" />
        <meta name="twitter:description" content="Bioinformatics tools news covers latest tools of bioinformatics , their usage , automation and smart way to get insightful data with reasonable efforts." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/MattiUllahKhan/bio/refs/heads/main/images/courses/courses-bioinformatics-%26-biotechnology.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Bioinformatics Tools Usage Guide Courses and News",
            "description": "Bioinformatics is a vast field within biology and it covers all data and their workflows. We cover here data analysis and their flows and use of tools to analyse data and new upcoming tools of bioinformatics.",
            "provider": {
              "@type": "Organization",
              "name": "Bioinformatics Tools Courses and News",
              "url": "https://bioinformaticstools.news"
            }
          })}
        </script>
      </Helmet>
      <div className="bg-white mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            All Courses
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Explore our comprehensive bioinformatics courses.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const discountedPrice = course.price - (course.price * course.percentOff) / 100;
              const isFree = course.percentOff === 100;
              const courseSlug = slugify(course.title); // Generate slug for title

              return (
                <Link
                  key={course.id}
                  to={`/course/${courseSlug}`} // Use slug in the link path
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-gray-600 max-h-16 min-h-16 overflow-hidden">{course.description}</p>
                    <div className="mt-4">
                      {isFree ? (
                        <div className="text-xl font-bold text-green-600">Free</div>
                      ) : course.percentOff > 0 ? (
                        <div className="flex items-center space-x-2">
                          <span className="line-through text-gray-500">${course.price.toFixed(2)}</span>
                          <span className="text-red-600 font-semibold">${discountedPrice.toFixed(2)}</span>
                          <span className="text-sm text-red-500">({course.percentOff}% off)</span>
                        </div>
                      ) : (
                        <div className="text-lg font-semibold text-gray-700">${course.price.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Courses;

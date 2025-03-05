import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import slugify from './utils/slugify'; // Import the slugify function
import { Helmet, HelmetProvider } from 'react-helmet-async';


const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/data/courses.json'); // Local path
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load course data.");
      }
    };

    const fetchNews = async () => {
      try {
        const response = await fetch("/data/news.json");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };


    fetchCourses();
    fetchNews();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Bioinformatics Tools Usage Guide Courses and News</title>
        <meta name="description" content="Bioinformatics is a vast field within biology and it covers all data and their workflows. We cover here data analysis and their flows and use of tools to analyse data and new upcoming tools of bioinformatics." />
        <meta name="keywords" content="Bioinformatics Tools News, Bioinformatics Tools Courses, Bioinformatics Courses, Bioinformatics Guide, Bioiformatics Tools , Matti Ullah Khan" />
        <meta property="og:title" content="Bioinformatics Tools Usage Guide Courses and News" />
        <meta property="og:description" content="Bioinformatics is a vast field within biology and it covers all data and their workflows. We cover here data analysis and their flows and use of tools to analyse data and new upcoming tools of bioinformatics." />
        <meta property="og:image" content="/images/empowering-your-research-with-cutting-edge-bioinformatics.webp" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Bioinformatics Tools Usage Guide Courses and News" />
        <meta name="twitter:description" content="Bioinformatics is a vast field within biology and it covers all data and their workflows. We cover here data analysis and their flows and use of tools to analyse data and new upcoming tools of bioinformatics." />
        <meta name="twitter:image" content="/images/empowering-your-research-with-cutting-edge-bioinformatics.webp" />
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
      <div className="bg-white">
        <header
          className="relative bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/images/Bioinformatics-tools-usage-guide.webp')",
          }}
        >
          <div className="relative border-2 h-[40%] md:h-[70%] bg-white/70 rounded shadow-custom-color">
            <div className="md:w-[60%] w-[100%] h-full mt-4 flex justify-center items-center">
              <div className="mx-4 px-4 sm:px-6 lg:px-8 py-20 text-start">
                <h1 className="text-4xl sm:text-6xl font-extrabold">
                  Learn Bio Coding with Our Real-time Hands on Practice Courses
                </h1>
                <p className="mt-4 text-lg sm:text-xl">
                  Dive into the world of genomics, proteomics, and computational biology with interactive and hands-on learning.
                </p>
                <div className="mt-6">
                  <a
                    href="#courses"
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-xl hover:text-white border-red-600 border-1 hover:bg-red-600"
                  >
                    Explore Courses
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="courses" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Featured Courses
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Learn from the best with our curated selection of bioinformatics courses.
            </p>
            {error && <p className="text-center text-red-500">Error loading courses: {error}</p>}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => {
                const courseSlug = slugify(course.title); // Generate slug for title

                return (
                  (

                    <Link
                      key={course.id}
                      to={`/course/${courseSlug}`}
                      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="mt-2 text-gray-600 max-h-12 min-h-12 overflow-scroll overflow-x-hidden">{course.description}</p>
                      </div>
                    </Link>
                  )
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Latest News
            </h2>
            <p className="mt-4 text-center text-gray-600">
              Stay updated with the latest trends and news in bioinformatics.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => {
                const courseSlug = slugify(item.title); // Generate slug for title
                return (
                  <Link
                    key={item.id}
                    to={`/news/${courseSlug}`}

                    className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={item.image || "/images/default-news-image.jpg"}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-gray-600 max-h-12 min-h-12 overflow-scroll overflow-x-hidden">{item.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </div>

    </HelmetProvider>
  );
};

export default HomePage;
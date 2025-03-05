import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import slugify from '../utils/slugify';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch('/data/courses.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const foundCourse = data.find(c => slugify(c.title) === courseId);
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError("Course not found.");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details.");
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleCopyToClipboard = (code, language) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyStatus(`${language} code copied to clipboard!`);
      setTimeout(() => setCopyStatus(''), 3000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
      setCopyStatus('Failed to copy code.');
      setTimeout(() => setCopyStatus(''), 3000);
    });
  };

  if (error) {
    return <div style={{ padding: '20px' }}><p className="text-red-500">{error}</p></div>;
  }

  if (!course) {
    return <div style={{ padding: '20px' }}>Loading course details...</div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{course.metaTitle || course.title}</title>
        <meta name="description" content={course.metaDescription || course.description} />
        <meta name="keywords" content={course.metaKeywords ? course.metaKeywords.join(', ') : 'online courses, learning, programming'} />
        <meta property="og:title" content={course.metaTitle || course.title} />
        <meta property="og:description" content={course.metaDescription || course.description} />
        <meta property="og:image" content={course.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={course.metaTitle || course.title} />
        <meta name="twitter:description" content={course.metaDescription || course.description} />
        <meta name="twitter:image" content={course.image} />
        <meta name="twitter:card" content={course.twitterCard || "summary_large_image"} />
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

      <div className=' pb-12 px-10 sm:p-4 sm:px-20'>
        <h1 className='text-4xl'>{course.title}</h1>
        <img
          src={course.image}
          alt={course.title}
          style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px', borderRadius: '4px' }}
          loading="lazy"
          className='m-auto shadow-custom-red'
        />
        {course.description && <p className='p-2 border-2 m-2 rounded bg-secondary-400/60 shadow-custom-dark'> {course.description}</p>}
        {copyStatus && (
          <div className="z-40 fixed bottom-20 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg border border-green-200">
            {copyStatus}
          </div>
        )}

        {course.sections && course.sections.map((section, index) => (
          <div key={index} style={{ marginBottom: '2px', padding: '1px' }}>
            {section.type === 'video' && section.youtubeId && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginBottom: '10px' }} className='rounded'>
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${section.youtubeId}`}
                  title={section.title ? `Video: ${section.title}` : `Video: Section ${index + 1}`}
                  width='100%'
                  height='100%'
                  controls={true}
                  config={{
                    youtube: {
                      playerVars: {
                        rel: 0,
                        modestbranding: 1,
                        cc_load_policy: 1,
                        iv_load_policy: 3,
                        fs: 1,
                        disablekb: 0
                      }
                    }
                  }}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}

            {['code', 'code-r', 'code-python', 'code-javascript', 'code-html', 'code-css'].includes(section.type) && section.content && (
              <div style={{ marginBottom: '10px', position: 'relative' }} className='border-2 border-[#1e1e1e] bg-[#1e1e1e] rounded'>
                <div style={{ position: 'absolute', right: '10px', top: '5px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    onClick={() => handleCopyToClipboard(section.content, section.type.replace('code-', '').toUpperCase())}
                    style={{ padding: '5px 10px', backgroundColor: '#6B7280', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9em' }}
                  >
                    Copy Code
                  </button>
                  <span style={{ fontSize: '0.9em', color: '#4B5563' }}>{section.type.replace('code-', '').toUpperCase()} Code</span>
                </div>
                <SyntaxHighlighter
                  language={section.type.replace('code-', '')}
                  style={vscDarkPlus}
                  PreTag="div"
                  codeTagProps={{ style: { overflowX: 'auto', padding: '10px' } }}
                >
                  {section.content}
                </SyntaxHighlighter>
              </div>
            )}

            {section.type === 'text' && section.content && <p style={{ marginBottom: '10px' }}>{section.content}</p>}
            {section.type === 'image' && section.content && (
              <img
                src={section.content}
                alt={section.title || `Image in Section ${index + 1}`}
                style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px', borderRadius: '8px' }}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </HelmetProvider>
  );
};

export default CourseDetail;

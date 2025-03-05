import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import { Helmet, HelmetProvider } from 'react-helmet-async';


const CgpaCalculator = () => {
    const [semester, setSemester] = useState("");
    const [previousCgpa, setPreviousCgpa] = useState("");
    const [totalPreviousSemesters, setTotalPreviousSemesters] = useState("");
    const [numSubjects, setNumSubjects] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [currentGPA, setCurrentGPA] = useState(null);
    const [overallCGPA, setOverallCGPA] = useState(null);

    // Function to add subjects when button is clicked
    const handleAddSubjects = () => {
        if (numSubjects > 0) {
            const newSubjects = Array.from({ length: numSubjects }, () => ({
                subjectName: "",
                creditHours: "",
                gpt: "",
            }));
            setSubjects(newSubjects);
        } else {
            alert("Enter a valid number of subjects!");
        }
    };

    // Function to handle input change for subjects
    const handleSubjectChange = (index, field, value) => {
        const updatedSubjects = subjects.map((subject, i) =>
            i === index ? { ...subject, [field]: value } : subject
        );
        setSubjects(updatedSubjects);
    };

    // Function to calculate GPA
    const calculateGPA = () => {
        let totalCredits = 0;
        let weightedGPA = 0;

        subjects.forEach(({ creditHours, gpt }) => {
            const ch = parseFloat(creditHours) || 0;
            const gp = parseFloat(gpt) || 0;
            totalCredits += ch;
            weightedGPA += ch * gp;
        });

        const gpa = totalCredits > 0 ? (weightedGPA / totalCredits).toFixed(2) : "0.00";
        setCurrentGPA(gpa);
    };

    // Function to calculate overall CGPA
    const calculateOverallCGPA = () => {
        if (!previousCgpa || !totalPreviousSemesters || !currentGPA) {
            alert("Fill all fields first!");
            return;
        }

        const overall =
            (parseFloat(currentGPA) + parseFloat(previousCgpa) * parseFloat(totalPreviousSemesters)) /
            (parseFloat(totalPreviousSemesters) + 1);

        setOverallCGPA(overall.toFixed(2));
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>GPA and CGPA Calculator | Bioinformatics Tools News</title>
                <meta name="description" content="GPA and CGPA Finder tool from university marks in university, college or School by Bioinformatics Tools News." />
                <meta name="keywords" content="Bioinformatics Tools News, GPA Finder, cgpa find, CGPA Finder,university cgpa finder, college cgpa finder, school cgpa finder, Bioiformatics Tools , Matti Ullah Khan" />
                <meta property="og:title" content="GPA and CGPA Calculator | Bioinformatics Tools News" />
                <meta property="og:description" content="GPA and CGPA Finder tool from university marks in university, college or School by Bioinformatics Tools News." />
                <meta property="og:image" content="https://raw.githubusercontent.com/MattiUllahKhan/bio/refs/heads/main/images/tools/gpa_and_cgpa_calculator_bioinformatics_tools_news.webp" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="GPA and CGPA Calculator | Bioinformatics Tools News" />
                <meta name="twitter:description" content="GPA and CGPA Finder tool from university marks in university, college or School by Bioinformatics Tools News." />
                <meta name="twitter:image" content="https://raw.githubusercontent.com/MattiUllahKhan/bio/refs/heads/main/images/tools/gpa_and_cgpa_calculator_bioinformatics_tools_news.webp" />
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
            <div style={{
                backgroundImage: "url('https://raw.githubusercontent.com/MattiUllahKhan/bio/refs/heads/main/images/tools/gpa_and_cgpa_calculator_bioinformatics_tools_news.webp')"
            }} className="min-h-screen bg-no-repeat bg-cover text-white flex flex-col items-center p-5 mt-2">

                <div className="bg-black/70 p-2 border-r-2 shadow-custom-color min-h-screen w-full align-middle justify-center flex-col md:flex-row flex m-1">
                    <div>
                        <motion.h1
                            className="text-3xl font-bold mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            CGPA Calculator
                        </motion.h1>

                        {/* Input Fields */}
                        <motion.div
                            className="w-full max-w-lg bg-gray-800/20 p-6 rounded-xl shadow-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <label className="block text-lg font-medium">Current Semester:</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-gray-700"
                                placeholder="Semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            />

                            <label className="block mt-4 text-lg font-medium">Previous CGPA:</label>
                            <input
                                type="number"
                                className="w-full p-2 rounded bg-gray-700"
                                placeholder="Previous CGPA"
                                value={previousCgpa}
                                onChange={(e) => setPreviousCgpa(e.target.value)}
                            />

                            <label className="block mt-4 text-lg font-medium">Total Previous Semesters:</label>
                            <input
                                type="number"
                                className="w-full p-2 rounded bg-gray-700"
                                placeholder="Total Semesters"
                                value={totalPreviousSemesters}
                                onChange={(e) => setTotalPreviousSemesters(e.target.value)}
                            />

                            <label className="block mt-4 text-lg font-medium">Number of Subjects:</label>
                            <input
                                type="number"
                                className="w-full p-2 rounded bg-gray-700"
                                placeholder="Number of Subjects"
                                value={numSubjects}
                                onChange={(e) => setNumSubjects(Number(e.target.value))}
                            />

                            <button
                                className="w-full mt-3 p-2 bg-blue-500 rounded hover:bg-blue-600 transition"
                                onClick={handleAddSubjects}
                            >
                                Add Subjects
                            </button>
                        </motion.div>
                    </div>

                    {/* Subjects Input Fields */}
                    {subjects.length > 0 && (
                        <motion.div
                            className="w-full max-w-4xl mt-5 bg-gray-800/20 p-6 rounded-xl shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {subjects.map((subject, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-700 p-3 rounded-lg"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <label className="block text-sm font-medium">Subject Name:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 rounded bg-gray-600"
                                            placeholder="Subject Name"
                                            onChange={(e) => handleSubjectChange(index, "subjectName", e.target.value)}
                                        />

                                        <label className="block text-sm font-medium mt-2">Credit Hours:</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 rounded bg-gray-600"
                                            placeholder="Credit Hours"
                                            onChange={(e) => handleSubjectChange(index, "creditHours", e.target.value)}
                                        />

                                        <label className="block text-sm font-medium mt-2">GPT:</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 rounded bg-gray-600"
                                            placeholder="GPT"
                                            onChange={(e) => handleSubjectChange(index, "gpt", e.target.value)}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                className="w-full mt-5 p-2 bg-green-500 rounded hover:bg-green-600 transition"
                                onClick={calculateGPA}
                            >
                                Calculate GPA
                            </button>

                            {currentGPA !== null && (
                                <motion.h2
                                    className="mt-4 text-2xl font-semibold"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    GPA This Semester: {currentGPA}
                                </motion.h2>
                            )}

                            <button
                                className="w-full mt-4 p-2 bg-purple-500 rounded hover:bg-purple-600 transition"
                                onClick={calculateOverallCGPA}
                            >
                                Calculate Overall CGPA
                            </button>

                            {overallCGPA !== null && (
                                <motion.h2
                                    className="mt-4 text-2xl font-semibold text-yellow-400"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Overall CGPA: {overallCGPA}
                                </motion.h2>
                            )}
                            <button className="bg-black/50 p-2 hover:bg-white-100/30 hover:text-black/50 hover:bg-white/50"><Link to="/gpa-and-cgpa-calculator" className="flex align-middle items-center"><FiRefreshCcw className="hover:text-red-600" />  Calculate Again</Link></button>
                        </motion.div>
                    )}
                    
                </div>
            </div>

        </HelmetProvider>
    );
};

export default CgpaCalculator;

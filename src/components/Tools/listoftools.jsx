import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

function Listoftools() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`fixed top-20 right-1 p-2 shadow-custom-dark transition-all duration-300 flex ${expanded ? 'w-48 bg-blue-500/95 items-center' : 'h-32 w-10 bg-gray-700 text-white text-center cursor-pointer flex-col justify-center'}`} onClick={() => setExpanded(!expanded)}>
            {expanded ? (
                <ul className='flex flex-col p-2'>
                    <div className='flex justify-between items-center'>
                        <span className='text-red-600 font-bold'>Tools:</span>
                        <ChevronUp className='text-white' />
                    </div>
                    <li className='underline text-blue-950'><Link to="/gpa-and-cgpa-calculator">Cgpa Checker</Link></li>
                </ul>
            ) : (
                <div className='flex flex-col items-center justify-center h-full'>
                    <span className='rotate-90 whitespace-nowrap'>Other Tools</span>
                    <ChevronDown className='text-white mt-1' />
                </div>
            )}
        </div>
    );
}

export default Listoftools;

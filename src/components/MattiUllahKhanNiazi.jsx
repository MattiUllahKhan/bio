import React from 'react'
import { Link } from 'react-router-dom'
import CustomTable from './TableofLanguages'

function MattiUllahKhanNiazi() {
  return (
    <div className='border-2 rounded border-black p-2 mb-20 mx-2 my-8 shadow-custom-red'>
      <div className='flex flex-nowrap items-start '>
        <img className='w-10 md:w-20 rounded-full' src="/public/images/user1.webp" alt="" />
        <h1 className='text-2xl md:text-4xl mx-2 font-extrabold md:bg-yellow-300'>CEO of <Link to="/" className='underline text-other-300 hover:no-underline text-sm'>bioinformatictools.news</Link> Community</h1>
      </div>
      <div>
        <p><b>Continuous</b> changing research in biology made me think about establishing a one dimentional community to gets hands on practice and to develop new tools for science and research contribution.</p>
        <p><b className='font-extrabold text-primary-500'>Freely</b> available courses make sure everyone can get benefits from my learning , as much I can take time for you people on this site.</p>
        <br />
        <div className='border-1 shadow-custom-red rounded border-black p-2'>
          <h2 className='font-extrabold text-xl'>Education :</h2>
          <p><span className='font-bold'>Matric : </span>I have passed Matric from Cresecent Model Public school Ghundi. <br /><span className='font-bold'>Intermediate :</span> Intermediate in Pre-Medical from Superior College Mianwali. <br /><span className='font-bold'>Undergraduate :</span> I desired to go to Software Engeenering but my luck , I could not join as a biology student. For tech field in biology there was made a new department in University of Mianwali, known as Department of Biotechnology. Took admisson into it and started programming along with it. <b>Now I am a programmer in my department of Biotechnology in umw that can analyse any type of biology related data.</b><br /><span className='font-bold'>Future :</span>Now there is no other field than <span className='text-red-500'>bioinformatics</span> that can make me more enjoyable.</p>
        </div>
        <div className='border-1 shadow-custom-red rounded border-black p-2'>
          <h2 className='text-2xl font-extrabold'>Activities :</h2>
          <h3 className='font-bold'>Programming Related :</h3>
          <CustomTable/>
        </div>
      </div>

    </div>
  )
}

export default MattiUllahKhanNiazi

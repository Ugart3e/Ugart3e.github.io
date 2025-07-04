  import React from 'react'
  import profile from '../assets/profile.jpg'
  import Github from '../assets/github.svg'
  import Linkedin from '../assets/linkedin.svg'
  import DownloadButton from '../Components/DownloadButton'
  import front from '../assets/FrontEnd.png'
  import back from '../assets/BackEnd.png'
  import { useNavigate } from 'react-router-dom'
  import MonkeytypeClone from '../assets/MonkeytypeClone.png'
  import Cartelera from '../assets/Cartelera.png'
  import Weather from '../assets/Weather.png'

  const Portfolio = () => {
    
    const navigate = useNavigate();

    const github = () => {
      window.open('https://github.com/Ugart3e?tab=repositories', '_blank');
    };

    const linkedin = () => {
      window.open('https://es.linkedin.com/in/pepeugarteg', '_blank');
    };

    return (
      <div>
        <header className='h-16 bg-[#1E2020] sticky top-0 z-50'>
          <div className='h-16 flex justify-between'>
            <div className='flex gap-5 mx-40 min-w-fit'>
            <div className='w-12 h-12 my-auto'>
            <img src={profile} alt="Profile Pic" className='object-cover w-full h-full'/>
            </div>

            <div className='flex flex-col my-auto '>
              <div className='text-white font-firacode text-xs'>José Luis Ugarte</div>
              <div className='text-white font-firacode mx-auto text-xs'>Web Developer</div>
            </div>
            </div>
            <div className='flex gap-10 mx-40 min-w-fit'>
            <a href="#top" className='my-auto'><p className='text-white my-auto font-firacode hover:cursor-pointer hover:text-blue-500 hover:underline hover:font-medium'>Top</p></a>
            <a href="#experience" className='my-auto'><p className='text-white my-auto font-firacode hover:cursor-pointer hover:text-blue-500 hover:underline hover:font-medium'>Experience</p></a>
            <a href="#technologies" className='my-auto'><p className='text-white my-auto font-firacode hover:cursor-pointer hover:text-blue-500 hover:underline hover:font-medium'>Technologies</p></a>
            <a href="#certifications" className='my-auto'><p className='text-white my-auto font-firacode hover:cursor-pointer hover:text-blue-500 hover:underline hover:font-medium'>Certifications</p></a>
          </div>
          </div>
          </header>

          <div className='bg-[#1E2020] pb-5'>
          <p className='text-white text-6xl font-poppins text-center pt-10 mb-1 text-neon' id='top'>José Luis Ugarte</p>
          <p className='text-white text-4xl font-poppins text-center my-3'>Web Developer</p>
          <p className='text-white text-2xl font-poppins my-3 text-center'>Simplicity is the ultimate sophistication</p>
          <p className='text-gray-400 text-center font-poppins my-3'>Full Stack React & Laravel</p>
          <div className='mt-3 mb-4 w-fit m-auto rounded-full px-3 bg-blue-400 text-blue-700'><p>Open to work</p></div>
          
          <div className='flex justify-center gap-5'>
            <button onClick={github} className='w-min bg-white text-black hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform font-firacode gap-2 font-medium py-2 px-4 rounded-lg flex'>Github <img src={Github} className='pr-5'/></button>  
            <DownloadButton/>
            <button onClick={linkedin} className='w-min bg-white text-black hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform font-firacode gap-2 font-medium py-2 px-4 rounded-lg flex'>Linkedin <img src={Linkedin} className='pr-5'/></button>          
          </div>
          </div>
          
        <main className='bg-[#151518] h-min'>
          
        <section className='w-3/5 pt-12 m-auto'>
    <p className='text-blue-500 font-poppins text-2xl' id='experience'>Experience</p>
    <div>
      <p className='text-white text-xl mt-2'>Audiense - Front-End Developer</p>
      <ul className='text-white text-l'>
        <li>• I was part of the team that was developing a new design system to shape the new, completely renewed website.</li>
        <li>• Developed exemplary views to demonstrate the appearance of the page with the new design system implemented, facilitating visualization and approval by the team.</li>
        <li>• Optimization of React components to dynamic components, improving code efficiency and maintainability.</li>
        <li>• I effectively solved emerging problems.</li>
        <li>• I contributed my perspective on several changes, improving code quality and efficiency by implementing best practices and optimizations.</li>
        <li>• Created detailed documentation documenting processes, workflows, and technical decisions, ensuring a clear and consistent understanding of the project for all team members.</li>
      </ul>
    </div>
      <div className='mt-4 p-4 bg-gray-800 text-white rounded-lg'>
  <h3 className='text-lg font-semibold font-poppins mb-4'>Additional Projects</h3>
  <div className='flex flex-row justify-evenly flex-wrap gap-4'>
  <div 
    onClick={() => window.open('https://monkeytype-clone-chi.vercel.app', '_blank')}
    className='cursor-pointer max-w-xs border-2 border-gray-700 rounded-lg overflow-hidden shadow-lg hover:border-blue-500 transition-colors duration-300'
    title="Proyecto Ejemplo"
  >
    <img src={MonkeytypeClone} alt="Miniatura Proyecto" className='w-full h-48 object-fill' />
    <div className='p-4 bg-[#1E2020] text-white font-poppins text-center'>
      MonkeyType Typetester - Mayo 2025
    </div>
  </div>
  <div 
    onClick={() => window.open('https://cinereact.vercel.app', '_blank')}
    className='cursor-pointer max-w-xs border-2 border-gray-700 rounded-lg overflow-hidden shadow-lg hover:border-blue-500 transition-colors duration-300'
    title="Proyecto Ejemplo"
  >
    <img src={Cartelera} alt="Miniatura Proyecto" className='w-full h-48 object-fill' />
    <div className='p-4 bg-[#1E2020] text-white font-poppins text-center'>
      Cartelera de Cine Redux - Marzo 2023
    </div>
  </div>
  <div 
    onClick={() => window.open('https://weather-app-one-nu-25.vercel.app/', '_blank')}
    className='cursor-pointer max-w-xs border-2 border-gray-700 rounded-lg overflow-hidden shadow-lg hover:border-blue-500 transition-colors duration-300'
    title="Proyecto Ejemplo"
  >
    <img src={Weather} alt="Miniatura Proyecto" className='w-full h-48 object-fill' />
    <div className='p-4 bg-[#1E2020] text-white font-poppins text-center'>
      WeatherApp Api - Junio 2025
    </div>
  </div>

  </div>
</div>
  </section>

          
          <section className='w-3/5 pt-12 pb-12 m-auto'>
          <p className='text-blue-500 font-poppins text-2xl' id='certifications'>Certifications</p>
          <ul>
          <li className='text-white text-xl my-2 font-poppins ml-5'>• Web Development (With Honors) - Medac 2022-2024</li>
          <li className='text-white text-xl my-2 font-poppins ml-5'>• Unity Junior Programmer 2023</li>
          <li className='text-white text-xl my-2 font-poppins ml-5'>• High School Diploma in Technological Sciences 2020-2022</li>
          </ul>
          </section>

          <section className='w-3/5 pt-12 m-auto'>
          <p className='text-blue-500 font-poppins text-2xl' id='technologies'>Technologies</p>
          <div className='w-full flex'>
          <div className='w-1/2'><img className='m-auto self-center' src={front}/></div>
          <div className='w-1/2'><img className='m-auto self-center' src={back}/></div>
          </div>
          </section>

        </main>
      </div>
    )
  }

  export default Portfolio
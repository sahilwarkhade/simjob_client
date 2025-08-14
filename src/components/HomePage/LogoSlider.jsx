// import React from 'reacimt'
// const LogoSlider = () => {
//   return (
//     <section className="companies">
//         <div className="container">
//           <div className="companies-header">
//             <p className="companies-text">Trusted by top companies worldwide</p>
//           </div>
//           <div className="companies-slider">
//             <div className="companies-track">
//               {/* First set of logos */}
//               <div className="company-logo">
//                 <div className="logo-placeholder">Google</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Microsoft</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Amazon</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Meta</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Apple</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Netflix</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Tesla</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Spotify</div>
//               </div>
              
//               {/* Duplicate set for seamless loop */}
//               <div className="company-logo">
//                 <div className="logo-placeholder">Google</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Microsoft</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Amazon</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Meta</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Apple</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Netflix</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Tesla</div>
//               </div>
//               <div className="company-logo">
//                 <div className="logo-placeholder">Spotify</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//   )
// }

// export default LogoSlider

// const companies = [
//   { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
//   { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
//   { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
//   { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
//   { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
//   {name:'Meta', logo:"../../assets/meta-platforms-logo-brandlogos.net_ffvf2t8uj.svg"}
// ];

// const LogoSlider = () => {
//   return(
//     <div className="w-full flex flex-col items-center justify-center bg-white gap-y-12 !py-18">
//       <h2 className="text-lg text-gray-500 font-semibold">Ace Interviews at Leading Companies</h2>
//       <div className="flex justify-center items-center grayscale-100 gap-x-20">
//         {companies.map((company)=>{
//           return <div key={company.name}>
//             <img src={company.logo} alt={company.name} className="w-16 aspect-auto"/>
//           </div>
//         })}
//       </div>
//     </div>
//   )
// };

// export default LogoSlider;


import React from 'react';

  const companies = [
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" }
  ];

  const LogoSlider = () => {
    // Duplicate companies array for seamless infinite scroll
    const duplicatedCompanies = [...companies, ...companies];

    return (
      <div className="w-full min-h-64 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 !py-24 overflow-hidden">
        {/* Header Section */}
        <div className="text-center !mb-16 !px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 !mb-4">
            Ace Interviews at 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Leading Companies</span>
          </h2>
          <p className="font-medium text-gray-400 text-sm sm:text-lg !px-4 sm:!px-8 leading-relaxed mx-auto">
            Join thousands of professionals who landed their dream jobs at top tech companies
          </p>
        </div>

        {/* Logo Slider Container */}
        <div className="relative w-full max-w-6xl overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-blue-50 to-transparent z-10"></div>
          
          {/* Slider Track */}
          <div className="flex animate-scroll z-0 relative">
            {duplicatedCompanies.map((company, index) => (
              <div 
                key={`${company.name}-${index}`}
                className="!flex-shrink-0 !mx-12 max-sm:!mx-4 group cursor-pointer"
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 !p-8 border border-gray-100 group-hover:scale-105 group-hover:-translate-y-1">
                  {/* Hover Glow Effect */}
                  <div className="absolute !inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  
                  <div className="relative !z-10 flex items-center justify-center h-16 w-24">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`} 
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Company Name Tooltip */}
                  <div className="absolute !-bottom-10 !left-1/2 transform !-translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                      {company.name}
                      <div className="absolute !top-0 !left-1/2 transform !-translate-x-1/2 !-translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        {/* <div className="!mt-16 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold !py-3 !px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Your Journey
          </button>
        </div> */}

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 8s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    );
  };

  export default LogoSlider;

const PARAGRAPHS = [
  `The background of the Professional college of communication and informatization of State University of Intellectual Technologies and Communications began as early as 1900, when the Higher Courses of Telegraph Mechanics training technicians for the south of the Russian Empire were opened in Odesa. The Courses premises were located at 16 Staroportofranivska Street.`,
  `In 1920, the Odesa Electrical Technical College of Communication was established, which in 1923 became the Odesa Higher Electrical Technical College of High Currents named after G. Hrynka (OHETC). After four years of study, OHETC graduates obtained the engineering degree.`,
  `In 1925, a low-current department with three groups of telegraph operators, telephone operators and radio operators was created at the Higher Electrical Technical College.`,
  `Over the years of its existence, the Odesa Electrical Technical College of Communication has trained more than 40,000 highly qualified specialists.`,
  `A significant contribution to the development of the Technical College was made by the directors: S. D. Yasinovskyi (1930), I. P. Pyshkin. (1952-1958, graduate of the Odesa Polytechnic Institute in 1930, an electrical engineer of high currents, former rector of OEIC; Pishnyi Y.M. (1973-1995), who in 1942 graduated from the Naval College named after. LCLYU as signal officer of the navy and in 1957 – Naval Academy of Shipbuilding and Armaments named after A.M. Krylova as a senior qualified signal specialist;`,
  `Since 2008, the college has been headed by S.Yu. Petrusenko, who graduated from Odesa State University named after. II. Mechnikova majoring in «Mathematics», Candidate of Pedagogic Sciences majoring in «Theory and methodology of professional education».`,
  `For his excellent work in the education of the younger generation and significant contribution to the development of the city's education, he was awarded the «Excellence in Education of Ukraine» emblem (certificate № 1236, order of the Ministry of Education of Ukraine № 61 dated March 21, 2000). For a significant contribution to the preparation and organization of All-Ukrainian student Olympiads and tournaments and for fruitful work with gifted youth he was awarded an honorary certificate of the Ministry of Education and Science of Ukraine (order № 1005-к dated 11.10.2004). By order №1989-01 dated 23.12.2004 of the Odesa Mayor, he was awarded the Odesa Mayor's Honorary Award «Gratitude». For his personal contribution to the development of education, he was awarded the honorary title of «Best Pedagogical Worker of the City of Odesa» (by decision of the Executive Committee of the Odesa City Council dated September 14, 2005. № 516). For his significant contribution to ensuring a high level of educational training of students, upgrading the material and technical resources of the gymnasium, he was awarded an honorary award (gold emblem with a diamond) by the head of the Odesa Regional State Administration (resolution dated May 31, 2007). For his personal contribution to the development of education, by the Decree of the President of Ukraine dated October 5, 2012 №582/2012, he was awarded the honorary title «Honoured Educational Worker of Ukraine».`,
  `At different times, specialties and fields of study changed, war and social cataclysms intervened, but the technical college did not lose its name and high reputation. Its employees contributed with all their effort.`,
  `In 2003, the Electrical Technical College of Communication was renamed to the Technical College of Communication and Informatization. The same year, it was incorporated into the Odesa National Academy of Communications named after O.S. Popova as its structural subdivision.`,
  `In 2007, the Technical College of Communication and Informatization was reorganized into the College of Communication and Informatization of the Odesa National Academy of Communication named after O.S. Popova.`,
  `By order of the Ministry of Education and Science of Ukraine dated 04.06.2020 №762 «On the renaming of the Economically autonomous structural subdivision of the Odesa National Academy of Communications named after O.S. Popov» College of Communication and Informatization ONAC named after. O.S. Popov has been renamed the Economically autonomous structural subdivision «Professional College of Communication and Informatization of the Odesa National Academy of Communication named after. O.S. Popova» since August 28, 2020.`,
  `By orders of the Ministry of Education and Science of Ukraine dated 09.11.2020 №1387 «On the establishment of the State University of Intellectual Technologies and Communications» and dated 16.04.2021 № 425 «On amendments to the order of the Ministry of Education and Science of Ukraine dated 09.11.2020 №1387 «On the establishment of the State University of Intellectual Technologies and Communications» the Economically autonomous structural subdivision «Professional College of Communication and Informatization of the Odesa National Academy of Communication named after. O.S. Popova» was renamed to the Economically autonomous structural subdivision «Professional college of communication and informatization of State University of Intellectual Technologies and Communications».`,
  `From 1958 to 2003, the college trained junior specialists only in an extramural form of education. In 2003, a license was obtained and for the first time, full-time students were enrolled on the basis of full general secondary education, and in September 2004, students were enrolled on the basis of basic general secondary education.`,
  `Today, the college provides training of professional junior bachelors in full-time and extramural forms of education in the following specialties:`,
];

const SPECIALTIES = [
  {
    code: `F2 «Software engineering» (full-time education).`,
    desc: `Training of specialists in the field of software engineering, focused on an effective organization of the software development process, implementation of technological principles of industrial design of software system design.`,
  },
  {
    code: `F3 «Computer science» (full-time education)`,
    desc: `specialization «Maintenance of programmed systems and complexes» – the educational concept of the specialty is to train programmer technicians to maintain computer systems and networks.\n\nspecialization «Security of computer systems and networks» – a crucial functional aspect is information security in information systems against corruption, theft, or unauthorized use. The maintenance and implementation of such functions is the prerogative of computer systems and network security specialists.`,
  },
  {
    code: `G5 «Electronics, Electronic Communications, Instrument Engineering and Radio Engineering» (full-time and extramural education)`,
    desc: `specialization «Engineering of electronic systems» – The development of the information society in Ukraine requires the training of a large number of specialists qualified to maintain modern telecommunication systems, network and office equipment.\n\nspecialization «Electronic communications and radio technology» – students of this specialty study the structure and components of various mobile communication systems, challenges of network design, monitoring and management, and other technical issues.`,
  },
];

const CLOSING_PARAGRAPHS = [
  `Graduates of the College have the right to continue their studies at the State University of Intellectual Technologies and Communications or at other Higher Education Institutions of the III-IV level of accreditation.`,
  `The structure of the college includes 5 Departmental Committees: foreign languages, humanities and socio-economic education, natural sciences and mathematics education, information technology, telecommunications and radio engineering.`,
  `Lessons are held in two rented facilities located at: 6 Heroiv Ukrainy Ave and 66 Mala Arnautska St, as well as at the departments of the State University of Intellectual Technologies and Communications.`,
  `To ensure the educational process, the college has 9 classrooms, 5 computer classrooms equipped with modern personal computers, multimedia projectors and screens, LCD monitors, 9 laboratories, including 2 laboratories for educational electrical installation and professional practical training. For academic and scientific needs of students and teachers, all computers have Internet connection. The classrooms and laboratories of the college are equipped with the necessary inventory, equipment, and furniture.`,
  `Specialized laboratories of field-specific departments of the university are also used for conducting classes.`,
  `Non-local students are provided with accommodation in university dormitories, which meets the students' housing needs by 100%.`,
  `For the physical education, the sports halls of the university are used, equipped with the necessary sports equipment.`,
  `College teachers lead the research work of students participating in the student science and technology conference «Telecommunications, information and computer networks and systems: present and future» and presenting papers. The conference has been held annually since 2010.`,
  `The college has an active student government, which, together with the administration, organizes and implements various educational activities.`,
  `The college hosts annual sports tournaments in basketball, volleyball, football, arm wrestling, tennis, checkers, etc. Students and teachers at the college take an active part in the National Sports Games of Communications Workers and Students every year, where they won many prizes, including tennis, darts, and checkers.`,
  `The college team participates in sports competitions in various sports and the physical education Olympiad among professional pre-higher education institutions of the Odesa region.`,
];

export const AboutPage = () => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Historical Reference</h1>

    <div className="bg-white rounded-2xl p-8 space-y-5">
      {PARAGRAPHS.map((p, i) => (
        <p key={i} className="text-slate-700 text-base leading-relaxed">{p}</p>
      ))}

      <div className="space-y-5 pt-2">
        {SPECIALTIES.map((s) => (
          <div key={s.code}>
            <p className="text-slate-700 text-base leading-relaxed">
              <strong>{s.code}</strong>{` `}
              {s.desc.split('\n\n').map((chunk, i) => (
                <span key={i}>
                  {i > 0 && <><br /><br /></>}
                  {chunk}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {CLOSING_PARAGRAPHS.map((p, i) => (
        <p key={i} className="text-slate-700 text-base leading-relaxed">{p}</p>
      ))}
    </div>
  </div>
);

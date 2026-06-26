import { PdfViewer } from '@/components/ui/pdf-viewer';

const ACCOMMODATION_TEXT = [
  `Accommodation arrangements for international students in a dormitory`,
  `International students studying at the Economically autonomous structural subdivision «Professional college of communication and informatization of State University of Intellectual Technologies and Communications» have the opportunity to live in the student dormitory of the State University of Intellectual Technologies and Communications.`,
  `The right to use the premises of the dormitory was granted to the college by order of the order of the rector of the University on the provision of material and technical base facilities for use.`,
  `According to the order, a part of the dormitory №6 with a total area of 958.1 square meters is provided for the use of Economically autonomous structural subdivision «Professional college of communication and informatization of State University of Intellectual Technologies and Communications», which includes:`,
];

const ACCOMMODATION_LIST = [
  'residential rooms;',
  'Sanitary facilities (bathrooms);',
  'Communal hallways.',
];

const ACCOMMODATION_CLOSING = [
  `The check-in of students, including foreign citizens, is carried out in accordance with the Regulations on the dormitory of the State University of Intellectual Technologies and Communications and based on the order on check-in.`,
  `The dormitory is intended for temporary accommodation of students for the duration of academic period and provides essential housing conditions necessary for living and recreation.`,
  `International students living in a dormitory are obliged to:`,
];

const RULES_LIST = [
  'follow the rules of the dormitory\'s internal regulations;',
  'comply with sanitary requirements and fire safety regulations;',
  'respect the rights of other dormitory residents.',
];

const CLOSING = `The educational institution provides equal living conditions for all students, regardless of their citizenship.`;

export const AdmissionRulesPage = () => (
  <div className="max-w-3xl mx-auto space-y-12">
    <PdfViewer url="https://college.suitt.edu.ua/wp-content/uploads/2026/03/AR-educational-profeccional-degree1.pdf" title="Admission rules" />
    <PdfViewer url="https://college.suitt.edu.ua/wp-content/uploads/2026/03/Appendix-1-AR.pdf" title="Appendix" />

    <div className="space-y-4 pt-4 border-t border-slate-200">
      {ACCOMMODATION_TEXT.map((p, i) => (
        <p key={i} className="text-slate-700 text-base leading-relaxed">{p}</p>
      ))}
      <ul className="space-y-1 pl-4">
        {ACCOMMODATION_LIST.map((item) => (
          <li key={item} className="text-slate-700 text-base">{item}</li>
        ))}
      </ul>
      {ACCOMMODATION_CLOSING.map((p, i) => (
        <p key={i} className="text-slate-700 text-base leading-relaxed">{p}</p>
      ))}
      <ul className="space-y-1 pl-4">
        {RULES_LIST.map((item) => (
          <li key={item} className="text-slate-700 text-base">{item}</li>
        ))}
      </ul>
      <p className="text-slate-700 text-base leading-relaxed">{CLOSING}</p>
    </div>
  </div>
);

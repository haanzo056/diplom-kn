const TERMS = `Middle-school based: 3 years 10 months\nHigh-school based or based on education in another college: 2 years 10 months`;
const TERMS_D = `Middle-school based: 2 years 10 months\nHigh-school based/based on education in another college: 1 year 10 months`;


const TermsCell = ({ terms }: { terms: string }) => (
  <td className="border border-slate-300 px-4 py-3 align-top text-sm text-slate-700">
    {terms.split('\n').map((line, i) => {
      const [label, ...rest] = line.split(': ');
      return (
        <p key={i} className={i > 0 ? 'mt-3' : ''}>
          <span className="italic">{label}: </span>
          <strong>{rest.join(': ')}</strong>
        </p>
      );
    })}
  </td>
);

export const FacultiesPage = () => (
  <div className="max-w-5xl mx-auto">
    <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Faculties and specialties</h1>

    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 text-center text-sm font-medium text-slate-700">
        List of faculties and specialities
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th colSpan={2} className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-800">
                Field of study
              </th>
              <th colSpan={2} className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-800">
                Speciality
              </th>
              <th rowSpan={2} className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-800 align-bottom">
                Educational program
              </th>
              <th rowSpan={2} className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-800 align-bottom">
                Standard terms of study
              </th>
            </tr>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 px-4 py-2 text-left font-medium text-slate-700 italic">ID</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-medium text-slate-700 italic">Name</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-medium text-slate-700 italic">ID</th>
              <th className="border border-slate-300 px-4 py-2 text-left font-medium text-slate-700 italic">Name</th>
            </tr>
          </thead>
          <tbody>
            {/* F / F2 */}
            <tr>
              <td rowSpan={4} className="border border-slate-300 px-4 py-3 align-middle text-slate-700 font-medium">F</td>
              <td rowSpan={4} className="border border-slate-300 px-4 py-3 align-middle text-slate-700">Informational technologies</td>
              <td className="border border-slate-300 px-4 py-3 align-middle text-slate-700 font-medium">F2</td>
              <td className="border border-slate-300 px-4 py-3 align-middle text-slate-700">Software engineering</td>
              <td className="border border-slate-300 px-4 py-3 text-slate-700">Development of a software</td>
              <TermsCell terms={TERMS} />
            </tr>
            {/* F3 row 1 */}
            <tr>
              <td rowSpan={2} className="border border-slate-300 px-4 py-3 align-middle text-slate-700 font-medium">F3</td>
              <td rowSpan={2} className="border border-slate-300 px-4 py-3 align-middle text-slate-700">Computer science</td>
              <td className="border border-slate-300 px-4 py-3 text-slate-700">Maintenance of software systems and complexes</td>
              <TermsCell terms={TERMS} />
            </tr>
            {/* F3 row 2 */}
            <tr>
              <td className="border border-slate-300 px-4 py-3 text-slate-700">Computer system and network security</td>
              <TermsCell terms={TERMS} />
            </tr>
            {/* empty row for spacing */}
            <tr><td colSpan={4} className="border border-slate-300 h-0 p-0" /></tr>

            {/* G / G5 row 1 */}
            <tr>
              <td rowSpan={2} className="border border-slate-300 px-4 py-3 align-middle text-slate-700 font-medium">G</td>
              <td rowSpan={2} className="border border-slate-300 px-4 py-3 align-middle text-slate-700">Engineering, manufacturing, and construction</td>
              <td rowSpan={2} className="border border-slate-300 px-4 py-3 align-middle text-slate-700 font-medium">G5</td>
              <td rowSpan={2} className="border border-slate-300 px-4 py-3 align-middle text-slate-700">Electronics, electronic communications, instrument engineering, and radio engineering</td>
              <td className="border border-slate-300 px-4 py-3 text-slate-700">Electronic systems engineering</td>
              <TermsCell terms={TERMS} />
            </tr>
            {/* G5 row 2 */}
            <tr>
              <td className="border border-slate-300 px-4 py-3 text-slate-700">Electronic communications and radio technologies</td>
              <TermsCell terms={TERMS} />
            </tr>

            {/* D / D1 */}
            <tr>
              <td className="border border-slate-300 px-4 py-3 align-middle text-slate-700 font-medium">D</td>
              <td className="border border-slate-300 px-4 py-3 align-middle text-slate-700">Business, Administration, and Law</td>
              <td className="border border-slate-300 px-4 py-3 align-middle text-slate-700 font-medium">D1</td>
              <td className="border border-slate-300 px-4 py-3 align-middle text-slate-700">Accounting and taxation</td>
              <td className="border border-slate-300 px-4 py-3 text-slate-700">Accounting activities</td>
              <TermsCell terms={TERMS_D} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

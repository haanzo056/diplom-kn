const CONTACTS = [
  { no: 1, position: 'Principal', name: 'Petrusenko Serhii Yuriiovych', phone: '+38 (048) 763-01-01', bold: true },
  { no: 2, position: 'Deputy Director for Academic Affairs', name: 'Trofymenko Yuliia Volodymyrivna', phone: '+38 (048) 763-01-03', bold: false },
  { no: 3, position: 'Deputy Director for Educational and Student Affairs', name: 'Yashchyshyna Iryna Yaroslavivna', phone: '+38 (048) 763-01-06', bold: false },
  { no: 4, position: 'Deputy Director for Administrative and Economic Affairs', name: 'Ivashkovska Kateryna Yuriivna', phone: '+38 (048) 763-01-02', bold: false },
  { no: 5, position: 'Head of the Educational and Methodological Office', name: 'Humenna Olha Anatoliivna', phone: '+38 (048) 722-33-55', bold: false },
  { no: 6, position: 'Methodologist', name: 'Osadchuk Tetiana Volodymyrivna', phone: '+38 (048) 763-01-07', bold: false },
  { no: 7, position: 'Chief Accountant', name: 'Piatkovska Oksana Oleksiivna', phone: '+38 (048) 705-03-52', bold: false },
  { no: 8, position: "Director's Reception", name: 'Verbytska Anzhelika Viktorivna', phone: '+38 (048) 763-01-00', bold: false },
  { no: 9, position: 'HR Department (Personnel)', name: 'Ivashkovska Alla Hryhorivna', phone: '+38 (048) 763-01-02', bold: false },
];

export const ContactsPage = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <h1 className="text-3xl font-bold text-slate-900 text-center">Contact Information</h1>

    <div className="bg-white rounded-2xl p-8 space-y-3 text-center">
      <p className="font-semibold text-slate-800">
        Professional College of Communication and Informatization of the State University of Intellectual Technologies and Communications
      </p>
      <p className="text-slate-700">
        <strong>Address:</strong> 6 Ukrainskykh Heroiv Ave. Odesa, 65045 Ukraine
      </p>
      <p className="text-slate-700">
        <strong>E-mail:</strong>{' '}
        <a href="mailto:coledgeonat@ukr.net" className="text-[#3D5AF1] hover:underline">coledgeonat@ukr.net</a>
        {'  '}
        <strong>Website:</strong>{' '}
        <a href="https://www.college.suitt.edu.ua" target="_blank" rel="noopener noreferrer" className="text-[#3D5AF1] hover:underline">
          www.college.suitt.edu.ua
        </a>
      </p>
    </div>

    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-4 py-3 text-left font-semibold text-slate-700 w-16">No.</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">Position</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">Full Name</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">Work Phone</th>
          </tr>
        </thead>
        <tbody>
          {CONTACTS.map((c) => (
            <tr key={c.no} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 text-slate-500">{c.no}.</td>
              <td className={`px-4 py-3 text-slate-700 ${c.bold ? 'font-bold' : ''}`}>{c.position}</td>
              <td className={`px-4 py-3 text-slate-700 ${c.bold ? 'font-bold' : ''}`}>{c.name}</td>
              <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="bg-white rounded-2xl p-8 space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Our Address</h2>
      <p className="text-slate-700">
        <strong>Professional College of Communication and Informatization of SUITC</strong>{' '}
        6 Ukrainskykh Heroiv Ave. Odesa, Odesa Oblast, 65045 Ukraine
      </p>
      <div className="rounded-xl overflow-hidden h-64">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.5!2d30.7233!3d46.4774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c633247a84e80b%3A0x4ded2bc412e2a3a5!2z0L_RgNC-0YHQv9C10LrRgiDQo9C60YDQsNGX0L3RgdGM0LrQuNGFINCT0LXRgNC-0ZfQsiwgNg!5e0!3m2!1suk!2sua!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </div>
);

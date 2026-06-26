export default function TeamPage() {
  const teamMembers = [
    { name: "Swapnil Chakraborty", email: "swapnil@icfai.edu" },
    { name: "Salkwchang Debbarma", email: "salkwchang@icfai.edu" },
    { name: "Nayan Das", email: "nayan@icfai.edu" },
    { name: "Antar Bhowmik", email: "antar@icfai.edu" },
    { name: "Dipu Debbarma", email: "dipu@icfai.edu" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-16">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.name} className="glass-card p-8 rounded-3xl text-center hover:border-white/20 transition-all">
            <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center text-white/50">
              Photo
            </div>
            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
            <p className="text-sm text-white/60">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
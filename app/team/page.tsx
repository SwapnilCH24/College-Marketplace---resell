'use client';

import Image from 'next/image';

export default function TeamPage() {
  const teamMembers = [
    { name: "Swapnil Chakraborty", role: "Lead Developer", image: "/swapnil.png" },
    { name: "Salkwchang Debbarma", role: "Backend Developer", image: "/salkwchang.png" },
    { name: "Nayan Das", role: "Frontend Developer", image: "/nayan.png" },
    { name: "Antar Bhowmik", role: "UI/UX Designer", image: "/antar.png" },
    { name: "Dipu Debbarma", role: "Operations Manager", image: "/dipu.png" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-16">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.name} className="glass-card p-8 rounded-3xl text-center border border-white/10">
            
            <div className="mx-auto mb-6 w-24 h-24 rounded-full overflow-hidden relative border-2 border-white/20">
              <Image
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                unoptimized={true}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            
            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
            <p className="text-sm text-white/60">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
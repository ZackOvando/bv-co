'use client';
import { useState } from 'react';
import CompaniesCard from "./components/companies/card";
import CompanySidePanel, { Company } from "./components/companies/sidePanel";
import { companies } from "./content";

interface FullCompany {
  modal: Company;
  [key: string]: any;
}

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleModalOpen = (company: FullCompany) => {
    setSelectedCompany(company.modal);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    // Small delay before clearing company to allow exit animation
    setTimeout(() => setSelectedCompany(null), 300);
  };

  return (
    <>
      <CompanySidePanel
        company={selectedCompany}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />

      <div className="bg-[#0016DA] w-screen min-h-screen flex justify-center pb-48">
        <div className="container w-full px-4 md:px-0">

          <h1 className="font-sans font-bold text-white text-6xl mb-8 py-50">
            We started some awesome businesses.
          </h1>

          <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12">
            {companies.map((company) => (
              <CompaniesCard
                key={company.name.toString()}
                company={company}
                onModalOpen={handleModalOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

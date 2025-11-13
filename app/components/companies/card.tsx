'use client';

import Image from "next/image";

const CompaniesCard = ({ company, onModalOpen }: { company: any, onModalOpen: (company: any) => void }) => {
    const handleClick = (e) => {
        if (company.type === "external") {
            window.open(company.url, "_blank", "noopener,noreferrer");
        } else if (company.type === "modal" && onModalOpen) {
            onModalOpen(company);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${company.image})`, // e.g. "/assets/betzon.jpg"
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="cursor-pointer relative w-full overflow-hidden rounded-2xl shadow-md aspect-square group"
            onClick={handleClick}
        >

            <div className={`absolute w-full h-full flex items-center justify-center z-40 ${company.gap} flex-row`}>
                {
                    company.logo && (
                        <Image src={company.logo} alt={company.name} width={company.logoWidth} height={company.logoHeight} />
                    )
                }
                <h2 className={`text-white ${company.textSize} font-bold drop-shadow leading-tight`}>{company.name}</h2>
            </div>

            <div className="absolute inset-0 z-10 transition-colors duration-400 bg-black/70 group-hover:bg-black/80" />

        </div>
    );
};

export default CompaniesCard;
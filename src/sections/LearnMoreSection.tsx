"use client";

type LearnMoreSectionProps = {
  onClick: () => void;
};

export default function LearnMoreSection({ onClick }: LearnMoreSectionProps) {
  return (
    <section className="w-full flex justify-center py-12 bg-black">
      <button
        onClick={onClick}
        className="px-8 py-4 bg-red-400 text-white rounded-full shadow-lg hover:bg-red-500 transition"
      >
        Saber Mais
      </button>
    </section>
  );
}

interface HeaderSectionProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function HeaderSection({ label, title, subtitle }: HeaderSectionProps) {
  return (
    <div className="flex flex-col items-center text-center lg:text-[66px]">
      {label ? (
        <div className="text-gradient_indigo-purple mb-4 font-semibold lg:text-[66px]">
          {label}
        </div>
      ) : null}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-[66px]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-6 text-balance text-lg text-muted-foreground lg:text-[40px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

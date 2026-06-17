interface SectionHeaderProps {
  label: string;
  title: string;
  count?: string;
}

export default function SectionHeader({
  label,
  title,
  count,
}: SectionHeaderProps) {
  return (
    <div className="sec-head">
      <div>
        <p className="sec-label">{label}</p>
        <h2 className="sec-title">{title}</h2>
      </div>
      {count ? <span className="sec-count">{count}</span> : null}
    </div>
  );
}

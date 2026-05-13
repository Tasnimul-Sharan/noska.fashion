export function FormField({ label, value, onChange, type = "text", required = false }) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required={required}
        className="focus-ring mt-2 h-11 w-full rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm outline-none"
      />
    </div>
  );
}

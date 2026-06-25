export default function StatusBadge({ status }: { status: 'available' | 'reserved' | 'sold' }) {
  const config = {
    available: { label: 'Verfügbar', className: 'bg-green-900/50 text-green-400 border-green-700/50' },
    reserved: { label: 'Reserviert', className: 'bg-amber-900/50 text-amber-400 border-amber-700/50' },
    sold: { label: 'Verkauft', className: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
  }
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {label}
    </span>
  )
}

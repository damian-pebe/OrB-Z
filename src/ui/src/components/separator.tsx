interface SeparatorProps {
  className?: string;
}

export default function Separator({ className }: SeparatorProps) {
  return (
    <div className={`${className} h-0.5 bg-white/20 w-full mb-5 mt-1 `} />
  )
}

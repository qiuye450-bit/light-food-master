interface Props {
  onClick: () => void
  icon?: string
}

export default function FloatingButton({ onClick, icon = '+' }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 text-white text-2xl font-bold shadow-lg shadow-primary-300/40 active:scale-90 transition-all duration-200 flex items-center justify-center hover:shadow-xl"
    >
      {icon}
    </button>
  )
}

export const metadata = {
  title: 'Admin | Savr',
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {children}
    </div>
  )
}
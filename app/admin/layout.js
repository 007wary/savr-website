export const metadata = {
  title: 'Admin | Savr',
  robots: {
    index: false,
    follow: false,
  },
}
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-20">
      {children}
    </div>
  )
}
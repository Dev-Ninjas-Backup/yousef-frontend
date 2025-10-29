import { ReactNode } from "react"
import Footer from "@/components/shared/main/Footer/Footer"

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Hero } from './components/Hero'
import { Work } from './components/Work'
import { About } from './components/About'
import { Resume } from './components/Resume'
import { Contact } from './components/Contact'

const SIDEBAR_WIDTH = 220

export default function App() {
  return (
    <>
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="topbar-wrapper">
        <TopBar />
      </div>
      <main className="main-content">
        <Hero />
        <Work />
        <About />
        <Resume />
        <Contact />
      </main>
      <style>{`
        .sidebar-wrapper { display: none; }
        .topbar-wrapper { display: block; }
        .main-content { margin-left: 0; }
        @media (min-width: 768px) {
          .sidebar-wrapper { display: block; }
          .topbar-wrapper { display: none; }
          .main-content { margin-left: ${SIDEBAR_WIDTH}px; }
        }
      `}</style>
    </>
  )
}

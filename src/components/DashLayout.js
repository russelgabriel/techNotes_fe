import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash_container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  )
}

export default DashLayout

import React from 'react'
import Category from '../components/Category'
import Navigation from '../components/Navigation'
import HomeStyle from "../styles/pages/Home.module.scss"
import ReportForm from '../components/form/reportForm'

const Home = () => {
  return (
    <div>
      <Navigation />
      <div className={HomeStyle.reportMain}>
        {/* <input type="text" placeholder='入力'/> */}
        <ReportForm />
        <Category />
      </div>
    </div>
  )
}

export default Home

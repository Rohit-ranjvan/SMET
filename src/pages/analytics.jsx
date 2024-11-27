import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderDate from '@/components/shared/pageHeader/PageHeaderDate'
import EmailOverview from '@/components/addcenter'
import Browser from '@/components/widgetsList/Browser'
import Remainders from '@/components/widgetsTables/Remainders'
import GoalMiscellaneous from '@/components/widgetsMiscellaneous/GoalMiscellaneous'
import SiteOverviewChart from '@/components/widgetsCharts/SiteOverviewChart'
import VisitorsOverviewChart from '@/components/widgetsCharts/VisitorsOverviewChart'
import SocialMediaStatisticsChart from '@/components/widgetsCharts/SocialMediaStatisticsChart'
import MarketingChart from '@/components/widgetsCharts/MarketingChart'
import Footer from '@/components/shared/Footer'
import Addcenter from '@/components/addcenter'


const Analytics = () => {
    return (
        <>
            <PageHeader >
                <PageHeaderDate />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                   
                    {/* <VisitorsOverviewChart /> */}
                    {/* <Browser title={"Browser States"} /> */}
                    {/* <SiteOverviewChart /> */}
                    {/* <GoalMiscellaneous /> */}
                    {/* <MarketingChart /> */}
                    {/* <Remainders title={"Project Remainders"} /> */}
                    {/* <SocialMediaStatisticsChart /> */}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Analytics
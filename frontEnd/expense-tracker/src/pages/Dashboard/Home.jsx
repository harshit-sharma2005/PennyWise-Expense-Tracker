import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import InfoCard from '../../components/cards/InfoCard'
import { LuWalletMinimal, LuHandCoins, LuTrendingUp } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { addThousandsSeperator } from '../../utils/helper'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import Last60DaysIncome from '../../components/Dashboard/Last60DaysIncome'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import IncomeExpenseTrend from '../../components/Dashboard/IncomeExpenseTrend'
import { userContext } from '../../context/userContext'

const Home = () => {
  useUserAuth()
  const navigate = useNavigate()
  const { user } = useContext(userContext)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)


  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)
      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (err) {
      console.log("Something went wrong. Try again later")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData();
    return () => { }
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='py-2 px-1 max-w-[1600px] mx-auto lg:h-[calc(100vh-85px)] lg:max-h-[calc(100vh-85px)] lg:overflow-hidden flex flex-col lg:justify-between gap-3'>

        {/* welcome section */}
        <div className='flex items-center justify-between animate-fadeInUp'>
          <div>
            <h4 className='text-xl font-bold text-gray-800'>
              {getGreeting()}, {user?.fullName?.split(" ")[0] || "there"} 👋
            </h4>
            <p className='text-xs text-gray-500 mt-0.5'>Here's what's happening with your finances</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 lg:flex-1 lg:min-h-0'>
          {/* Left Column: Cards, Area Chart, Bar Charts */}
          <div className='lg:col-span-2 flex flex-col justify-between gap-3 lg:min-h-0'>
            
            {/* Info Cards Row */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 stagger-children'>
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
                color="bg-gradient-to-br from-violet-500 to-purple-600"
              />

              <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Income"
                value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
                color="bg-gradient-to-br from-orange-400 to-orange-600"
              />

              <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense"
                value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
                color="bg-gradient-to-br from-red-400 to-red-600"
              />
            </div>

            {/* Income vs Expense Area Chart */}
            <div className='flex-grow flex flex-col min-h-0 justify-between'>
              <IncomeExpenseTrend
                incomeTransactions={dashboardData?.last60dayIncome?.transactions}
                expenseTransactions={dashboardData?.last30dayExpenses?.transactions}
              />
            </div>

            {/* Two Bar Charts */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <Last60DaysIncome
                data={dashboardData?.last60dayIncome}
              />

              <Last30DaysExpenses
                data={dashboardData?.last30dayExpenses}
              />
            </div>
            
          </div>

          {/* Right Column: Financial Overview, Recent Transactions */}
          <div className='lg:col-span-1 flex flex-col justify-between gap-3 lg:min-h-0'>
            
            {/* Financial Overview (Pie Chart) */}
            <div className='flex-grow flex flex-col min-h-0 justify-between'>
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalExpense={dashboardData?.totalExpense || 0}
                totalIncome={dashboardData?.totalIncome || 0}
              />
            </div>

            {/* Recent Transactions */}
            <div className='flex-grow flex flex-col min-h-0 justify-between'>
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => { navigate("/expense") }}
              />
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Home
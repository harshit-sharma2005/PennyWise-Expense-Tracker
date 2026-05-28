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
      <div className='my-5 mx-auto'>

        {/* welcome section */}
        <div className='flex items-center justify-between mb-6 animate-fadeInUp'>
          <div>
            <h4 className='text-2xl font-semibold text-gray-800'>
              {getGreeting()}, {user?.fullName?.split(" ")[0] || "there"} 👋
            </h4>
            <p className='text-sm text-gray-500 mt-1'>Here's what's happening with your finances</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children'>
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

        {/* income vs expense area chart */}
        <div className='mt-6'>
          <IncomeExpenseTrend
            incomeTransactions={dashboardData?.last60dayIncome?.transactions}
            expenseTransactions={dashboardData?.last30dayExpenses?.transactions}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => { navigate("/expense") }}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalExpense={dashboardData?.totalExpense || 0}
            totalIncome={dashboardData?.totalIncome || 0}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <Last60DaysIncome
            data={dashboardData?.last60dayIncome}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30dayExpenses}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
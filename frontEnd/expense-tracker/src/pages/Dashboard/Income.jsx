import React, { useEffect, useState, useMemo } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { LuPlus, LuDownload, LuWalletMinimal, LuSearch, LuX } from 'react-icons/lu'
import TransactionInfoCard from '../../components/cards/TransactionInfoCard'
import moment from 'moment'
import CustomPieChart from '../../components/Charts/CustomPieChart'
import { addThousandsSeperator } from '../../utils/helper'
import Modal from '../../components/layouts/Modal'
import AddIncomeForm from '../../components/inputs/AddIncomeForm'

const COLORS = ['#00e676', '#1de9b6', '#ffd740', '#ff6d00', '#40c4ff', '#10b981', '#f59e0b', '#ef4444']

const Income = () => {
  useUserAuth()
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openAddIncome, setOpenAddIncome] = useState(false)
  const [editingIncome, setEditingIncome] = useState(null)

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDateFrom, setFilterDateFrom] = useState("")
  const [filterDateTo, setFilterDateTo] = useState("")

  const fetchAllIncome = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (err) {
      console.log("Something went wrong. Try again later")
    } finally {
      setLoading(false)
    }
  }

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income
    if (!source || !amount || !date) {
      toast.error("All fields are required")
      return
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source, amount, date, icon
      })
      setOpenAddIncome(false)
      toast.success("Income added successfully")
      fetchAllIncome()
    } catch (err) {
      console.error("Error adding income", err)
      toast.error("Failed to add income")
    }
  }

  const handleEditIncome = async (income) => {
    const { source, amount, date, icon } = income
    if (!source || !amount) {
      toast.error("Source and amount are required")
      return
    }
    try {
      await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(editingIncome._id), {
        source, amount, date, icon
      })
      setOpenAddIncome(false)
      setEditingIncome(null)
      toast.success("Income updated successfully")
      fetchAllIncome()
    } catch (err) {
      console.error("Error updating income", err)
      toast.error("Failed to update income")
    }
  }

  const handleDeleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      toast.success("Income deleted successfully")
      fetchAllIncome()
    } catch (err) {
      console.error("Error deleting income", err)
      toast.error("Failed to delete income")
    }
  }

  const handleDownloadIncome = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'income_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Download failed", err)
      toast.error("Failed to download")
    }
  }

  const openEditModal = (item) => {
    setEditingIncome(item)
    setOpenAddIncome(true)
  }

  const closeModal = () => {
    setOpenAddIncome(false)
    setEditingIncome(null)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setFilterDateFrom("")
    setFilterDateTo("")
  }

  const hasActiveFilters = searchQuery || filterDateFrom || filterDateTo

  // Filter income data
  const filteredIncome = useMemo(() => {
    return incomeData.filter(item => {
      // Search by source
      if (searchQuery && !item.source.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      // Filter by date from
      if (filterDateFrom && new Date(item.date) < new Date(filterDateFrom)) {
        return false
      }
      // Filter by date to
      if (filterDateTo && new Date(item.date) > new Date(filterDateTo + 'T23:59:59')) {
        return false
      }
      return true
    })
  }, [incomeData, searchQuery, filterDateFrom, filterDateTo])

  //prepare data for pie chart - group by source
  const prepareChartData = () => {
    const dataMap = {}
    filteredIncome.forEach(item => {
      const source = item.source
      if (!dataMap[source]) dataMap[source] = 0
      dataMap[source] += Number(item.amount)
    })
    return Object.entries(dataMap).map(([name, amount]) => ({ name, amount }))
  }

  const totalIncome = filteredIncome.reduce((sum, item) => sum + Number(item.amount), 0)

  useEffect(() => {
    fetchAllIncome()
    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='flex items-center justify-between'>
          <h5 className='text-xl font-medium'>Income Overview</h5>
          <div className='flex items-center gap-3'>
            <button className='card-btn' onClick={handleDownloadIncome}>
              <LuDownload className='text-base' /> Download
            </button>
            <button className='add-btn' onClick={() => { setEditingIncome(null); setOpenAddIncome(true) }}>
              <LuPlus className='text-lg' /> Add Income
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className='card mt-4 !p-4 bg-bg-surface border-border-default'>
          <div className='flex flex-wrap items-end gap-4'>
            <div className='flex-1 min-w-[200px]'>
              <label className='text-xs font-medium text-text-secondary mb-1 block'>Search by Source</label>
              <div className='relative'>
                <LuSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary' size={16} />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search income...'
                  className='w-full pl-9 pr-3 py-2 text-sm bg-bg-elevated border border-border-default text-text-primary rounded-lg outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all'
                />
              </div>
            </div>
            <div className='min-w-[160px]'>
              <label className='text-xs font-medium text-text-secondary mb-1 block'>From Date</label>
              <input
                type='date'
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className='w-full px-3 py-2 text-sm bg-bg-elevated border border-border-default text-text-primary rounded-lg outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all'
              />
            </div>
            <div className='min-w-[160px]'>
              <label className='text-xs font-medium text-text-secondary mb-1 block'>To Date</label>
              <input
                type='date'
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className='w-full px-3 py-2 text-sm bg-bg-elevated border border-border-default text-text-primary rounded-lg outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all'
              />
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className='flex items-center gap-1 text-xs font-medium text-danger hover:text-danger/90 bg-danger-bg hover:bg-danger-bg/80 border border-danger/15 px-3 py-2 rounded-lg transition-all cursor-pointer'
              >
                <LuX size={14} /> Clear
              </button>
            )}
          </div>
          {hasActiveFilters && (
            <p className='text-xs text-text-tertiary mt-2'>
              Showing {filteredIncome.length} of {incomeData.length} records
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <div className='card'>
            <div className='flex items-center justify-between mb-4'>
              <h5 className='text-sm font-semibold text-text-primary uppercase tracking-wider'>All Income</h5>
            </div>
            <div className='max-h-[600px] overflow-y-auto pr-2 custom-scrollbar'>
              {filteredIncome.length === 0 && !loading ? (
                <div className='flex flex-col items-center justify-center py-12 text-text-tertiary'>
                  <LuWalletMinimal className='text-4xl mb-3 text-text-tertiary'/>
                  <p className='text-sm'>{hasActiveFilters ? "No matching records found" : "No income records found"}</p>
                  <p className='text-xs mt-1'>{hasActiveFilters ? "Try adjusting your filters" : 'Click "Add Income" to get started'}</p>
                </div>
              ) : (
                filteredIncome.map((item) => (
                  <TransactionInfoCard
                    key={item._id}
                    title={item.source}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type="income"
                    onDelete={() => handleDeleteIncome(item._id)}
                    onEdit={() => openEditModal(item)}
                  />
                ))
              )}
            </div>
          </div>

          <div className='card'>
            <div className='flex items-center justify-between mb-2'>
              <h5 className='text-sm font-semibold text-text-primary uppercase tracking-wider'>Income by Source</h5>
            </div>
            <CustomPieChart
              data={prepareChartData()}
              label="Total Income"
              totalAmount={`$${addThousandsSeperator(totalIncome)}`}
              colors={COLORS}
              showTextAnchor
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncome}
          onClose={closeModal}
          title={editingIncome ? "Edit Income" : "Add Income"}
        >
          <AddIncomeForm
            key={editingIncome ? editingIncome._id : 'add'}
            onAddIncome={editingIncome ? handleEditIncome : handleAddIncome}
            editData={editingIncome}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
import React, { useEffect, useState, useMemo } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { LuPlus, LuDownload, LuHandCoins, LuSearch, LuX } from 'react-icons/lu'
import TransactionInfoCard from '../../components/cards/TransactionInfoCard'
import moment from 'moment'
import CustomPieChart from '../../components/Charts/CustomPieChart'
import { addThousandsSeperator } from '../../utils/helper'
import Modal from '../../components/layouts/Modal'
import AddExpenseForm from '../../components/inputs/AddExpenseForm'

const COLORS = ['#00e676', '#1de9b6', '#ffd740', '#ff6d00', '#40c4ff', '#10b981', '#f59e0b', '#ef4444']

const Expense = () => {
  useUserAuth()
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openAddExpense, setOpenAddExpense] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDateFrom, setFilterDateFrom] = useState("")
  const [filterDateTo, setFilterDateTo] = useState("")

  const fetchAllExpense = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (err) {
      console.log("Something went wrong. Try again later")
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon, note } = expense
    if (!category || !amount || !date) {
      toast.error("All fields are required")
      return
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, amount, date, icon, note
      })
      setOpenAddExpense(false)
      toast.success("Expense added successfully")
      fetchAllExpense()
    } catch (err) {
      console.error("Error adding expense", err)
      toast.error("Failed to add expense")
    }
  }

  const handleEditExpense = async (expense) => {
    const { category, amount, date, icon, note } = expense
    if (!category || !amount) {
      toast.error("Category and amount are required")
      return
    }
    try {
      await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(editingExpense._id), {
        category, amount, date, icon, note
      })
      setOpenAddExpense(false)
      setEditingExpense(null)
      toast.success("Expense updated successfully")
      fetchAllExpense()
    } catch (err) {
      console.error("Error updating expense", err)
      toast.error("Failed to update expense")
    }
  }

  const handleDeleteExpense = async (id) => {
    const confirmed = window.confirm("Delete this expense?")
    if (!confirmed) return
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      toast.success("Expense deleted successfully")
      fetchAllExpense()
    } catch (err) {
      console.error("Error deleting expense", err)
      toast.error("Failed to delete expense")
    }
  }

  const handleDownloadExpense = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'expense_details.xlsx')
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
    setEditingExpense(item)
    setOpenAddExpense(true)
  }

  const closeModal = () => {
    setOpenAddExpense(false)
    setEditingExpense(null)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setFilterDateFrom("")
    setFilterDateTo("")
  }

  const hasActiveFilters = searchQuery || filterDateFrom || filterDateTo

  // Filter expense data
  const filteredExpense = useMemo(() => {
    return expenseData.filter(item => {
      // Search by category
      if (searchQuery && !item.category.toLowerCase().includes(searchQuery.toLowerCase())) {
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
  }, [expenseData, searchQuery, filterDateFrom, filterDateTo])

  //prepare data for pie chart - group by category
  const prepareChartData = () => {
    const dataMap = {}
    filteredExpense.forEach(item => {
      const category = item.category
      if (!dataMap[category]) dataMap[category] = 0
      dataMap[category] += Number(item.amount)
    })
    return Object.entries(dataMap).map(([name, amount]) => ({ name, amount }))
  }

  const totalExpense = filteredExpense.reduce((sum, item) => sum + Number(item.amount), 0)

  useEffect(() => {
    fetchAllExpense()
    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='flex items-center justify-between'>
          <h5 className='text-xl font-medium text-white'>Expense Overview</h5>
          <div className='flex items-center gap-3'>
            <button className='card-btn' onClick={handleDownloadExpense}>
              <LuDownload className='text-base' /> Download
            </button>
            <button className='add-btn' onClick={() => { setEditingExpense(null); setOpenAddExpense(true) }}>
              <LuPlus className='text-lg' /> Add Expense
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className='card mt-4 !p-4 bg-bg-surface border-border-default'>
          <div className='flex flex-wrap items-end gap-4'>
            <div className='flex-1 min-w-[200px]'>
              <label className='text-xs font-medium text-text-secondary mb-1 block'>Search by Category</label>
              <div className='relative'>
                <LuSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary' size={16} />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search expenses...'
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
              Showing {filteredExpense.length} of {expenseData.length} records
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <div className='card'>
            <div className='flex items-center justify-between mb-4'>
              <h5 className='text-sm font-semibold text-white uppercase tracking-wider'>All Expenses</h5>
            </div>
            <div className='max-h-[600px] overflow-y-auto pr-2 custom-scrollbar'>
              {filteredExpense.length === 0 && !loading ? (
                <div className='flex flex-col items-center justify-center py-12 text-text-tertiary'>
                  <LuHandCoins className='text-4xl mb-3 text-text-tertiary'/>
                  <p className='text-sm'>{hasActiveFilters ? "No matching records found" : "No expense records found"}</p>
                  <p className='text-xs mt-1'>{hasActiveFilters ? "Try adjusting your filters" : 'Click "Add Expense" to get started'}</p>
                </div>
              ) : (
                filteredExpense.map((item) => (
                  <TransactionInfoCard
                    key={item._id}
                    title={item.category}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type="expense"
                    note={item.note}
                    onDelete={() => handleDeleteExpense(item._id)}
                    onEdit={() => openEditModal(item)}
                  />
                ))
              )}
            </div>
          </div>

          <div className='card'>
            <div className='flex items-center justify-between mb-2'>
              <h5 className='text-sm font-semibold text-white uppercase tracking-wider'>Expense by Category</h5>
            </div>
            <CustomPieChart
              data={prepareChartData()}
              label="Total Expense"
              totalAmount={`$${addThousandsSeperator(totalExpense)}`}
              colors={COLORS}
              showTextAnchor
            />
          </div>
        </div>

        <Modal
          isOpen={openAddExpense}
          onClose={closeModal}
          title={editingExpense ? "Edit Expense" : "Add Expense"}
        >
          <AddExpenseForm
            key={editingExpense ? editingExpense._id : 'add'}
            onAddExpense={editingExpense ? handleEditExpense : handleAddExpense}
            editData={editingExpense}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
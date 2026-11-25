import React, { useEffect, useRef, useState } from 'react'
import Logo from '../Components/Logo';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { CreateFloor, EditFloorSize, getFloor, SaveSetupStep, SaveStaffing, saveTables } from '../api/floor/floor';
import { useNavigate } from 'react-router';

const makeId = () =>

    window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`



const Setup = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [rows, setRows] = useState(4)
    const [columns, setColumns] = useState(4)
    const [tableData, setTableData] = useState([])
    const [roleIsOpen, setRoleIsOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState("Captain");
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    const [savedTables, setSavedTables] = useState([])
    const [savedSize, setSavedSize] = useState(null)
    const [selectedTableId, setSelectedTabledId] = useState(null)
    const [draft, setDraft] = useState({ name: '', seats: 4, disabled: false })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const clickTimer = useRef(null)

    const [staff, setStaff] = useState([])
    const [sections, setSections] = useState([])
    const [selectedTableIds, setSelectedTableIds] = useState([])
    const [staffName, setStaffName] = useState('')
    const [sectionName, setSectionName] = useState('')
    const [sectionCaptainId, setSectionCaptainId] = useState('')
    const [expandedCaptainId, setExpandedCaptainId] = useState(null)
    const seats = 4



    const applyLayout = (layout) => {
        setRows(layout.rows)
        setColumns(layout.columns)
        setTableData(layout.tables)
        setSavedTables(layout.tables)
        setSavedSize({ rows: layout.rows, columns: layout.columns })
        setStaff(layout.staff || [])
        setSections(layout.sections || [])
        setSelectedTableIds([])
    }

    useEffect(() => {

        const load = async () => {
            const res = await getFloor()
            if (res?.status) {
                const layout = res.data
                if (layout.setupStep >= 3) {
                    navigate('/dashboard')
                    return
                }
                applyLayout(layout)
                setCurrentStep(Math.max(1, layout.setupStep + 1))
            }
            setLoading(false)
        }

        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setRoleIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const saveGrid = async () => {
        const valid = (n) => Number.isInteger(n) && n >= 1 && n <= 20
        if (!valid(rows) || !valid(columns)) {
            alert('Rows and columns must be from 1 to 20')
            return false
        }

        if (!savedSize) {
            const res = await CreateFloor({ rows, columns, seats })
            if (!res?.status) {
                alert(res?.msg || 'Could not create layout')
                return false
            }
            applyLayout(res.data)
            return true
        }

        if (savedSize.rows === rows && savedSize.columns === columns) return true

        let res = await EditFloorSize({ rows, columns })
        if (res?.needsConfirm) {
            const names = res.removed.map((t) => t.name).join(', ')
            if (!window.confirm(`These tables will be deleted: ${names}. Continue?`)) return false
            res = await EditFloorSize({ rows, columns, confirm: true })
        }

        if (!res?.status) {
            alert(res?.msg || 'Could not resize layout')
            return false
        }

        applyLayout(res.layout)
        res.notices?.forEach((n) => alert(n))
        return true

    }

    const buildChanges = () => {
        const old = new Map(savedTables.map((t) => [t.id, t]))
        const changes = []
        for (const t of tableData) {
            const o = old.get(t.id)
            if (!o) continue
            const c = { id: t.id }
            if (t.name !== o.name) c.name = t.name
            if (t.seats !== o.seats) c.seats = t.seats
            if (t.disabled !== o.disabled) c.disabled = t.disabled
            if (Object.keys(c).length > 1) changes.push(c)

        }
        return changes
    }

    const saveTableChanges = async () => {
        const changes = buildChanges()
        if (!changes.length) return true
        const res = await saveTables(changes)
        if (!res?.status) {
            alert(res?.msg || 'Could not save tables')
            return false
        }
        applyLayout(res.layout)
        res.notices?.forEach((n) => alert(n))
        return true
    }

    const handlePreviousStep = async () => {
        if (saving || currentStep <= 1) return
        if (currentStep === 2 || currentStep === 3) {
            setSaving(true)
            const ok = currentStep === 2 ? await saveTableChanges() : await saveStaffingChanges()
            setSaving(false)
            if (!ok) return
        }
        setCurrentStep(currentStep - 1)

    }
    const handleNextStep = async () => {
        if (saving) return
        setSaving(true)
        try {
            if (currentStep === 1) {
                if (!(await saveGrid())) return
                setCurrentStep(2)
            } else if (currentStep === 2) {
                if (enabledCount === 0) {
                    alert('Enable at least one table first')
                    return
                }
                if (!(await saveTableChanges())) return
                const res = await SaveSetupStep(2)
                if (!res?.status) {
                    alert(res?.msg || 'Could not save progress')
                    return
                }
                setCurrentStep(3)
            } else if (currentStep === 3) {
                if (!(await saveStaffingChanges())) return
                const res = await SaveSetupStep(3)
                if (!res?.status) {
                    alert(res?.msg || 'Could not save progress')
                    return
                }
                navigate('/dashboard')
            }
        } finally {
            setSaving(false)
        }

    }

    const clamp = (n) => Math.min(20, Math.max(1, n))

    const handleRows = (value) => setRows(Number.isNaN(value) ? '' : clamp(value))
    const handleRowsMinus = () => setRows(clamp((Number(rows) || 1) - 1))
    const handleRowsPlus = () => setRows(clamp((Number(rows) || 0) + 1))

    const handleColumns = (value) => setColumns(Number.isNaN(value) ? '' : clamp(value))
    const handleColumnsMinus = () => setColumns(clamp((Number(columns) || 1) - 1))
    const handleColumnsPlus = () => setColumns(clamp((Number(columns) || 0) + 1))

    const gridRows = Number.isInteger(rows) ? rows : 0
    const gridColumns = Number.isInteger(columns) ? columns : 0


    const options = [
        {
            name: "Waiter",
            icon: "lucide:user"
        },
        {
            name: "Captain",
            icon: "lucide:crown"
        },
    ]
    const selectedOptions = options.find((option) => option.name === selectedRole) || options[0]

    const tips = [
        "Single-click can edit a single table.",
        "Can change table seats in edit section.",
        "Press and hold ctrl button to select multiple table.",
        "Double-click a table to quickly toggle enable/disable.",
    ]
    const setUpSteps = [
        {
            id: 1,
            name: "Grid Configuration",
            icon: "flowbite:grid-outline"
        },
        {
            id: 2,
            name: "Table Setup & Naming",
            icon: "meteor-icons:table-list"
        },
        {
            id: 3,
            name: "Staff Assignment",
            icon: "tabler:users"
        },
    ]

    const updateTable = (id, patch) =>
        setTableData((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)))

    const enabledTables = tableData.filter((t) => !t.disabled)
    const enabledCount = enabledTables.length
    const disabledCount = tableData.length - enabledCount
    const totalCapacity = enabledTables.reduce((sum, t) => sum + (t.seats || 0), 0)

    const openEditor = (table) => {
        setDraft({ name: table.name, seats: table.seats, disabled: table.disabled })
        setSelectedTabledId(table.id)
    }

    const handleTableClick = (table) => {
        clearTimeout(clickTimer.current)
        clickTimer.current = setTimeout(() => openEditor(table), 250)
    }

    const handleTableDoubleClick = (table) => {
        clearTimeout(clickTimer.current)
        updateTable(table.id, { disabled: !table.disabled })
    }

    const applyDraft = () => {
        const name = draft.name.trim()
        const seatsNum = Number(draft.seats)
        if (!name || name.length > 30) return alert('Name must be 1 to 30 characters')
        if (!Number.isInteger(seatsNum) || seatsNum < 1 || seatsNum > 20) return alert('Seats must be a whole number from 1 to 20')
        const taken = tableData.some((t) => t.id !== selectedTableId && t.name.toLowerCase() === name.toLocaleLowerCase())
        if (taken) return alert('Another table already has this name')
        updateTable(selectedTableId, { name, seats: seatsNum, disabled: draft.disabled })
        setSelectedTabledId(null)
    }

    const handleAddStaff = () => {
        const name = staffName.trim()
        if (!name || name.length > 40) return alert('Staff name must be 1 to 40 characters')
        if (staff.length >= 100) return alert('Too many staff members')
        setStaff((list) => [...list, { id: makeId(), name, role: selectedRole.toLocaleLowerCase() }])
        setStaffName('')
    }

    const handleRemoveStaff = (id) => {
        setStaff((list) => list.filter((s) => s.id !== id))
        setSections((list) => list.map((s) => (s.captainId === id ? { ...s, captainId: null } : s)))
    }

    const toggleSelectTable = (table) => {
        if (table.disabled || sectionByTable.has(table.id)) return
        setSelectedTableIds((ids) => (ids.includes(table.id) ? ids.filter((i) => i !== table.id) : [...ids, table.id]))
    }

    const handleSelectAll = () => setSelectedTableIds(allSelected ? [] : selectabledIds)

    const handleCreateSection = () => {
        const name = sectionName.trim()
        if (!name || name.length > 30) return alert('Section name must be 1 to 30 character')
        if (sections.some((s) => s.name.toLowerCase() === name.toLowerCase())) return alert('Another section already has this name')
        if (!selectedTableIds.length) return alert('Select at least one table')
        if (sections.length >= 50) return alert('Too many sections')
        setSections((list) => [...list, { id: makeId(), name, captainId: sectionCaptainId || null, tableIds: selectedTableIds }])
        setSelectedTableIds([])
        setSectionName('')
        setSectionCaptainId('')
    }

    const handleRemoveSection = (id) => setSections((list) => list.filter((s) => s.id !== id))

    const changeSectionCaptain = (id, captainId) =>
        setSections((list) => list.map((s) => (s.id === id ? { ...s, captainId: captainId || null } : s)))

    const saveStaffingChanges = async () => {
        const res = await SaveStaffing({ staff, sections })
        if (!res?.status) {
            alert(res?.msg || 'Could not save staff and sections')
            return false
        }
        applyLayout(res.layout)
        return true
    }

    const selectedTable = tableData.find((t) => t.id === selectedTableId)

    const captains = staff.filter((s) => s.role === 'captain')
    const waiters = staff.filter((s) => s.role === 'waiter')

    const sectionByTable = new Map()
    sections.forEach((s) => (s.tableIds || []).forEach((id) => sectionByTable.set(id, s)))

    const tableNameById = new Map(tableData.map((t) => [t.id, t.name]))

    const selectabledIds = tableData.filter((t) => !t.disabled && !sectionByTable.has(t.id)).map((t) => t.id)
    const allSelected = selectabledIds.length > 0 && selectabledIds.every((id) => selectedTableIds.includes(id))

    if (loading) {
        return <div className="min-h-screen w-full flex items-center justify-center text-muted-foreground">Loading your floor...</div>
    }


    return (
        <div className="min-h-screen w-full">
            <div className="h-full w-full  flex flex-row justify-start items-start ">

                <aside className="lg:sticky top-0 h-full lg:basis-1/5 z-40 hidden lg:flex flex-col bg-white/20 border-r border-white/50 shadow-[4px_0_24px_rgba(0,0,0,0.05)]">

                    <div className="h-16 flex items-center px-6 border-b border-white/40 mt-3">

                        <Logo />
                    </div>
                    <hr className='border-t border-[#E5E5E5]  mx-3' />


                    <div className="flex flex-col px-4 py-6 space-y-2">
                        {
                            setUpSteps.map((step) => {
                                const isActive = currentStep === step.id
                                const isCompleted = currentStep > step.id
                                return (
                                    <Link key={step.id} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-primary text-white" : "bg-white text-primary"} text-xs lg:text-base font-medium shadow-sm  border border-gray-200 transition-all`}>
                                        <span className={`flex h-4 w-4 lg:h-6 lg:w-6 items-center justify-center rounded-full ${isActive ? " bg-white text-primary" : isCompleted ? "bg-available text-white" : "bg-gray-200 text-primary "} text-[8px] lg:text-xs`}>{isCompleted ? <Icon className='text-white  text-xs' icon="charm:tick" /> : step.id}</span>
                                        {step.name}
                                    </Link>
                                )
                            })
                        }

                    </div>
                </aside>


                <div className="w-full lg:basis-4/5 h-fit ">
                    <div className="sticky z-40 top-0 w-full flex flex-row justify-start items-center">

                        <div className=" w-full h-[76px] border-b bg-white border-gray-200 flex flex-row justify-between items-center ">
                            <div className="flex flex-row items-center justify-start px-5 gap-2">

                                <div className="lg:hidden mr-4">
                                    <Logo />
                                </div>

                                {
                                    setUpSteps.map((step, index) => {
                                        const isActive = currentStep === step.id
                                        const isCompleted = currentStep > step.id
                                        return (
                                            <div key={index} className={`flex flex-row justify-start items-center gap-2  ${isActive ? "text-black " : isCompleted ? "text-primary" : "text-muted-foreground "}`}>

                                                {index > 0 && (
                                                    <hr className='border-b border border-muted-foreground w-5' />
                                                )
                                                }

                                                <div className="flex flex-row  justify-start items-center gap-2 ">
                                                    <Icon className='w-3 lg:w-4 h-3 lg:h-4 ' icon={step.icon} />
                                                    {/* <h5 className="text-xs lg:text-base ">{step.name}</h5> */}
                                                    <h5 className={`text-xs lg:text-base ${isActive ? 'block' : 'hidden md:block'}`}>{step.name}</h5>
                                                </div>


                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div className="hidden lg:flex flex-row justify-start items-center">

                                <div className={` ${currentStep > 1 ? "block" : "hidden"} shadow-sm bg-white hover:bg-primary hover:text-white border border-gray-200  text-black transition duration-200 ease-in-out rounded-lg  text-xs lg:text-sm font-medium px-2 lg:px-4 py-2 mr-4`}>
                                    <button onClick={() => handlePreviousStep()} className="flex flex-row w-fit"><span className="flex flex-row items-center gap-2"><Icon className='w-3 h-3 lg:w-4 lg:h-4 ' icon="line-md:arrow-left" />Previous</span></button>
                                </div>


                                <div className=" bg-primary hover:bg-opacity-85 text-white shadow-sm border border-gray-200  transition duration-200 ease-in-out rounded-lg  text-xs lg:text-sm font-medium px-2 lg:px-4 py-2 mr-4">
                                    <button onClick={() => handleNextStep()} className="flex flex-row w-fit"><span className="flex flex-row items-center gap-2">Next: {currentStep === 1 ? "Table Setup" : currentStep === 2 ? "Staff Assignment" : "Complete Setup"}<Icon className='w-3 h-3 lg:w-4 lg:h-4 ' icon="line-md:arrow-right" /></span></button>
                                </div>

                            </div>


                        </div>

                    </div>

                    <div className="w-full h-fit  bg-white bg-gradient-to-br from-primary/15   via-white to-accent/15">
                        {
                            currentStep === 1 &&
                            <div className="container w-full mx-auto flex flex-col items-start justify-start py-8 gap-3">
                                <h1 className="text-3xl text-black text-left font-bold tracking-tight">Design Your Floor Layout</h1>
                                <p className="text-muted-foreground ">Enter the number of rows and columns to create your restaurant's floor grid. You'll customize each table in the next step.</p>
                                <div className="w-full h-fit flex flex-col md:flex-row justify-start items-start gap-4 mt-3">
                                    <div className="w-full md:basis-1/2 h-fit flex flex-col  border border-gray-200 bg-white rounded-2xl shadow-sm px-5 py-8 gap-3">
                                        <h5 className="text-lg text-black font-bold ">Grid Dimensions</h5>
                                        <p className="text-muted-foreground text-sm">Set up your floor layout size</p>

                                        <div className="h-fit flex flex-col items-start justify-center gap-2 mt-4">
                                            <label className="text-black text-base flex items-center gap-2"> <Icon className='w-4 h-4 text-muted-foreground' icon="lucide:rows-3" />Number of Rows</label>

                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <button onClick={() => handleRowsMinus()} className="px-2 py-2 flex justify-center items-center shadow-sm bg-white hover:bg-primary text-black hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-lg border border-gray-300 "><label className="cursor-pointer "><Icon className='w-4 h-4 cursor-pointer ' icon="ic:round-minus" /></label></button>
                                                <input value={rows} onChange={(e) => handleRows(parseInt(e.target.value))} type='number' min='1' max='20' step="1" className="px-3 w-20 h-9 flex justify-center items-center shadow-sm bg-white  text-black  outline-4 outline-primary rounded-lg border border-gray-300 " />
                                                <button onClick={() => handleRowsPlus()} className="px-2 py-2 flex justify-center items-center shadow-sm bg-white hover:bg-primary text-black hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-lg border border-gray-300 "><label className="cursor-pointer "><Icon className='w-4 h-4 cursor-pointer ' icon="ic:round-plus" /></label></button>
                                            </div>

                                        </div>

                                        <div className="h-fit flex flex-col items-start justify-center gap-2 mt-4">
                                            <label className="text-black text-base flex items-center gap-2"> <Icon className='w-4 h-4 text-muted-foreground' icon="lucide:columns-3" />Number of Columns</label>

                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <button onClick={() => handleColumnsMinus()} className="px-2 py-2 flex justify-center items-center shadow-sm bg-white hover:bg-primary text-black hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-lg border border-gray-300 "><label className="cursor-pointer "><Icon className='w-4 h-4 cursor-pointer ' icon="ic:round-minus" /></label></button>
                                                <input value={columns} onChange={(e) => handleColumns(parseInt(e.target.value))} type='number' min='1' max='20' step="1" className="px-3 w-20 h-9 flex justify-center items-center shadow-sm bg-white  text-black  outline-4 outline-primary rounded-lg border border-gray-300 " />
                                                <button onClick={() => handleColumnsPlus()} className="px-2 py-2 flex justify-center items-center shadow-sm bg-white hover:bg-primary text-black hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-lg border border-gray-300 "><label className="cursor-pointer "><Icon className='w-4 h-4 cursor-pointer ' icon="ic:round-plus" /></label></button>
                                            </div>
                                        </div>

                                        <hr className='border-t border-gray-300 ' />
                                        <p className="text-base text-muted-foreground">Total tables: <span className="text-base text-black">{gridRows * gridColumns}</span></p>


                                    </div>
                                    <div className="w-full md:basis-1/2 h-fit flex flex-col  border border-gray-200 bg-white rounded-2xl shadow-sm px-5 py-8 gap-3">
                                        <h5 className="text-lg text-black font-bold ">Grid Dimensions</h5>
                                        <p className="text-muted-foreground text-sm">Set up your floor layout size</p>
                                        <div className="grid gap-1.5 p-3" style={{ gridTemplateColumns: `repeat(${Math.max(gridColumns, 1)}, minmax(0, 1fr))` }}>
                                            {Array.from({ length: gridRows * gridColumns }, (_, i) => (
                                                <div key={i} className="aspect-square rounded-md flex items-center justify-center text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                                    {i + 1}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                                <div className={`lg:hidden w-full flex flex-row ${currentStep === 1 ? "justify-end" : "justify-between"}  items-center`}>

                                    <div className={` ${currentStep > 1 ? "block" : "hidden"} shadow-sm bg-white hover:bg-primary hover:text-white border border-gray-200  text-black transition duration-200 ease-in-out rounded-lg  text-xs lg:text-sm font-medium px-2 lg:px-4 py-2 mr-4`}>
                                        <button onClick={() => handlePreviousStep()} className="flex flex-row w-fit"><span className="flex flex-row items-center gap-2"><Icon className='w-3 h-3 lg:w-4 lg:h-4 ' icon="line-md:arrow-left" />Previous</span></button>
                                    </div>


                                    <div className="  bg-primary hover:bg-opacity-85 text-white shadow-sm border border-gray-200  transition duration-200 ease-in-out rounded-lg  text-xs lg:text-sm font-medium px-2 lg:px-4 py-2 mr-4">
                                        <button onClick={() => handleNextStep()} className="flex flex-row w-fit"><span className="flex flex-row items-center gap-2">Next: {currentStep === 1 ? "Table Setup" : currentStep === 2 ? "Staff Assignment" : "Complete Setup"}<Icon className='w-3 h-3 lg:w-4 lg:h-4 ' icon="line-md:arrow-right" /></span></button>
                                    </div>

                                </div>
                            </div>
                        }

                        {
                            currentStep === 2 &&
                            <div className="container mx-auto flex flex-col items-start justify-start py-8 gap-3">
                                <h1 className="text-3xl text-black text-left font-bold tracking-tight">Configure Your Tables</h1>
                                <p className="text-muted-foreground ">Enable or disable tables, name them, and set their capacity. Disabled tables won't appear on your active floor.</p>
                                <div className="w-full h-fit flex flex-col md:flex-row justify-start items-start  gap-4 mt-3">
                                    <div className="w-full md:basis-2/3 h-fit flex flex-col items-start justify-start gap-4">
                                        <div className="w-full  h-fit flex flex-col shadow-md border border-gray-200 bg-white rounded-2xl px-5 py-8 gap-3">
                                            <div className="w-full flex flex-row justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <h5 className="text-lg text-black font-bold ">Floor Grid</h5>
                                                    <p className="text-muted-foreground text-sm">Click tables to select, click again to toggle</p>
                                                </div>
                                                <div className="flex flex-row justify-start items-center gap-1">
                                                    <input name="" type="checkbox" className=" cursor-pointer w-3.5 h-3.5 border border-gray-400 rounded-sm" />
                                                    <label className="text-black text-sm">Select All</label>
                                                </div>
                                            </div>

                                            <div className={`grid gap-2.5 p-3 `} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                                                {
                                                    tableData.map((table) => {


                                                        return (
                                                            <div key={table.id}
                                                                onClick={() => handleTableClick(table)}
                                                                onDoubleClick={() => handleTableDoubleClick(table)}
                                                                tabIndex='0'
                                                                className={`aspect-square rounded-xl cursor-pointer flex flex-col items-center justify-center transition duration-200
                                                            ease-in-out border-2 focus:outline-none hover:scale-105  focus:ring-2 focus:ring-primary 
                                                            ${table.disabled ? 'bg-gray-100 text-gray-400 border-gray-300 border-dashed' : 'bg-primary/15 text-primary border-primary/60'}`}>
                                                                <span className="text-xs font-bold">{table.name}</span>
                                                                <span className="text-[10px] text-black font-medium">{table.seats} Seats</span>
                                                                {table.disabled && <span className="text-[10px]">Disabled</span>}
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>

                                        </div>


                                    </div>
                                    <div className="w-full md:basis-1/3 h-fit flex flex-col gap-3">
                                        <div className="h-fit flex flex-col  border border-gray-200 bg-white rounded-2xl shadow-sm px-5 py-8 gap-5">
                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <Icon className='w-4 h-4 lg:w-5 lg:h-5 text-black' icon="clarity:details-line" />
                                                <h5 className="text-lg text-black font-bold ">Summary</h5>
                                            </div>
                                            <p className="text-muted-foreground text-sm">Set up your floor layout size</p>
                                            <div className="w-full h-fit flex flex-col justify-start items-start px-2 gap-3">

                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Enabled Tables</p>
                                                    <p className="text-black text-sm">{enabledCount}</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Disabled Tables</p>
                                                    <p className="text-black text-sm">{disabledCount}</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Total Capacity</p>
                                                    <p className="text-black text-sm">{totalCapacity} Seats</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Sections</p>
                                                    <p className="text-black text-sm">{sections.length}</p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-fit flex flex-col items-start justify-start border border-gray-200 bg-white rounded-2xl shadow-md px-5 py-8 gap-2">
                                            <p className="text-black text-sm font-semibold ">Tips:</p>
                                            {
                                                tips.map((tip) => {
                                                    return (
                                                        <div key={tip} className="w-full h-fit flex flex-row items-start justify-start px-2 gap-1.5">
                                                            <Icon className='w-3 h-3 lg:w-4 lg:h-4 text-black' icon="icon-park-outline:dot" />
                                                            <p className="text-muted-foreground text-sm font-normal">{tip}</p>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>


                                    </div>
                                </div>

                                <div className={`lg:hidden w-full flex flex-row ${currentStep === 1 ? "justify-end" : "justify-between"}  items-center`}>

                                    <div className={` ${currentStep > 1 ? "block" : "hidden"} shadow-sm bg-white hover:bg-primary hover:text-white border border-gray-200  text-black transition duration-200 ease-in-out rounded-lg  text-xs lg:text-sm font-medium px-2 lg:px-4 py-2 mr-4`}>
                                        <button onClick={() => handlePreviousStep()} className="flex flex-row w-fit"><span className="flex flex-row items-center gap-2"><Icon className='w-3 h-3 lg:w-4 lg:h-4 ' icon="line-md:arrow-left" />Previous</span></button>
                                    </div>


                                    <div className="  bg-primary hover:bg-opacity-85 text-white shadow-sm border border-gray-200  transition duration-200 ease-in-out rounded-lg  text-xs lg:text-sm font-medium px-2 lg:px-4 py-2 mr-4">
                                        <button onClick={() => handleNextStep()} className="flex flex-row w-fit"><span className="flex flex-row items-center gap-2">Next: {currentStep === 1 ? "Table Setup" : currentStep === 2 ? "Staff Assignment" : "Complete Setup"}<Icon className='w-3 h-3 lg:w-4 lg:h-4 ' icon="line-md:arrow-right" /></span></button>
                                    </div>

                                </div>

                            </div>
                        }

                        {
                            currentStep === 3 &&
                            <div className="container mx-auto flex flex-col items-start justify-start py-8 gap-3">
                                <h1 className="text-3xl text-black text-left font-bold tracking-tight">Assign Staff to Sections</h1>
                                <p className="text-muted-foreground ">Assign captains and waiters to manage specific floor sections.</p>
                                <div className="w-full h-fit flex flex-col md:flex-row justify-start items-start  gap-4 mt-3">

                                    <div className="w-full md:basis-1/3 h-fit flex flex-col gap-3">
                                        <div className="h-fit flex flex-col  border border-gray-200 bg-white rounded-2xl shadow-sm px-5 py-8 gap-2">
                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <Icon className='w-3 h-3 lg:w-4 lg:h-4 text-black' icon="tabler:users" />
                                                <h5 className="text-lg text-black font-bold ">Staff Members</h5>
                                            </div>
                                            <p className="text-muted-foreground text-sm">Set up your floor layout size</p>
                                            <div className="w-full flex flex-col justify-start items-start gap-1 mt-4">
                                                <label className="text-black text-sm">Staff Name</label>
                                                <input type="text" placeholder='Enter name...'
                                                    value={staffName}
                                                    maxLength={40}
                                                    onChange={(e) => setStaffName(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddStaff()}
                                                    className="px-3 w-full h-9 flex justify-center items-center shadow-sm bg-white  text-black rounded-lg border border-gray-200 focus:border-4  focus:border-primary/60 focus:outline-none   " />

                                            </div>
                                            <div ref={dropdownRef} className=" relative w-full flex flex-col justify-start items-start gap-1 mt-4 ">
                                                <label className="text-black text-sm">Role</label>                                            <button onClick={() => setRoleIsOpen(!roleIsOpen)} className="  flex h-9 w-fit items-center justify-between rounded-lg cursor-pointer border border-gray-200 bg-white px-3 gap-4 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors">
                                                    <span className="flex flex-row justify-start items-center gap-2">
                                                        <Icon className='w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground' icon={selectedOptions.icon} />
                                                        {selectedOptions.name}
                                                    </span>
                                                    <Icon className='w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground cursor-pointer' icon="ep:arrow-down" />
                                                </button>
                                                {
                                                    roleIsOpen && (
                                                        <div className="absolute w-fit z-30 top-16 p-1  mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-lg transition-all duration-200 ease-in-out ">
                                                            {
                                                                options.map((option) => {
                                                                    const isSelected = selectedRole === option.name
                                                                    return (
                                                                        <button key={option.name} onClick={() => { setSelectedRole(option.name); setRoleIsOpen(false) }} className={`relative flex flex-row justify-between gap-3  w-full cursor-pointer select-none items-center rounded-lg py-2 my-1 pl-3 pr-8 text-sm outline-none transition-colors hover:bg-primary bg-white hover:text-white text-black  `}>
                                                                            <span className="flex items-center gap-2">
                                                                                <Icon className={`w-3 h-3 lg:w-4 lg:h-4 `} icon={option.icon} />
                                                                                {option.name}
                                                                            </span>

                                                                            {
                                                                                isSelected && (
                                                                                    <span className="absolute right-2 ml-3 flex  items-center justify-center">
                                                                                        <Icon className={`w-3 h-3 lg:w-4 lg:h-4 `} icon="charm:tick" />
                                                                                    </span>
                                                                                )}
                                                                        </button>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                }
                                                <button onClick={handleAddStaff} className="w-full h-9 bg-primary text-white text-base hover:bg-primary/85 rounded-lg flex flex-row justify-center items-center mt-4 gap-4 px-3 py-1">
                                                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 `} icon="ic:sharp-plus" />
                                                    <span className="">Add Staff Member</span>
                                                </button>

                                                <hr className='border-b border  border-[#E5E5E5] mt-4 w-full' />

                                                <div className="w-full h-fit flex flex-col items-start justify-start mt-4">

                                                    <div className="w-full flex flex-col justify-start items-start gap-3">
                                                        <p className="text-muted-foreground text-sm">Captains</p>
                                                        {captains.length === 0 && <p className='text-muted-foreground text-xs'>No captains yet</p>}
                                                        {captains.map((c) => {
                                                            const mySections = sections.filter((s) => s.captainId === c.id)
                                                            const isOpen = expandedCaptainId === c.id
                                                            return (
                                                                <div key={c.id} className="w-full h-fit flex flex-col items-start justify-start gap-1">
                                                                    <div onClick={() => setExpandedCaptainId(isOpen ? null : c.id)} className="w-full h-fit flex flex-row justify-between items-center bg-[#F5F5F5] cursor-pointer rounded-lg py-2 gap-2 px-4">
                                                                        <div className="w-full h-fit flex flex-row justify-start items-center gap-2">
                                                                            <Icon className='w-3 h-3 lg:w-4 lg:h-4 text-captain' icon="lucide:crown" />
                                                                            <p className="text-black text-sm">{c.name}</p>
                                                                        </div>
                                                                        <div className="flex flex-row items-center gap-2">
                                                                            <Icon onClick={(e) => { e.stopPropagation(); handleRemoveStaff(c.id) }} className="w-4 h-4 text-muted-foreground cursor-pointer" icon="charm:cross" />
                                                                            <Icon className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground" icon="ep:arrow-down" />
                                                                        </div>
                                                                    </div>

                                                                    {
                                                                        isOpen && (
                                                                            <div className="w-full h-fit flex flex-row justify-start items-center bg-[#F5F5F5] rounded-lg py-2 px-4 gap-1">
                                                                                <p className="text-muted-foreground text-sm">Sections: </p>
                                                                                <span className="text-black text-sm">{mySections.length ? mySections.map((s) => s.name).join(', ') : 'None'}</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        })}

                                                        <p className="text-muted-foreground text-sm mt-2">Waiters</p>
                                                        {waiters.length === 0 && <p className='text-muted-foreground text-xs '>No waiters yet</p>}
                                                        {
                                                            waiters.map((w) => (
                                                                <div key={w.id} className="w-full h-fit flex flex-row justify-between items-center bg-[#F5F5F5] rounded-lg py-2 px-4">
                                                                    <div className="flex flex-row items-center gap-2">
                                                                        <Icon className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground" icon="lucide:user" />
                                                                        <p className="text-black text-sm">{w.name}</p>
                                                                    </div>
                                                                    <Icon onClick={() => handleRemoveStaff(w.id)} className="w-4 h-4 text-muted-foreground cursor-pointer" icon="charm:cross" />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="h-fit flex flex-col  border border-gray-200 bg-white rounded-2xl shadow-sm px-5 py-8 gap-5">
                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <Icon className='w-4 h-4 lg:w-5 lg:h-5 text-black' icon="clarity:details-line" />
                                                <h5 className="text-lg text-black font-bold ">Summary</h5>
                                            </div>
                                            <p className="text-muted-foreground text-sm">Set up your floor layout size</p>
                                            <div className="w-full h-fit flex flex-col justify-start items-start px-2 gap-3">

                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Enabled Tables</p>
                                                    <p className="text-black text-sm">{enabledCount}</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Disabled Tables</p>
                                                    <p className="text-black text-sm">{disabledCount}</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Total Capacity</p>
                                                    <p className="text-black text-sm">{totalCapacity} Seats</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Sections</p>
                                                    <p className="text-black text-sm">{sections.length}</p>

                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="w-full md:basis-2/3 h-fit flex flex-col items-start justify-start gap-4">
                                        <div className="w-full  h-fit flex flex-col shadow-md border border-gray-200 bg-white rounded-2xl px-5 py-8 gap-3">
                                            <div className="w-full flex flex-row justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <h5 className="text-lg text-black font-bold ">Create Sections</h5>
                                                    <p className="text-muted-foreground text-sm">Click tables to select, and assign the table to each members</p>
                                                </div>
                                                <div className="flex flex-row justify-start items-center gap-1">
                                                    <input name="" type="checkbox" checked={allSelected} onChange={handleSelectAll} className=" cursor-pointer w-3.5 h-3.5 border border-gray-400 rounded-sm" />
                                                    <label className="text-black text-sm">Select All</label>
                                                </div>
                                            </div>

                                            <div className={`grid gap-2.5 p-3 `} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                                                {
                                                    tableData.map((table) => {
                                                        const section = sectionByTable.get(table.id)
                                                        const isSelected = selectedTableIds.includes(table.id)

                                                        return (
                                                            <div
                                                                key={table.id}
                                                                onClick={() => toggleSelectTable(table)}
                                                                className={`aspect-square rounded-xl flex flex-col items-center justify-center transition duration-200 ease-in-out border-2 ${table.disabled
                                                                        ? 'bg-gray-100 text-gray-400 border-gray-300 border-dashed cursor-not-allowed'
                                                                        : section
                                                                            ? 'bg-amber-100 text-amber-800 border-amber-400 cursor-not-allowed'
                                                                            : isSelected
                                                                                ? 'bg-primary text-white border-primary cursor-pointer'
                                                                                : 'bg-primary/15 text-primary border-primary/60 cursor-pointer hover:scale-105'
                                                                    }`}>

                                                                <span className="text-xs font-bold">{table.name}</span>
                                                                <span className="text-[10px] font-medium">{table.seats} Seats</span>
                                                                {section && <span className='text-[10px]'>{section.name}</span>}
                                                                {table.disabled && <span className='text-[10px]'>Disabled</span>}

                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>

                                            <div className="w-full flex flex-col md:flex-row md:items-end gap-3 px-3">
                                                <div className="flex flex-col gap-1 w-full md:basis-1/3">
                                                    <label className="text-black text-sm">Section name</label>
                                                    <input
                                                        value={sectionName}
                                                        maxLength={30}
                                                        placeholder='e.g. Family'
                                                        onChange={(e) => setSectionName(e.target.value)}
                                                        className="px-3 w-full h-9 shadow-sm bg-white text-black rounded-lg border border-gray-200 focus:border-primary/60 focus:outline-none" />
                                                </div>

                                                <div className="flex flex-col gap-1 w-full md:basis-1/3">
                                                    <label className="text-black text-sm">Captain (optional)</label>
                                                    <select
                                                        value={sectionCaptainId}
                                                        onChange={(e) => setSectionCaptainId(e.target.value)}
                                                        className="px-2 s-full h-9 shadow-sm bg-white text-black rounded-lg border border-gray-200 focus:outline-none focus:border-primary/60">
                                                        <option value="">No captain</option>
                                                        {captains.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                    </select>
                                                </div>

                                                <button onClick={handleCreateSection} className="w-full md:basis-1/3 h-9 bg-primary text-white test-sm rounded-lg hover:bg-primary/85">
                                                    Create section ({selectedTableIds.length} selected)
                                                </button>

                                                {
                                                    sections.length > 0 && (
                                                        <div className="w-full flex flex-col gap-2 px-3">
                                                            <p className="text-muted-foreground text-sm">Sections</p>
                                                            {
                                                                sections.map((s) => (
                                                                    <div key={s.id} className="w-full flex flex-row flex-wrap items-center justify-between gap-2 bg-[#F5F5F5] rounded-lg py-2 px-4">
                                                                        <div className="flex flex-col">
                                                                            <p className="text-black text-sm font-semibold">{s.name}</p>
                                                                            <p className="text-muted foreground text-xs">{s.tableIds.map((id) => tableNameById.get(id) || id).join(', ')}</p>
                                                                        </div>

                                                                        <div className="flex flex-row items-center gap-2">
                                                                            <select
                                                                                value={s.captainId || ''}
                                                                                onChange={(e) => changeSectionCaptain(s.id, e.target.value)}
                                                                                className="px-2 h-8 bg-white text-black text-sm rounded-lg border border-gray-200 focus:outline-none">
                                                                                <option value="">No captain</option>
                                                                                {captains.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                                            </select>
                                                                            <Icon onClick={() => handleRemoveSection(s.id)} className='w-5 h-5 cursor-pointer text-muted-foreground ' icon="charm:cross" />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </div>


                                    </div>
                                </div>

                                <div className={`lg:hidden w-full flex flex-row ${currentStep === 1 ? "justify-end" : "justify-between"}  items-center`}>

                                    <div className={` ${currentStep > 1 ? "block" : "hidden"} shadow-sm bg-white hover:bg-primary hover:text-white border border-gray-200  text-black transition duration-200 ease-in-out rounded-lg  text-xs lg:text-sm font-medium px-2 lg:px-4 py-2 mr-4`}>
                                        <button onClick={() => handlePreviousStep()} className="flex flex-row w-fit"><span className="flex flex-row items-center gap-2"><Icon className='w-3 h-3 lg:w-4 lg:h-4 ' icon="line-md:arrow-left" />Previous</span></button>
                                    </div>


                                    <div className="  bg-primary hover:bg-opacity-85 text-white shadow-sm border border-gray-200  transition duration-200 ease-in-out rounded-lg  text-xs lg:text-sm font-medium px-2 lg:px-4 py-2 mr-4">
                                        <button onClick={() => handleNextStep()} className="flex flex-row w-fit"><span className="flex flex-row items-center gap-2">Next: {currentStep === 1 ? "Table Setup" : currentStep === 2 ? "Staff Assignment" : "Complete Setup"}<Icon className='w-3 h-3 lg:w-4 lg:h-4 ' icon="line-md:arrow-right" /></span></button>
                                    </div>

                                </div>

                            </div>
                        }


                    </div>
                </div>

            </div>


            {
                selectedTable && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="w-96 h-fit bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 gap-4 flex flex-col">
                            <div className="w-full h-fit flex justify-between items-center">
                                <h5 className="text-lg text-black font-bold">Edit table</h5>
                                <Icon onClick={() => setSelectedTabledId(null)} className="w-6 h-6 cursor-pointer" icon="charm:cross" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-black text-sm">Name</label>
                                <input
                                    value={draft.name}
                                    maxLength={30}
                                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                                    className="px-3 w-full h-9 shadow-sm bg-white text-black rounded-lg border border-gray-200 focus:border-primary/60 focus:outline-none" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-black text-sm">seats</label>
                                <input
                                    type='number' min="1" max="20"
                                    value={draft.seats}
                                    onChange={(e) => setDraft({ ...draft, seats: e.target.value })}
                                    className="px-3 w-full h-9 shadow-sm bg-white text-black rounded-lg border border-gray-200 focus:border-primary/60 focus:outline-none" />
                            </div>

                            <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={!draft.disabled}
                                    onChange={(e) => setDraft({ ...draft, disabled: !e.target.checked })}
                                />
                                Table enabled
                            </label>

                            <button onClick={applyDraft} className="w-full h-9 bg-primary text-white rounded-lg hover:bg-primary/85">
                                Apply
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Setup

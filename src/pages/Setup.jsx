import React, { useEffect, useRef, useState } from 'react'
import Logo from '../Components/Logo';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';

const Setup = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [rows, setRows] = useState(4)
    const [columns, setColumns] = useState(4)
    const [tableData, setTableData] = useState([])
    const [roleIsOpen, setRoleIsOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState("Captain");
    const [assignedTable, setAssignedTable] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false)
    const dropdownRef = useRef(null);
    useEffect(() => {
        createInitialTables(rows, columns)
        // console.log(tables,"the table data")
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setRoleIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [rows, columns, selectedRole])


    const handlePopupEdit = () => {
        setPopupOpen(true)
        console.log("state worked")
    }

    const handleAssignedTableDisplay = () => {
        setAssignedTable(!assignedTable)
    }



    const createInitialTables = (rows, columns) => {
        const tables = []
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                tables.push({
                    id: `${row}-${column}`,
                    name: `Table${row * columns + column + 1}`,
                    row,
                    column,
                })
            }
        }
        setTableData(tables)
        console.log(tables, "the table data")
        return tables;
    }

    // console.log(tableData,"the table")
    const handlePreviousStep = () => {
        if (currentStep > 1 || currentStep <= 3) {
            setCurrentStep(currentStep - 1)
        } else {
            setCurrentStep(1)
            console.log("Error on Current step state")
        }
    }
    const handleNextStep = () => {
        if (!currentStep < 1 || !currentStep > 3) {
            setCurrentStep(currentStep + 1)
        } else {
            setCurrentStep(1)
            console.log("Error on Current step state")

        }
    }



    const handleRows = (value) => {
        setRows(value)
    }
    const handleRowsMinus = () => {

        setRows(rows - 1)

    }
    const handleRowsPlus = () => {
        setRows(rows + 1)


    }

    const handleColumns = (value) => {
        setColumns(value)
    }
    const handleColumnsMinus = () => {
        setColumns(columns - 1)
    }
    const handleColumnsPlus = () => {
        setColumns(columns + 1)
    }


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
    return (
        <div className="min-h-screen w-full">
            <div className="h-full w-full  flex flex-row justify-start items-start ">

                <aside className="md:sticky top-0 h-full md:basis-1/5 z-40 hidden md:flex flex-col bg-white/20 border-r border-white/50 shadow-[4px_0_24px_rgba(0,0,0,0.05)]">

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
                                    <Link href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-primary text-white" : "bg-white text-primary"} text-xs lg:text-base font-medium shadow-sm  border border-gray-200 transition-all`}>
                                        <span className={`flex h-4 w-4 lg:h-6 lg:w-6 items-center justify-center rounded-full ${isActive ? " bg-white text-primary" : isCompleted ? "bg-available text-white" : "bg-gray-200 text-primary "} text-[8px] lg:text-xs`}>{isCompleted ? <Icon className='text-white  text-xs' icon="charm:tick" /> : step.id}</span>
                                        {step.name}
                                    </Link>
                                )
                            })
                        }

                    </div>
                </aside>


                <div className="w-full md:basis-4/5 h-fit ">
                    <div className="sticky z-40 top-0 w-full flex flex-row justify-start items-center">

                        <div className=" w-full h-[76px] border-b bg-white border-gray-200 flex flex-row justify-between items-center ">
                            <div className="flex flex-row items-center justify-start px-5 gap-2">

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
                                                    <h5 className="text-xs lg:text-base ">{step.name}</h5>
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
                                                <input value={rows} onChange={(e) => handleRows(parseInt(e.target.value))} onkeypress="return event.charCode >= 48" type='number' min='0' max='20' step="1" oninput="validity.valid||(value='');" className="px-3 w-20 h-9 flex justify-center items-center shadow-sm bg-white  text-black  outline-4 outline-primary rounded-lg border border-gray-300 " />
                                                <button onClick={() => handleRowsPlus()} className="px-2 py-2 flex justify-center items-center shadow-sm bg-white hover:bg-primary text-black hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-lg border border-gray-300 "><label className="cursor-pointer "><Icon className='w-4 h-4 cursor-pointer ' icon="ic:round-plus" /></label></button>
                                            </div>

                                        </div>

                                        <div className="h-fit flex flex-col items-start justify-center gap-2 mt-4">
                                            <label className="text-black text-base flex items-center gap-2"> <Icon className='w-4 h-4 text-muted-foreground' icon="lucide:columns-3" />Number of Columns</label>

                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <button onClick={() => handleColumnsMinus()} className="px-2 py-2 flex justify-center items-center shadow-sm bg-white hover:bg-primary text-black hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-lg border border-gray-300 "><label className="cursor-pointer "><Icon className='w-4 h-4 cursor-pointer ' icon="ic:round-minus" /></label></button>
                                                <input value={columns} onChange={(e) => handleColumns(parseInt(e.target.value))} onkeypress="return event.charCode >= 48" type='number' min='0' max='20' step="1" oninput="validity.valid||(value='');" className="px-3 w-20 h-9 flex justify-center items-center shadow-sm bg-white  text-black  outline-4 outline-primary rounded-lg border border-gray-300 " />
                                                <button onClick={() => handleColumnsPlus()} className="px-2 py-2 flex justify-center items-center shadow-sm bg-white hover:bg-primary text-black hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-lg border border-gray-300 "><label className="cursor-pointer "><Icon className='w-4 h-4 cursor-pointer ' icon="ic:round-plus" /></label></button>
                                            </div>
                                        </div>

                                        <hr className='border-t border-gray-300 ' />
                                        <p className="text-base text-muted-foreground">Total tables: <span className="text-base text-black">{rows * columns}</span></p>


                                    </div>
                                    <div className="w-full md:basis-1/2 h-fit flex flex-col  border border-gray-200 bg-white rounded-2xl shadow-sm px-5 py-8 gap-3">
                                        <h5 className="text-lg text-black font-bold ">Grid Dimensions</h5>
                                        <p className="text-muted-foreground text-sm">Set up your floor layout size</p>
                                        <div className={`grid gap-1.5 p-3 `} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                                            {
                                                tableData.map((table, index) => {


                                                    return (
                                                        <div key={index} className="aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors bg-primary/10 text-primary border border-primary/20">
                                                            {/* {table.row * columns + table.column + 1} */}
                                                            {index + 1}
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
                                                    tableData.map((table, index) => {


                                                        return (
                                                            <div key={`${table.row}-${table.column}`} onDoubleClick={''} onClick={() => handlePopupEdit(table.id)} tabIndex='0' 
                                                            className="aspect-square rounded-xl cursor-pointer flex flex-col items-center justify-center transition duration-200
                                                            ease-in-out bg-primary/15 text-primary border-2 focus:border-4  border-primary/60 focus:outline-none hover:scale-105  focus:ring-2 focus:ring-primary ">
                                                                {/* {console.log(`${table.row}-${table.column},num`)} */}
                                                                {/* {table.row * columns + table.column + 1} */}
                                                                <span className="text-xs font-bold">Table {index + 1}</span>
                                                                <span className="text-[10px] text-black font-medium">4 Seats</span>
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
                                                    <p className="text-black text-sm">16</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Disabled Tables</p>
                                                    <p className="text-black text-sm">0</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Total Capacity</p>
                                                    <p className="text-black text-sm">64 Seats</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Sections</p>
                                                    <p className="text-black text-sm">0</p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-fit flex flex-col items-start justify-start border border-gray-200 bg-white rounded-2xl shadow-md px-5 py-8 gap-2">
                                            <p className="text-black text-sm font-semibold ">Tips:</p>
                                            {
                                                tips.map((tip) => {
                                                    return (
                                                        <div className="w-full h-fit flex flex-row items-start justify-start px-2 gap-1.5">
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
                                                <input type="text" placeholder='Enter name...' className="px-3 w-full h-9 flex justify-center items-center shadow-sm bg-white  text-black rounded-lg border border-gray-200 focus:border-4  focus:border-primary/60 focus:outline-none   " />

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
                                                <button className="w-full h-9 bg-primary text-white text-base hover:bg-primary/85 rounded-lg flex flex-row justify-center items-center mt-4 gap-4 px-3 py-1">
                                                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 `} icon="ic:sharp-plus" />
                                                    <span className="">Add Staff Member</span>
                                                </button>

                                                <hr className='border-b border  border-[#E5E5E5] mt-4 w-full' />

                                                <div className="w-full h-fit flex flex-col items-start justify-start mt-4">
                                                    <div className="w-full flex flex-col justify-start items-start gap-3 ">
                                                        <p className="text-muted-foreground text-sm ">Captains</p>
                                                        <div className="w-full h-fit flex flex-col items-start justify-start gap-1">
                                                            <div onClick={() => handleAssignedTableDisplay()} className="w-full h-fit flex flex-row justify-between items-center bg-[#F5F5F5] cursor-pointer rounded-lg py-2 gap-2 px-4">
                                                                <div className="w-full h-fit flex flex-row justify-start items-center gap-2 ">
                                                                    <Icon className={`w-3 h-3 lg:w-4 lg:h-4 text-captain`} icon="lucide:crown" />
                                                                    <p className="text-black text-sm ">Anshif</p>
                                                                </div>
                                                                <Icon className='w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground cursor-pointer' icon="ep:arrow-down" />
                                                            </div>

                                                            {
                                                                assignedTable && (
                                                                    <div className="w-full h-fit flex flex-row justify-start items-center bg-[#F5F5F5] rounded-lg py-2  px-4">
                                                                        <p className="text-muted-foreground text-sm">Tables: </p>
                                                                        <span className="text-black text-sm ">T1,T2,T3</span>

                                                                    </div>
                                                                )
                                                            }

                                                        </div>
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
                                                    <p className="text-black text-sm">16</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Disabled Tables</p>
                                                    <p className="text-black text-sm">0</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Total Capacity</p>
                                                    <p className="text-black text-sm">64 Seats</p>

                                                </div>
                                                <div className="flex flex-row w-full h-fit justify-between items-center">
                                                    <p className="text-muted-foreground text-sm">Sections</p>
                                                    <p className="text-black text-sm">0</p>

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
                                                    <input name="" type="checkbox" className=" cursor-pointer w-3.5 h-3.5 border border-gray-400 rounded-sm" />
                                                    <label className="text-black text-sm">Select All</label>
                                                </div>
                                            </div>

                                            <div className={`grid gap-2.5 p-3 `} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                                                {
                                                    tableData.map((table, index) => {


                                                        return (
                                                            <div key={index} tabIndex='0' className="aspect-square rounded-xl cursor-pointer flex flex-col items-center justify-center transition duration-200 ease-in-out bg-primary/15 text-primary border-2 focus:border-4  border-primary/60 focus:outline-none hover:scale-105  focus:ring-2 focus:ring-primary ">
                                                                {/* {table.row * columns + table.column + 1} */}
                                                                <span className="text-xs font-bold">Table {index + 1}</span>
                                                                <span className="text-[10px] text-black font-medium">4 Seats</span>
                                                            </div>
                                                        )
                                                    })
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
                popupOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ">
                        <div className="w-96 h-fit bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 gap-5">
                            <div className="w-full h-fit flex justify-end items-center">
                            <Icon onClick={() => setPopupOpen(!popupOpen)} className='w-5 h-5 lg:w-8 lg:h-8 cursor-pointer ' icon="charm:cross" />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Setup

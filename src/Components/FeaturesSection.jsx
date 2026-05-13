import { Icon } from '@iconify/react'
import React from 'react'

const FeaturesSection = () => {
    const features = [
  {
    icon : "cuida:grid-outline",
    heading : "Create Your Perfect Floor Layout",
    text : "Design your restaurant floor like a sudoku grid. Input any number of rows and columns, and instantly create your floor layout with visual grid lines. Customize to match your exact restaurant dimensions."
  },
  {
    icon : "meteor-icons:table-list",
    heading : "Smart Table Configuration",
    text : "Enable or disable individual tables with one click. Bulk select multiple tables for mass operations. Name each table uniquely and adjust capacity dynamically."
  },
  {
    icon : "tabler:users",
    heading : "Section-Based Staff Assignment",
    text : "Assign captains and waiters to specific floor sections. Manage staff coverage across your entire restaurant. Track which staff member is responsible for each area in real-time."
  },
  {
    icon : "ic:baseline-link",
    heading : "Dynamic Seat Joining",
    text : "When a large party arrives, instantly join multiple tables together with drag-and-drop. Merge tables to create larger seating arrangements. Add or remove extra seats on the fly."
  },
  {
    icon : "tabler:clock",
    heading : "Intelligent Reservation Queue",
    text : "No time-based reservations here. Queue upcoming customers when tables are occupied. Maintain up to 3 reservation slots per table. Perfect for walk-in heavy restaurants."
  },
  {
    icon : "lucide:file-text",
    heading : "Export Floor Plans to PDF",
    text : "Export your entire floor layout design to PDF format. Perfect for printing, documentation, staff training, or keeping offline records. Update anytime and re-export."
  },
 ] 
    return (
        <div id='features' className="flex flex-col w-full h-fit py-10">
            <div className="flex flex-col w-full h-fit items-center justify-center px-4 md:px-6 py-3 ">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-center">Everything You Need to Manage Your Floor</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center">Powerful features designed specifically for restaurant floor management, built to make your daily operations smoother and more efficient.</p>
            </div>
            <div className="w-full container mx-auto h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                {
                    features.map((item , index) => {

                        return (
                            <div key={index} className="flex flex-col items-start justify-center bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 gap-6 hover:translate-y-[-10px] transition duration-200 ease-in-out hover:shadow-xl">
                                <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-2xl ">
                                    <Icon icon={item.icon} className='w-8 h-8 text-primary ' />
                                </div>
                                <h4 className="text-lg font-semibold ">{item.heading}</h4>
                                <p className="text-sm text-muted-foreground">{item.text}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FeaturesSection

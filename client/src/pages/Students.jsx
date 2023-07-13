import React from 'react'

import SectionHeading from '../components/SectionHeading.component'
import StudentTable from '../components/StudentTable.component'

export default function Students() {
  return (
    <>
    <SectionHeading title="Students" buttonTitle="Student" link="/add-student"/>
    <StudentTable />
    </>
  )
}

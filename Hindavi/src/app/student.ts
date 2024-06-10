import { ApprovalStatus } from "./approvalStatus"
import { CoreCourse } from "./course"
import { Elective } from "./elective"


export interface Student{
    rollNo: string
    name: string
    program: string
    atRisk: boolean
    riskDecs: string
    coreCourses: CoreCourse[]
    electiveCredits: Elective[]
    approvalStatus: ApprovalStatus
    approvalRemarks: string
}

export interface CoreCourse {
    code: string
    name: string
    credits: number
    slot: string
}

export interface ElectiveRange {
    code: string
    min: number
    max: number
}

export enum ApprovalStatus {
    PENDING,
    APPROVED,
    REJECTED
}

export interface StudentInfo {
    rollNo: string
    name: string
    program: string
    atRisk: boolean
    riskDesc: string
    coreCourses: CoreCourse[]
    electiveCredits: ElectiveRange[]
    approvalStatus: ApprovalStatus
    approvalRemarks: string
}

export interface StudentInfoGetRequest {
    info: StudentInfo[]
}


//Data to server
export interface ApprovalRequest {
    rollNo: string
    isApproved: boolean
    remarks: string
}
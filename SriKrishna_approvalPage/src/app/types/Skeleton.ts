//Input

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

export interface PastCourse{
    code: string
    name: string
    creditsAcquired: number
    totalCredits: number
}

export interface StudentInfo {
    rollNo: string
    name: string
    program: string
    atRisk: boolean
    riskDecs: string
    coreCourses: CoreCourse[]
    electiveCredits: ElectiveRange[]
    pastCourses: PastCourse[]
    CGPA: number
    approvalStatus: ApprovalStatus
    approvalRemarks: string
}

//Data from server
export interface StudentInfoGetRequest {
    infos: StudentInfo[]
}


//Data to server
export interface ApprovalRequest {
    rollNo: string
    isApproved: boolean
    remarks: string
}



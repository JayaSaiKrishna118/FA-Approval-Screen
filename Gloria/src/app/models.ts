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
    PENDING="PENDING",
    APPROVED="APPROVED",
    REJECTED="REJECTED"
}

export interface StudentInfo {
    rollNo: string
    name: string
    program: string
    atRisk: boolean
    riskDecs: string
    coreCourses: CoreCourse[]
    electiveCredits: ElectiveRange[]
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


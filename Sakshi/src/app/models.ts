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
    PENDING=2,
    APPROVED=1,
    REJECTED=0
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
  
  export interface StudentInfoGetRequest {
    rollNo: any
    infos: StudentInfo[]
  }


//Data to server
export interface ApprovalRequest {
    rollNo: string
    isApproved: boolean
    remarks: string
}

export const STUDENT = {
    infos:[
        {
            rollNo: "22MA30017",
            name: "Sohan",
            program: "Master's in CS",
            atRisk: false,
            riskDecs: "Not at Risk",
            coreCourses: [
              { code: "24CS121", name: "Computer Science", credits: 4, slot: "morning" },
              { code: "24CS122", name: "Information Technology", credits: 4, slot: "evening" },
              { code: "24CS123", name: "Data Science", credits: 3, slot: "night" },
              { code: "24CS124", name: "Data Analytics", credits: 3, slot: "afternoon" }
            ],
            electiveCredits: [
              { code: "24EC201", min: 0, max: 3 },
              { code: "24EC202", min: 0, max: 4 },
              { code: "24EC203", min: 0, max: 5 }
            ],
            approvalStatus: 1,
            approvalRemarks: "good going"
          },
          {
            rollNo: "22MA30018",
            name: "Mona",
            program: "Master's in Electronics",
            atRisk: false,
            riskDecs: "Not at Risk",
            coreCourses: [
              { code: "24EE201", name: "Data Science", credits: 3, slot: "morning" },
              { code: "24EE202", name: "Mechanical", credits: 3, slot: "evening" },
              { code: "24EE203", name: "Civil", credits: 3, slot: "night" },
              { code: "24EE204", name: "Electronics and Communication", credits: 4, slot: "afternoon" }
            ],    
            electiveCredits: [
              { code: "24EC201", min: 0, max: 3 },
              { code: "24EC202", min: 0, max: 4 },
              { code: "24EC203", min: 0, max: 5 }
            ],
            approvalStatus: 1,
            approvalRemarks: "good going"
          },
          {
            rollNo: "22MA30019",
            name: "Mohan",
            program: "Bachleor's in CS",
            atRisk: true,
            riskDecs: "At Risk",
            coreCourses: [
              { code: "24CE201", name: "Product Management", credits: 4, slot: "morning" },
              { code: "24CE202", name: "Mathematics", credits: 3, slot: "evening" },
              { code: "24CE203", name: "Computer Aided Drawings", credits: 4, slot: "night" },
              { code: "24CE204", name: "Mechanial", credits: 2, slot: "afternoon" }
            ],
            electiveCredits: [
              { code: "24CE201", min: 0, max: 3 },
              { code: "24CE202", min: 0, max: 4 },
              { code: "24CE203", min: 0, max: 5 }
            ],
            approvalStatus: 0,
            approvalRemarks: "Not Good Going"
          },
          {
            rollNo: "22MA30020",
            name: "Anaya",
            program: "Master's in Data Analytics",
            atRisk: true,
            riskDecs: "At Risk",
            coreCourses: [
              { code: "24CE201", name: "Product Management", credits: 4, slot: "morning" },
              { code: "24CE202", name: "Mathematics", credits: 3, slot: "evening" },
              { code: "24CE203", name: "Computer Aided Drawings", credits: 4, slot: "night" },
              { code: "24CE204", name: "Mechanial", credits: 2, slot: "afternoon" }
            ],
            electiveCredits: [
              { code: "24CE201", min: 0, max: 3 },
              { code: "24CE202", min: 0, max: 4 },
              { code: "24CE203", min: 0, max: 5 }
            ],
            approvalStatus: 0,
            approvalRemarks: "Need more efforts"
          },
          {
            rollNo: "22MA30021",
            name: "Shanaya",
            program: "Bachelor's in IT",
            atRisk: false,
            riskDecs: "Not at Risk",
            coreCourses: [
              { code: "24CE201", name: "Product Management", credits: 4, slot: "morning" },
              { code: "24CE202", name: "Mathematics", credits: 3, slot: "evening" },
              { code: "24CE203", name: "Computer Aided Drawings", credits: 4, slot: "night" },
              { code: "24CE204", name: "Mechanial", credits: 2, slot: "afternoon" }
            ],
            electiveCredits: [
              { code: "24CE201", min: 0, max: 3 },
              { code: "24CE202", min: 0, max: 4 },
              { code: "24CE203", min: 0, max: 5 }
            ],
            approvalStatus: 1,
            approvalRemarks: "Very Good going"
          }
        
        ]    
}

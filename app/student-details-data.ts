import { ApprovalStatus } from "./models";

export const STUDENTS_DATA = {
        infos: [
            {
                rollNo: '123456',
                name: 'Gloria',
                program: 'Computer Science',
                atRisk: false,
                pending: false,
                riskDecs: '',
                coreCourses: [
                    {
                        code: 'CS101',
                        name: 'Introduction to Computer Science',
                        credits: 3,
                        slot: 'A1'
                    }
                ],
                electiveCredits: [
                    {
                        code: 'EL101',
                        min: 3,
                        max: 6
                    }
                ],
                approvalStatus: ApprovalStatus.APPROVED,
                approvalRemarks: 'Approved for next semester'
            },
            {
                rollNo: '789012',
                name: 'Femina',
                program: 'Electrical Engineering',
                atRisk: true,
                pending: false,
                riskDecs: 'Low GPA',
                coreCourses: [
                    {
                        code: 'EE101',
                        name: 'Introduction to Electrical Engineering',
                        credits: 4,
                        slot: 'B1'
                    }
                ],
                electiveCredits: [
                    {
                        code: 'EL102',
                        min: 2,
                        max: 4
                    }
                ],
                
                approvalStatus: ApprovalStatus.REJECTED,
                approvalRemarks: 'Not Approved'
            },
//             // Add more students here...
{
    rollNo: '567832',
    name: 'Febin',
    program: 'Data Science',
    atRisk: true,
    pending: true,
    riskDecs: 'Low Attendance',
    coreCourses: [
        {
            code: 'EE101',
            name: 'Introduction to Data Science',
            credits: 4,
            slot: 'B1'
        }
    ],
    electiveCredits: [
        {
            code: 'DS107',
            min: 2,
            max: 4
        }
    ],
    
    approvalStatus: ApprovalStatus.PENDING,
    approvalRemarks: 'Not Approved'
},
            {
                rollNo: '453982',
                name: 'John',
                program: 'Electrical Engineering',
                atRisk: true,
                pending: true,
                riskDecs: 'Low attendance',
                coreCourses: [
                    {
                        code: 'EE101',
                        name: 'Introduction to Electrical Engineering',
                        credits: 3,
                        slot: 'B1'
                    },
               
                    {
                        code: 'EE102',
                        name: 'Circuit Analysis',
                        credits: 4,
                        slot: 'C1'
                    }
                ],
                electiveCredits: [
                    {
                        code: 'EL102',
                        // name: 'Introduction to Philosophy',
                        min: 2,
                        max: 4
                    }
                ],
                
                approvalStatus: ApprovalStatus.PENDING,
                approvalRemarks: ''
            },
            {
                rollNo: '345678',
                name: 'Emma',
                program: 'Mechanical Engineering',
                atRisk: false,
                pending : false,
                riskDecs: '',
                coreCourses: [
                    {
                        code: 'ME101',
                        name: 'Introduction to Mechanical Engineering',
                        credits: 3,
                        slot: 'E1'
                    }
                ],
                electiveCredits: [
                    {
                        code: 'EL103',
                        // name: 'Introduction to Psychology',
                        min:3,
                        max: 6
                    }
                ],
                approvalStatus: ApprovalStatus.APPROVED,
                approvalRemarks: ''
            }

        ]
}
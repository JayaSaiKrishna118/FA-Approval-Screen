import { ApprovalStatus } from "./datatype"
import { StudentInfo } from "./datatype"

export const Studentinfo : StudentInfo[] = [
        {
            "rollNo" : "11AA01010",
            "name" : "Thomson",
            "program" : "BTECH",
            "atRisk" : true,
            "riskDecs" : "Deviation from Current Plan",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "Differential Equations",
                    "credits" : 3,
                    "slot" : "B"
                },
                {
                    "code" : "CS3050",
                    "name" : "Computer Architecture",
                    "credits" : 5,
                    "slot" : "A"
                },
                {
                    "code" : "CS2030",
                    "name" : "Systems Programming",
                    "credits" : 5,
                    "slot" : "M"
                }
            ],
            "electiveCredits" : [
                {
                    "code" : "PME",
                    "min" : 2,
                    "max" : 4
                },
                {
                    "code" : "HSE",
                    "min" : 0,
                    "max" : 2
                },
                {
                    "code" : "OELP",
                    "min" : 3,
                    "max" : 3
                }
            ],
            "pastCourses": [
                {
                    "code" : "CS2011",
                    "name" : "Introduction to Programming",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
                {
                    "code" : "CS3030",
                    "name" : "Foundations of Computing Systems",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
            ],
            "CGPA" : 7.8,
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "No remarks"
        },
        {
            "rollNo" : "12AB01022",
            "name" : "Alison Bonney",
            "program" : "MTECH",
            "atRisk" : false,
            "riskDecs" : "No risks",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "Graphs",
                    "credits" : 5,
                    "slot" : "C"
                },
                {
                    "code" : "CS3050",
                    "name" : "Advanced Computer Architecture",
                    "credits" : 6,
                    "slot" : "D"
                }
            ],
            "electiveCredits" : [
                {
                    "code" : "PME",
                    "min" : 0,
                    "max" : 2
                },
                {
                    "code" : "HSE",
                    "min" : 0,
                    "max" : 0
                },
                {
                    "code" : "OELP",
                    "min" : 1,
                    "max" : 3
                }
            ],
            "pastCourses": [
                {
                    "code" : "CS2011",
                    "name" : "Introduction to Programming",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
                {
                    "code" : "CS3030",
                    "name" : "Foundations of Computing Systems",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
            ],
            "CGPA" : 8.2,
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "No remarks"
        },
        {
            "rollNo" : "11CH00120",
            "name" : "Edward Newgate",
            "program" : "BTECH",
            "atRisk" : true,
            "riskDecs" : "Insufficient credits",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "Differential Equations",
                    "credits" : 3,
                    "slot" : "B"
                }
            ],
            "electiveCredits" : [
                {
                    "code" : "PME",
                    "min" : 2,
                    "max" : 4
                }
            ],
            "pastCourses": [

            ],
            "CGPA" : 6.5,
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "Not enough credits"
        },
        {
            "rollNo" : "12CH00220",
            "name" : "Nico Robin",
            "program" : "MTECH",
            "atRisk" : false,
            "riskDecs" : "No risks",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "Differential Equations",
                    "credits" : 3,
                    "slot" : "B"
                },
                {
                    "code" : "EE2030",
                    "name" : "Digital Signal Processing",
                    "credits" : 3,
                    "slot" : "D"
                },
                {
                    "code" : "ED2010",
                    "name" : "Engineering Drawing",
                    "credits" : 1,
                    "slot" : "C2"
                },

            ],
            "electiveCredits" : [
                {
                    "code" : "PME",
                    "min" : 2,
                    "max" : 4
                },
                {
                    "code" : "OELP",
                    "min" : 2,
                    "max" : 4
                },
                {
                    "code" : "HSE",
                    "min" : 0,
                    "max" : 2
                },
            ],
            "pastCourses": [
                {
                    "code" : "PH2011",
                    "name" : "Physics Lab",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
                {
                    "code" : "CS3030",
                    "name" : "Foundations of Computing Systems",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
            ],
            "CGPA" : 9.3,
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "No remarks"
        },
        {
            "rollNo" : "12CH00221",
            "name" : "Vinsmoke Reiju",
            "program" : "MTECH",
            "atRisk" : false,
            "riskDecs" : "No risks",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "Differential Equations",
                    "credits" : 3,
                    "slot" : "B"
                },
                {
                    "code" : "EE2030",
                    "name" : "Digital Signal Processing",
                    "credits" : 3,
                    "slot" : "D"
                },
                {
                    "code" : "ED2010",
                    "name" : "Engineering Drawing",
                    "credits" : 1,
                    "slot" : "C2"
                },

            ],
            "electiveCredits" : [
                {
                    "code" : "PME",
                    "min" : 2,
                    "max" : 4
                },
                {
                    "code" : "OELP",
                    "min" : 2,
                    "max" : 4
                },
                {
                    "code" : "HSE",
                    "min" : 0,
                    "max" : 2
                },
            ],
            "pastCourses": [
                {
                    "code" : "CS2011",
                    "name" : "Introduction to Programming",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
                {
                    "code" : "CS3030",
                    "name" : "Foundations of Computing Systems",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
            ],
            "CGPA" : 7.8,
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "No remarks"
        },
        {
            "rollNo" : "11CH00110",
            "name" : "Portgas Ace",
            "program" : "BTECH",
            "atRisk" : true,
            "riskDecs" : "Different credit plan",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "Differential Equations",
                    "credits" : 3,
                    "slot" : "B"
                },
                {
                    "code" : "EE2030",
                    "name" : "Digital Signal Processing",
                    "credits" : 3,
                    "slot" : "D"
                },
                {
                    "code" : "ED2010",
                    "name" : "Engineering Drawing",
                    "credits" : 1,
                    "slot" : "C2"
                },
                {
                    "code" : "HS2010",
                    "name" : "Introduction to Language and Society",
                    "credits" : 3,
                    "slot" : "B"
                },

            ],
            "electiveCredits" : [
                {
                    "code" : "PME",
                    "min" : 2,
                    "max" : 4
                },
                {
                    "code" : "OELP",
                    "min" : 2,
                    "max" : 4
                },
                {
                    "code" : "HSE",
                    "min" : 0,
                    "max" : 2
                },
            ],
            "pastCourses": [
                {
                    "code" : "CS3030",
                    "name" : "Foundations of Computing Systems",
                    "credits_acquired" : 0,
                    "total_credits":3
                },
            ],
            "CGPA" : 5.0,
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "Not Enough credits"
        },
        {
            "rollNo" : "11CH00001",
            "name" : "Franky",
            "program" : "BTECH",
            "atRisk" : true,
            "riskDecs" : "Different credit plan",
            "coreCourses" : [
            ],
            "electiveCredits" : [
            ],
            "pastCourses": [
                {
                    "code" : "CS2011",
                    "name" : "Introduction to Programming",
                    "credits_acquired" : 0,
                    "total_credits":3
                },
                {
                    "code" : "CS3030",
                    "name" : "Foundations of Computing Systems",
                    "credits_acquired" : 0,
                    "total_credits":3
                },
            ],
            "CGPA" : 3,
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "Not Enough credits"
        },
        {
            "rollNo" : "11ZZ00123",
            "name" : "Paul",
            "program" : "PhD",
            "atRisk" : true,
            "riskDecs" : "Different credit plan",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "Differential Equations",
                    "credits" : 3,
                    "slot" : "B"
                },
                {
                    "code" : "EE2030",
                    "name" : "Digital Signal Processing",
                    "credits" : 3,
                    "slot" : "D"
                },
                {
                    "code" : "ED2010",
                    "name" : "Engineering Drawing",
                    "credits" : 1,
                    "slot" : "C2"
                },
                {
                    "code" : "PH2011",
                    "name" : "Physics lab",
                    "credits" : 3,
                    "slot" : "C3"
                },
            ],
            "electiveCredits" : [
            ],
            "pastCourses": [
                {
                    "code" : "CS2011",
                    "name" : "Introduction to Programming",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
                {
                    "code" : "CS3030",
                    "name" : "Foundations of Computing Systems",
                    "credits_acquired" : 3,
                    "total_credits":3
                },
            ],
            "CGPA" : 7.8,
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "Not Enough credits"
        },
    ]
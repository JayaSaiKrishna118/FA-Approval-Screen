import { ApprovalStatus } from "./Skeleton"
import { StudentInfo } from "./Skeleton"

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
                    "name" : "DE",
                    "credits" : 3,
                    "slot" : "B"
                },
                {
                    "code" : "CS3050",
                    "name" : "CA",
                    "credits" : 5,
                    "slot" : "A"
                },
                {
                    "code" : "CS2030",
                    "name" : "SP",
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
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "No remarks"
        },
        {
            "rollNo" : "12AB01022",
            "name" : "Alison Bonney",
            "program" : "MTECH",
            "atRisk" : false,
            "riskDecs" : "No risk",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "GRAPHS",
                    "credits" : 5,
                    "slot" : "C"
                },
                {
                    "code" : "CS3050",
                    "name" : "CA+",
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
                    "name" : "DE",
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
            "approvalStatus" : ApprovalStatus.REJECTED,
            "approvalRemarks" : "Not enough credits"
        },
        {
            "rollNo" : "13AB01022",
            "name" : "Madison Conney",
            "program" : "MTECH",
            "atRisk" : false,
            "riskDecs" : "No risk",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "GRAPHS",
                    "credits" : 5,
                    "slot" : "C"
                },
                {
                    "code" : "CS3050",
                    "name" : "CA+",
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
            "approvalStatus" : ApprovalStatus.REJECTED,
            "approvalRemarks" : "No remarks"
        },
        {
            "rollNo" : "12AB01004",
            "name" : "Eren",
            "program" : "BTECH",
            "atRisk" : true,
            "riskDecs" : "Was at home for 1 year",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "GRAPHS",
                    "credits" : 5,
                    "slot" : "C"
                },
                {
                    "code" : "CS3050",
                    "name" : "CA+",
                    "credits" : 6,
                    "slot" : "D"
                }
            ],
            "electiveCredits" : [
                {
                    "code" : "PME",
                    "min" : 0,
                    "max" : 5
                },
                {
                    "code" : "HSE",
                    "min" : 0,
                    "max" : 3
                },
                
            ],
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "No remarks"
        },
        {
            "rollNo" : "11AB01024",
            "name" : "Johnson",
            "program" : "BTECH",
            "atRisk" : false,
            "riskDecs" : "No risk",
            "coreCourses" : [
                {
                    "code" : "MA2020",
                    "name" : "GRAPHS",
                    "credits" : 5,
                    "slot" : "C"
                },
                {
                    "code" : "CS3050",
                    "name" : "CA+",
                    "credits" : 6,
                    "slot" : "D"
                },
                {
                    "code" : "CS3020",
                    "name" : "DAA",
                    "credits" : 6,
                    "slot" : "M1"
                }
            ],
            "electiveCredits" : [],
            "approvalStatus" : ApprovalStatus.PENDING,
            "approvalRemarks" : "No remarks"
        },

        {
            "rollNo" : "11CE00110",
            "name" : "Vikas",
            "program" : "BTECH",
            "atRisk" : true,
            "riskDecs" : "Insufficient credits",
            "coreCourses" : [
                {
                    "code" : "PH2020",
                    "name" : "QM",
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
            "approvalStatus" : ApprovalStatus.APPROVED,
            "approvalRemarks" : "No remark"
        },

    ]
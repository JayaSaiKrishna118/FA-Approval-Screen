import { AcadCreditPlan } from "./models/acadcreditplan"
import { DecisionStatus } from "./models/decisionstatus";

export class Data {
  public static creditPlans: AcadCreditPlan[] =
    [
      {
        id: "1",
        studentInfo: {
          rollNo: "22MA30017",
          name: "John Doe",
          program: "B.Tech CSE",
          totalCreditsRequired: 130,
          creditsEarned: [
            {
              category: "PMC",
              earned: 12,
              required: 24
            },
            {
              category: "PME",
              earned: 3,
              required: 20
            },
            {
              category: "HSS",
              earned: 2,
              required: 4
            },
            {
              category: "SME",
              earned: 0,
              required: 3
            },
            {
              category: "PROJ",
              earned: 2,
              required: 9
            }
          ]
        },
        submitDate: "14-Jul-2024",
        atRisk: false,
        riskDesc: "",
        decisionStatus: DecisionStatus.PENDING,
        decisionRemarks: "",
        corePlan: [
          {
            code: "CS3000",
            name: "C Programming",
            credits: 4,
            slot: "A"
          },
          {
            code: "CS500X",
            name: "Web Programming",
            credits: 3,
            slot: "B"
          }
        ],
        electivePlan: [
          {
            category: "ELEC201",
            minCredits: 3,
            maxCredits: 6
          }
        ]
      },
      {
        id: "2",
        studentInfo: {
          rollNo: "22MA40017",
          name: "Jane Smith",
          program: "M.Tech DS",
          totalCreditsRequired: 130,
          creditsEarned: [
            {
              category: "PMC",
              earned: 12,
              required: 24
            },
            {
              category: "PME",
              earned: 3,
              required: 20
            },
            {
              category: "HSS",
              earned: 2,
              required: 4
            },
            {
              category: "SME",
              earned: 0,
              required: 3
            },
            {
              category: "PROJ",
              earned: 2,
              required: 9
            }
          ]
        },
        submitDate: "14-Jul-2024",
        atRisk: true,
        riskDesc: "Low attendance and some backlogs",
        decisionStatus: DecisionStatus.PENDING,
        decisionRemarks: "",
        corePlan: [
          {
            code: "PHY101",
            name: "Physics I",
            credits: 4,
            slot: "A"
          },
          {
            code: "CHEM101",
            name: "Chemistry I",
            credits: 3,
            slot: "B"
          }
        ],
        electivePlan: [
          {
            category: "ELEC202",
            minCredits: 2,
            maxCredits: 4
          }
        ]
      },
      {
        id: "3",
        studentInfo: {
          rollNo: "22ME50017",
          name: "Alice Johnson",
          program: "Ph.D. CSE",
          totalCreditsRequired: 130,
          creditsEarned: [
            {
              category: "PMC",
              earned: 12,
              required: 24
            },
            {
              category: "PME",
              earned: 3,
              required: 20
            },
            {
              category: "HSS",
              earned: 2,
              required: 4
            },
            {
              category: "SME",
              earned: 0,
              required: 3
            },
            {
              category: "PROJ",
              earned: 2,
              required: 9
            }
          ]
        },
        submitDate: "14-Jul-2024",
        atRisk: false,
        riskDesc: "",
        decisionStatus: DecisionStatus.PENDING,
        decisionRemarks: "",
        corePlan: [
          {
            code: "RES301",
            name: "Research Methodology",
            credits: 5,
            slot: "C"
          },
          {
            code: "DS101",
            name: "Data Science Fundamentals",
            credits: 4,
            slot: "D"
          }
        ],
        electivePlan: [
          {
            category: "ELEC203",
            minCredits: 3,
            maxCredits: 6
          }
        ]
      },
      {
        id: "4",
        studentInfo: {
          rollNo: "22ME40019",
          name: "Bob Brown",
          program: "M.Sc. HSS",
          totalCreditsRequired: 130,
          creditsEarned: [
            {
              category: "PMC",
              earned: 12,
              required: 24
            },
            {
              category: "PME",
              earned: 3,
              required: 20
            },
            {
              category: "HSS",
              earned: 2,
              required: 4
            },
            {
              category: "SME",
              earned: 0,
              required: 3
            },
            {
              category: "PROJ",
              earned: 2,
              required: 9
            }
          ]
        },
        submitDate: "14-Jul-2024",
        atRisk: true,
        riskDesc: "Academic probation",
        decisionStatus: DecisionStatus.REJECTED,
        decisionRemarks: "",
        corePlan: [
          {
            code: "BIO101",
            name: "Biology Basics",
            credits: 3,
            slot: "A"
          },
          {
            code: "CHEM102",
            name: "Chemistry II",
            credits: 4,
            slot: "B"
          }
        ],
        electivePlan: [
          {
            category: "ELEC204",
            minCredits: 2,
            maxCredits: 5
          }
        ]
      },
      {
        id: "5",
        studentInfo: {
          rollNo: "22MA30019",
          name: "Charlie Davis",
          program: "B.Sc. Physics",
          totalCreditsRequired: 100,
          creditsEarned: [
            {
              category: "PMC",
              earned: 12,
              required: 24
            },
            {
              category: "PME",
              earned: 3,
              required: 20
            },
            {
              category: "HSS",
              earned: 2,
              required: 4
            },
            {
              category: "SME",
              earned: 0,
              required: 3
            },
            {
              category: "PROJ",
              earned: 2,
              required: 9
            }
          ]
        },
        submitDate: "14-Jul-2024",
        atRisk: false,
        riskDesc: "",
        decisionStatus: DecisionStatus.ACCEPTED,
        decisionRemarks: "Hard working student",
        corePlan: [
          {
            code: "MAT101",
            name: "Calculus I",
            credits: 4,
            slot: "A"
          },
          {
            code: "PHY102",
            name: "Physics II",
            credits: 3,
            slot: "B"
          }
        ],
        electivePlan: [
          {
            category: "ELEC205",
            minCredits: 3,
            maxCredits: 6
          }
        ],
      }
    ];
}
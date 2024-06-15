import { DecisionStatus } from "./decisionstatus";
import { CourseInfo } from "./courseinfo";
import { ElectiveCatPlan } from "./electivecatplan";
import { StudentInfo } from "./studentinfo";

export interface AcadCreditPlan{
    id: String;
    submitDate: String;
    studentInfo: StudentInfo;
    atRisk: boolean;
    riskDesc: string;
    decisionStatus: DecisionStatus;
    decisionRemarks: string;
    corePlan: CourseInfo[];
    electivePlan: ElectiveCatPlan[];
}
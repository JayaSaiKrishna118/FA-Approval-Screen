import { Decision } from "./decisionstatus";

export interface CreditPlanDecision {
    id: String;
    decision: Decision;
    remarks: string
}

export interface CreditPlanApprovalRequest {
    decisions: CreditPlanDecision[]
}
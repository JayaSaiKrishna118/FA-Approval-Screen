export interface CatCreditsEarned {
    category: string;
    earned: number;
    required: number;
}

export interface StudentInfo {
    rollNo: string;
    name: string;
    program: string;
    creditsEarned: CatCreditsEarned[];
    totalCreditsRequired: number;
}
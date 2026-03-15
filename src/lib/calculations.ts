/**
 * Financial Calculation Logic for FinCal Innovation Hackathon
 * Mandatory industry-standard formulas as per Technex 26 rules.
 */

interface GoalInputs {
    presentCost: number;
    years: number;
    inflation: number;
    expectedReturn: number;
}

interface GoalResult {
    futureCost: number;
    requiredSIP: number;
    totalInvestment: number;
    estimatedEarnings: number;
}

/**
 * Step 1: FV = PresentCost * (1 + Inflation)^Years
 * Calculates the inflation-adjusted cost of the goal.
 */
export const calculateFutureCost = (presentCost: number, years: number, inflationRate: number): number => {
    const inflation = inflationRate / 100;
    return presentCost * Math.pow(1 + inflation, years);
};

/**
 * Step 2: RequiredSIP = (FV * r) / (((1 + r)^n - 1) * (1 + r))
 * Calculates the monthly SIP required to achieve the future cost.
 * Where:
 * r = monthly return rate (expectedReturn / (100 * 12))
 * n = total number of months (years * 12)
 */
export const calculateRequiredSIP = (futureValue: number, expectedReturnRate: number, years: number): number => {
    const r = expectedReturnRate / (100 * 12);
    const n = years * 12;

    // Formula: [FV * r] / [((1 + r)^n - 1) * (1 + r)]
    const numerator = futureValue * r;
    const denominator = (Math.pow(1 + r, n) - 1) * (1 + r);

    return numerator / denominator;
};

/**
 * Aggregated calculation for Goal-Based planning
 */
export const calculateGoalPlanning = (inputs: GoalInputs): GoalResult => {
    const futureCost = calculateFutureCost(inputs.presentCost, inputs.years, inputs.inflation);
    const requiredSIP = calculateRequiredSIP(futureCost, inputs.expectedReturn, inputs.years);

    const totalInvestment = requiredSIP * inputs.years * 12;
    const estimatedEarnings = futureCost - totalInvestment;

    return {
        futureCost: Math.round(futureCost),
        requiredSIP: Math.round(requiredSIP),
        totalInvestment: Math.round(totalInvestment),
        estimatedEarnings: Math.round(estimatedEarnings),
    };
};

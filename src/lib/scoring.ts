/**
 * Financial Health Scoring Engine
 * Evaluates goal feasibility and investor preparedness.
 */

interface ScoreInputs {
    presentCost: number;
    years: number;
    inflation: number;
    expectedReturn: number;
    requiredSIP: number;
    monthlyIncome?: number;
    existingSavings?: number;
}

interface HealthBreakdown {
    score: number; // 0-100
    label: 'Critical' | 'Fair' | 'Good' | 'Excellent';
    color: string;
    feedback: string[];
}

export const calculateFinancialHealth = (inputs: ScoreInputs): HealthBreakdown => {
    let score = 70; // Base score
    const feedbackList: string[] = [];

    // 1. Inflation Realistic Check
    if (inputs.inflation < 5) {
        score -= 20;
        feedbackList.push("Your inflation estimate is dangerously low for long-term goals.");
    } else if (inputs.inflation >= 6 && inputs.inflation <= 8) {
        score += 10;
        feedbackList.push("Wise Guardian: You have picked a realistic inflation benchmark.");
    }

    // 2. Expected Returns check
    if (inputs.expectedReturn > 15) {
        score -= 25;
        feedbackList.push("The Greed Trap: Expecting >15% returns consistently is historically risky.");
    } else if (inputs.expectedReturn >= 10 && inputs.expectedReturn <= 13) {
        score += 10;
        feedbackList.push("Realistic Thinker: Your return expectations align with market averages.");
    }

    // 3. Time Horizon
    if (inputs.years < 5) {
        score -= 15;
        feedbackList.push("Market cycles are shorter than your goal. Equity might be too volatile.");
    } else if (inputs.years > 15) {
        score += 10;
        feedbackList.push("Compound Interest Master: Your long-term vision is your greatest asset.");
    }

    // 4. Feasibility
    if (inputs.monthlyIncome) {
        const sipRatio = inputs.requiredSIP / inputs.monthlyIncome;
        if (sipRatio > 0.45) {
            score -= 30;
            feedbackList.push("Budget Alert: This SIP requires nearly half your income. Is it sustainable?");
        } else if (sipRatio < 0.2) {
            score += 5;
            feedbackList.push("Healthy Budget: Your investment plan fits comfortably within your income.");
        }
    }

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    let label: HealthBreakdown['label'] = 'Fair';
    let color = '#919090';

    if (score >= 85) {
        label = 'Excellent';
        color = '#224c87';
    } else if (score >= 65) {
        label = 'Good';
        color = '#1a3a66';
    } else if (score < 40) {
        label = 'Critical';
        color = '#da3832';
    }

    if (feedbackList.length === 0) {
        feedbackList.push("Your plan follows standard financial principles.");
    }

    return { score, label, color, feedback: feedbackList };
};

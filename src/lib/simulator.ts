import Papa from 'papaparse';

export interface BacktestResult {
    month: number;
    date: string;
    invested: number;
    value: number;
    isCrash: boolean;
}

export interface SimulationSummary {
    finalValue: number;
    totalInvested: number;
    growth: number;
    absReturn: number;
    chartData: BacktestResult[];
}

/**
 * SIP Time Machine Simulation
 * Backtests a monthly SIP using historical Nifty 50 CSV data.
 */
export const runHistoricalSimulation = async (
    monthlySip: number,
    startYear: number,
    durationYears: number
): Promise<SimulationSummary> => {
    return new Promise((resolve, reject) => {
        // We expect nifty50.csv to be in the public folder
        Papa.parse('/nifty50.csv', {
            download: true,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results: any) => {
                const data: any[] = results.data;

                // 1. Filter timeline
                const historicalTimeline = data.filter(row => {
                    const rowDate = new Date(row.Date);
                    return rowDate.getFullYear() >= startYear;
                }).slice(0, durationYears * 12);

                if (historicalTimeline.length === 0) {
                    reject('No historical data available for the selected period.');
                    return;
                }

                let totalInvested = 0;
                let currentPortfolioValue = 0;
                let chartData: BacktestResult[] = [];

                // 2. Simulation Loop
                historicalTimeline.forEach((monthData, index) => {
                    let monthlyReturn = monthData.MonthlyReturn;

                    // Fallback if MonthlyReturn column is missing but Close is present
                    if (monthlyReturn === undefined && index > 0) {
                        const prevClose = historicalTimeline[index - 1].Close;
                        const currentClose = monthData.Close;
                        monthlyReturn = ((currentClose - prevClose) / prevClose) * 100;
                    } else if (monthlyReturn === undefined) {
                        monthlyReturn = 0;
                    }

                    totalInvested += monthlySip;

                    // Rebalance: Apply growth/dip to (current value + new investment)
                    currentPortfolioValue = (currentPortfolioValue + monthlySip) * (1 + monthlyReturn / 100);

                    chartData.push({
                        month: index + 1,
                        date: monthData.Date,
                        invested: totalInvested,
                        value: Math.round(currentPortfolioValue),
                        isCrash: monthlyReturn < -5
                    });
                });

                resolve({
                    finalValue: Math.round(currentPortfolioValue),
                    totalInvested,
                    absReturn: currentPortfolioValue - totalInvested,
                    growth: ((currentPortfolioValue - totalInvested) / totalInvested) * 100,
                    chartData
                });
            },
            error: (err: any) => reject(err)
        });
    });
};

import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import MoneyOutflow from "../../entities/MoneyOutflow";

interface IProps {
    moneyOutflows: Array<MoneyOutflow>
}

/**
 * A pie chart to show all outflows by category
 * @param {IProps} 
 * @returns 
 */
const MoneyOutflowChart = ({ moneyOutflows }: IProps) => {
    const options = { //Chart options.
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Saídas de dinheiro por categoria',
            },
        },
    };

    const categories: Array<string> = [];

    moneyOutflows.forEach(moneyOutflow => {
        if (categories.includes(moneyOutflow.paymentCategory)) return;

        categories.push(moneyOutflow.paymentCategory);
    });

    const calcTotalByCategory = (paymentCategory: string) => {
        const filteredMoneyOutflows = moneyOutflows.filter(moneyOutflow => moneyOutflow.paymentCategory == paymentCategory);

        return filteredMoneyOutflows.reduce<number>((previousValue: number, currentValue: MoneyOutflow) => {
            return currentValue.value + previousValue;
        }, 0);
    }

    return (
        <Pie
            data={{
                labels: categories,
                datasets: [
                    {
                        label: 'Total:',
                        data: categories.map(category => calcTotalByCategory(category)),
                        backgroundColor: [ //TODO: The list of background color must have the same length of the categories
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                          ],
                          borderColor: [ 
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                          ],
                          borderWidth: 1,
                    }
                ]
            }}
            options={options}
        />
    )
}

export default MoneyOutflowChart;
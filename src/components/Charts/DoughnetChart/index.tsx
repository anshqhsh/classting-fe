import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '@/constants/style';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({
  correctCount,
  incorrectCount,
  totalLength,
}: {
  correctCount: number;
  incorrectCount: number;
  totalLength: number;
}) {
  const chartDataAndOption = useMemo(() => {
    const data = {
      labels: ['정답 갯수', '오답 갯수'],
      datasets: [
        {
          label: '퀴즈 결과',
          data: [correctCount, incorrectCount],
          backgroundColor: [COLORS.COLOR_GREEN_MAIN, COLORS.COLOR_PURPLE_MAIN],
        },
      ],
    };
    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label(context: TooltipItem<'doughnut'>) {
              return ` : ${context.formattedValue} 개`;
            },
            footer(context: TooltipItem<'doughnut'>[]) {
              return ` ${((Number(context[0].formattedValue) / totalLength) * 100).toFixed(2)}%`;
            },
          },
        },
      },
    };
    return { data, options };
  }, [correctCount, incorrectCount, totalLength]);

  return <Doughnut data={chartDataAndOption.data} options={chartDataAndOption.options} />;
}

export default DoughnutChart;

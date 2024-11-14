import * as echarts from "echarts/core";
import { GridComponent, GridComponentOption } from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";

echarts.use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption
>;

const AllBeborred = () => {
  const chartDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartDom.current) return;

    const myChart = echarts.init(chartDom.current);
    const option: EChartsOption = {
      title: {
        text: "近两周单日借出书籍总量",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [
            120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
          ],
          type: "bar",
        },
      ],
    };

    myChart.setOption(option);

    const resizeObserver = new ResizeObserver(() => myChart.resize());
    resizeObserver.observe(chartDom.current);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      myChart.dispose();
    };
  }, []);

  return <div ref={chartDom} style={{ width: "100%", height: "300px" }}></div>;
};

export default AllBeborred;

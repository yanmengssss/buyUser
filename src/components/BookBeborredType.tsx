import * as echarts from "echarts/core";
import { GridComponent, GridComponentOption } from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";
import { booktype } from "../store/common";
echarts.use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption
>;

const BookBeborredType = () => {
  const chartDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartDom.current) return;
    const bookNames = booktype.map((item) => item.label);
    const myChart = echarts.init(chartDom.current);
    const option: EChartsOption = {
      title: {
        text: "近两周借出书籍类型",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: bookNames,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
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

export default BookBeborredType;

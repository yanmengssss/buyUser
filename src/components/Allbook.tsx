import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef, useState } from "react";
import { booktype } from "../store/common";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const Allbook = () => {
  const chartRef = useRef<HTMLDivElement>(null); // 使用 HTMLDivElement 类型
  const [val, setval] = useState<{ value: number; name: string }[]>([]);

  // 更新 val 和 option 的 useEffect
  useEffect(() => {
    setval(
      booktype.map((item) => ({
        name: item.label,
        value: Math.random() * 200 + 40,
      }))
    );
  }, []); // 只在组件挂载时设置一次

  // 更新 option 的 useEffect
  useEffect(() => {
    if (chartRef.current && val.length > 0) {
      const option = {
        title: {
          text: "藏书总量",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: val,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      const myChart = echarts.init(chartRef.current);
      myChart.setOption(option);

      // 清理函数，组件卸载时销毁实例
      return () => {
        myChart.dispose();
      };
    }
  }, [val]); // 监听 val，确保 val 更新时重绘图表

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }}></div>; // 设置图表容器大小
};

export default Allbook;

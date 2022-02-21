import { ResponsivePie } from "@nivo/pie";
import { MyChartParam } from "./types";

const MyChart = ({ data }: MyChartParam) => {
  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr",
      }}
    >
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "만화",
                },
                id: "dots",
              },
              {
                match: {
                  id: "역사",
                },
                id: "dots",
              },
              {
                match: {
                  id: "경제경영",
                },
                id: "dots",
              },
              {
                match: {
                  id: "자기계발",
                },
                id: "dots",
              },
              {
                match: {
                  id: "소설/시/희곡",
                },
                id: "lines",
              },
              {
                match: {
                  id: "컴퓨터/모바일",
                },
                id: "lines",
              },
              {
                match: {
                  id: "예술/대중문화",
                },
                id: "lines",
              },
              {
                match: {
                  id: "인문학",
                },
                id: "lines",
              },
              {
                match: {
                  id: "사회과학",
                },
                id: "lines",
              },
              {
                match: {
                  id: "과학",
                },
                id: "lines",
              },
              {
                match: {
                  id: "여행",
                },
                id: "lines",
              },
              {
                match: {
                  id: "만화",
                },
                id: "lines",
              },
              {
                match: {
                  id: "에세이",
                },
                id: "lines",
              },
            ]}
            legends={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default MyChart;

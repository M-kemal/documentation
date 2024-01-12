<template>
  <div class="flex items-center justify-center my-8">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<!-- <script>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

export default {
  setup() {
    const chartRef = ref(null);

    onMounted(() => {
      const dataset = [
        { name: "Presale", percent: 5 },
        { name: "Public Sale - Round 1", percent: 5 },
        { name: "Public Sale - Round 2", percent: 5 },
        { name: "Liquidity Pool", percent: 3 },
        { name: "Team / Advisors", percent: 7 },
        { name: "Staking Rewards", percent: 8 },
        { name: "Eco-System Development ", percent: 9 },
        { name: "Marketing ", percent: 8 },
        { name: "TOKEN BURN", percent: 50 },
      ];

      const w = 600,
        h = 600;
      const outerRadius = w / 2;
      const innerRadius = 200;
      //   const color = d3.scaleOrdinal(d3.schemeCategory10);
      const customColors = [
        "#F79327",
        "#F79327",
        "#F79327",
        "#F0997D",
        "#FC4F00",
        "#E90064",
        "#FF1E1E",
        "#E90064",
        "#B70404",
      ];

      const color = d3.scaleOrdinal().range(customColors);

      const pie = d3
        .pie()
        .value((d) => d.percent)
        .sort(null)
        .padAngle(0.03);

      const arc = d3.arc().outerRadius(outerRadius).innerRadius(innerRadius);

      const svg = d3
        .select(chartRef.value)
        .append("svg")
        .attr("width", w)
        .attr("height", h)

        .append("g")
        .attr("transform", `translate(${w / 2}, ${h / 2})`);

      svg
        .selectAll("path")
        .data(pie(dataset))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.name))
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function (t) {
            return arc(interpolate(t));
          };
        });

      // Metin etiketleri
      svg
        .selectAll("text")
        .data(pie(dataset))
        .enter()
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("dy", ".4em")
        .attr("text-anchor", "middle")
        .text((d) => `${d.data.percent}%`)
        .style("fill", "#fff")
        .style("font-size", "10px");

      // Efsanevi (legend)
      const legendRectSize = 20;
      const legendSpacing = 7;
      const legendHeight = legendRectSize + legendSpacing;

      const legend = svg
        .selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          (d, i) => `translate(-85, ${i * legendHeight - 105})`
        );

      legend
        .append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .attr("rx", 20)
        .attr("ry", 20)
        .style("fill", color)
        .style("stroke", color);

      legend
        .append("text")
        .attr("x", 30)
        .attr("y", 15)
        .text((d) => d)
        .style("fill", "#929DAF")
        .style("text-shadow", "1px 1px #06060d")
        .style("font-size", "14px");
    });

    return {
      chartRef,
    };
  },
};
</script> -->

<script>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

export default {
  setup() {
    const chartRef = ref(null);
    let isAnimated = false;

    // Elemanın görünüm alanında olup olmadığını kontrol eden fonksiyon
    const animateChart = () => {
      const dataset = [
        { name: "Presale", percent: 5 },
        { name: "Public Sale - Round 1", percent: 5 },
        { name: "Public Sale - Round 2", percent: 5 },
        { name: "Liquidity Pool", percent: 3 },
        { name: "Team / Advisors", percent: 7 },
        { name: "Staking Rewards", percent: 8 },
        { name: "Eco-System Development ", percent: 9 },
        { name: "Marketing ", percent: 8 },
        { name: "TOKEN BURN", percent: 50 },
      ];

      // Ekran boyutuna bağlı dinamik boyutlandırma
      const screenWidth = window.innerWidth - 100;
      const isMobile = screenWidth < 768; // Mobil ekran boyutu kontrolü
      const w = isMobile ? screenWidth : 600; // Genişlik
      const h = isMobile ? screenWidth : 600; // Yükseklik
      const outerRadius = w / 2;
      const innerRadius = isMobile ? 50 : 200; // İç çap mobilde daha küçük olabilir

      // const w = 600,
      //   h = 600;
      // const outerRadius = w / 2;
      // const innerRadius = 200;
      //   const color = d3.scaleOrdinal(d3.schemeCategory10);
      const customColors = [
        "#F79327",
        "#F79327",
        "#F79327",
        "#F0997D",
        "#FC4F00",
        "#E90064",
        "#FF1E1E",
        "#E90064",
        "#B70404",
      ];

      const color = d3.scaleOrdinal().range(customColors);

      const pie = d3
        .pie()
        .value((d) => d.percent)
        .sort(null)
        .padAngle(0.03);

      const arc = d3.arc().outerRadius(outerRadius).innerRadius(innerRadius);

      d3.select(chartRef.value)
        .style("opacity", 1)
        .style("visibility", "visible");

      const svg = d3
        .select(chartRef.value)
        .append("svg")
        .attr("width", w)
        .attr("height", h)

        .append("g")
        .attr("transform", `translate(${w / 2}, ${h / 2})`);
      svg
        .selectAll("path")
        .data(pie(dataset))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.name))
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function (t) {
            return arc(interpolate(t));
          };
        });

      // Metin etiketleri
      svg
        .selectAll("text")
        .data(pie(dataset))
        .enter()
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("dy", ".4em")
        .attr("text-anchor", "middle")
        .text((d) => `${d.data.percent}%`)
        .style("fill", "#fff")
        // .style("font-size", "10px");
        .style("font-size", isMobile ? "8px" : "10px"); // Mobil için font boyutunu azalt

      // Efsanevi (legend)
      // const legendRectSize = 20;
      // Efsanevi (legend) için yerleşim ve boyut değişiklikleri
      const legendRectSize = isMobile ? 15 : 20; // Mobil için daha küçük kare
      const legendSpacing = 7;
      const legendHeight = legendRectSize + legendSpacing;

      const legend = svg
        .selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          (d, i) => `translate(-85, ${i * legendHeight - 105})`
        );

      legend
        .append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .attr("rx", 20)
        .attr("ry", 20)
        .style("fill", color)
        .style("stroke", color);

      legend
        .append("text")
        .attr("x", 30)
        .attr("y", 15)
        .text((d) => d)
        .style("fill", "#FFF")
        .style("text-shadow", "1px 1px #06060d")
        .style("font-size", "14px");
    };

    const handleScroll = () => {
      // chartRef.value'nin var olup olmadığını kontrol edin
      if (!chartRef.value) {
        return;
      }

      const chartPosition = chartRef.value.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (chartPosition < screenPosition && !isAnimated) {
        animateChart();
        isAnimated = true;
      }
    };

    onMounted(() => {
      d3.select(chartRef.value)
        .style("opacity", 0)
        .style("visibility", "hidden");
      window.addEventListener("scroll", handleScroll);
    });

    return {
      chartRef,
    };
  },
};
</script>

<style scoped>
body {
  background-color: #1b1f2a;
  width: 100%;
  font-family: "Roboto", sans-serif;
  height: 100%;
}

.widget {
  margin: 0 auto;
  width: 350px;
  margin-top: 50px;
  background-color: #222d3a;
  border-radius: 5px;
  box-shadow: 0px 0px 1px 0px #06060d;
}

.header {
  background-color: #29384d;
  height: 40px;
  color: #929daf;
  text-align: center;
  line-height: 40px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  font-weight: 400;
  font-size: 1.5em;
  text-shadow: 1px 1px #ce18bf;
}

.chart-container {
  /* padding: 25px; */
}

.shadow {
  -webkit-filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.5));
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.5));
}
</style>

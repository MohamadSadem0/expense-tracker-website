const Chart = new Vue({
  el: "#chart",
  data: () => ({
    dataPoints: [
      {
        name: "Baseball",
        value: 9,
      },
      {
        name: "Football",
        value: 11,
      },
      {
        name: "Basketball",
        value: 5,
      },
      {
        name: "Soccer",
        value: 11,
      },
      {
        name: "Hockey",
        value: 6,
      },
      {
        name: "Volleyball",
        value: 6,
      },
    ],
  }),
  computed: {
    getMaxDataPoint() {
      return Math.max(...this.dataPoints.map((d) => d.value));
    },
  },
});

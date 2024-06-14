import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Dimensions } from "react-native";
import { onValue, ref } from "firebase/database";
import { databaseRealtime } from "../../firebaseConfig";
import { BarChart } from "react-native-chart-kit";

//https://www.npmjs.com/package/victory-chart

const screenWidth = Dimensions.get("window").width;

const Chart = () => {
  const [gateData, setGateData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const timeDifferences = [];
  const timeDates = [];
  const chartLabels = [];
  const chartValues = [];
  const durationPerDays = [];

  useEffect(() => {
    const gateRef = ref(databaseRealtime, "gate");
    onValue(gateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        Object.keys(data).forEach((key) => {
          const entry = data[key];
          const action = entry.action;
          const timestamp = entry.timestamp;
          if (action != "open" && action != "close") {
            return;
          }
          setGateData((prevData) => [...prevData, { action, timestamp }]);
        });
      }
    });
  }, []);

  useEffect(() => {
    const indexes = [];
    for (let i = 0; i < gateData.length / 4 - 1; i++) {
      indexes.push(4 * i);
      indexes.push(4 * i + 3);
    }
    const timestamps = [];
    for (let i = 0; i < indexes.length; i += 2) {
      const start = indexes[i];
      const end = indexes[i + 1];
      timestamps.push([gateData[start].timestamp, gateData[end].timestamp]);
    }
    timestamps.map((timestamp) => {
      timeDates.push(new Date(timestamp[0]).toLocaleDateString());
      const time1 = new Date(timestamp[0]);
      const time2 = new Date(timestamp[1]);
      const diff = time2 - time1;
      timeDifferences.push(diff);
    });

    for (let i = 0; i < timeDates.length; i++) {
      if (durationPerDays[timeDates[i]]) {
        durationPerDays[timeDates[i]] += timeDifferences[i];
      } else {
        durationPerDays[timeDates[i]] = timeDifferences[i];
      }
    }

    for (const [key, value] of Object.entries(durationPerDays)) {
      chartLabels.push(key);
      chartValues.push(formatToHMS(value));
    }

    // For testing
    // chartLabels.push("5/31/2024");
    // chartValues.push(4.5);
    // chartLabels.push("6/1/2024");
    // chartValues.push(5.5);

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          data: chartValues,
        },
      ],
    });
  }, [gateData]);

  const formatToHMS = (diff) => {
    const diffSeconds = Math.floor(diff / 1000);
    return (diffSeconds / 3600).toFixed(2);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="justify-center items-center h-12 mb-32 mt-14 bg-black-100 py-2 mx-8">
        <Text className="text-3xl text-gray-200 font-pmedium">Your chart</Text>
      </View>
      <View className="relative justify-center items-center">
        {chartData && (
          <BarChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            fromZero={true}
            yAxisInterval={1}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chart;
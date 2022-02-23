<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
    data() {
        return {
        airlineCount: [],
        airlineName: [],
        reasonName: [],
        };
    },
  async created() {
    var response = await fetch("http://localhost:3000/tweetReason");
    const reason = await response.json();
    var id;
    for(id=0;id<reason.length;id++){
        this.reasonName[id] = reason[id].negativereason;
    }

    response = await fetch("http://localhost:3000/tweetAirline");
    const airline = await response.json();
    for(id=0;id<airline.length;id++){
        this.airlineName[id] = airline[id].airline;
    }

    for(var i=0;i<reason.length;i++){

         response = await fetch(`http://localhost:3000/tweetNegativeReason/${reason[i].negativereason}`);
         var data = await response.json();
            var array_weights = [];
            for(var j=0;j<airline.length;j++){
                array_weights[j] = data[j].negativeReason;
            }     
        this.airlineCount[i] = array_weights;
      }

       this.renderChart(
      {
        labels: this.airlineName,
        datasets: [
          {
            label: this.reasonName[0],
            backgroundColor: "#565051",
            data:  this.airlineCount[0]
          },
          {
            label: this.reasonName[1],
            backgroundColor: "#98AFC7",
            data:  this.airlineCount[1]
          },
          {
            label: this.reasonName[2],
            backgroundColor: "#0000A0",
            data:  this.airlineCount[2]
          },
          {
            label: this.reasonName[3],
            backgroundColor: "#00FFFF",
            data:  this.airlineCount[3]
          },
          {
            label: this.reasonName[4],
            backgroundColor: "#728C00",
            data:  this.airlineCount[4]
          },
          {
            label: this.reasonName[5],
            backgroundColor: "#00FF00",
            data:  this.airlineCount[5]
          },
          {
            label: this.reasonName[6],
            backgroundColor: "#EDE275",
            data:  this.airlineCount[6]
          },
          {
            label: this.reasonName[7],
            backgroundColor: "#FFFF00",
            data:  this.airlineCount[7]
          },
          {
            label: this.reasonName[8],
            backgroundColor: "#493D26",
            data:  this.airlineCount[8]
          },
          {
            label: this.reasonName[9],
            backgroundColor: "#FF2400",
            data:  this.airlineCount[9]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
            
    
  }
};
</script>
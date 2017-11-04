    var app = new Vue({
      el: '#app',
      data() {
        return {
          message: 'Hello Vue!!',
          year: 2017,
          items: [{
            value: '1'
          }, {
            value: '5'
          }],
          months: [],
          weeks: [],
          days: [],
        }
      },

      methods: {
        weekDay() {
          let d;
          for (let m = 1; m < 11; m++) {
            this.weeks= [];
            this.days = [];
            let monthStart = new Date(this.year, m, 1);
            let monthEnd = new Date(this.year, m + 1, 1);
            let monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
            for (d = 1; d < monthLength+1; d++) {
              let day = new Date(this.year, m - 1, d).getDay();
              if (day === 0) day = 7;
              this.days[day - 1] = d;
              console.log(d);
              if (day === 7 || d >= monthLength) {
                 console.log('YES d >= monthLength', d >= monthLength);

               // console.log(this.days);
                this.weeks.push(this.days);
                this.days = [];
              }
            }
            console.log('d:',d,' ','monthLength:', monthLength,' d >= monthLength', d >= monthLength);
            console.log('weeks:',this.weeks);
            console.log('monthLength:',monthLength);

            this.months.push(this.weeks)
          }
        }
      },
      created() {
        this.weekDay();
       // console.log('=>', this.months);
      },
    })

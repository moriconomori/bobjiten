var app = new Vue({
  el: "#app",
  data: {
    word: "お題 CARD",
    words: [],
    cardColor: ""
  },
  methods: {
    pickup: function (event) {
      var index = Math.floor(Math.random() * this.words.length);
      this.word = this.words[index];
      var whois = Math.floor(Math.random() * 100) + 1;
      if (whois <= 10) {
        this.cardColor = "rgb(255, 234, 42)";
      } else if (whois > 10 && whois <= 20) {
        this.cardColor = "rgb(129, 214, 116)";
      } else {
        this.cardColor = "";
      }
      var audio = document.getElementById('odai');
      audio.play();
    },
    correct: function (event) {
      var audio = document.getElementById('correct');
      audio.play();
    },
    incorrect: function (event) {
      var audio = document.getElementById('incorrect');
      audio.play();
    },
  },
  created: async function () {
    var data = [];
    await axios.get('./data/bob_dictionary_1.txt')
      .then(function (res) {
        data = res.data.split(/\r\n|\r|\n/).filter(v => v);
      })
      .catch(function (err) {
        console.log('Error: bob_dictionary_1.txt');
      });
    this.words = data;
  }
});

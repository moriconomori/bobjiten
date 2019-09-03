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
      gtag('event', 'click', {
        'event_category': 'button',
        'event_label': 'お題',
        'value': 1
      });
    },
    correct: function (event) {
      var audio = document.getElementById('correct');
      audio.play();
      gtag('event', 'click', {
        'event_category': 'button',
        'event_label': '正解',
        'value': 1
      });
    },
    incorrect: function (event) {
      var audio = document.getElementById('incorrect');
      audio.play();
      gtag('event', 'click', {
        'event_category': 'button',
        'event_label': '不正解',
        'value': 1
      });
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

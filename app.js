var app = new Vue({
  el: "#app",
  data: {
    word: "お題 CARD",
    words: [],
    type: '',
    typeName: '',
    cardTotalNum: 0,
    cardNum: 0,
    isEmpty: false,
  },
  methods: {
    pickup: function(event) {
      if (this.cardNum < 1) {
        this.cardColor = '';
        this.type = '';
        this.isEmpty = true;
        return;
      }

      var index = Math.floor(Math.random() * this.words.length);
      this.word = this.words.splice(index, 1)[0];
      this.cardNum = this.words.length;

      var whois = Math.floor(Math.random() * 100) + 1;
      if (whois <= 10) {
        this.type = 'katakoto';
        this.typeName = 'カタコト';
      } else if (whois > 10 && whois <= 20) {
        this.type = 'gesture';
        this.typeName = 'ジェスチャー';
      } else {
        this.cardColor = '';
        this.type = '';
        this.typeName = '';
      }

      var audio = document.getElementById('odai');
      audio.play();
      gtag('event', 'click', { 'event_category': 'button', 'event_label': 'お題' })
    },
    correct: function(event) {
      var audio = document.getElementById('correct');
      audio.play();
      gtag('event', 'click', { 'event_category': 'button', 'event_label': '正解' });
    },
    incorrect: function(event) {
      var audio = document.getElementById('incorrect');
      audio.play();
      gtag('event', 'click', { 'event_category': 'button', 'event_label': '不正解' });
    },
    getDictionary: async function(filename) {
      const directory = 'data/';
      let data = [];

      await axios.get(directory + filename)
        .then(function(res) {
          data = res.data.split(/\r\n|\r|\n/).filter(v => v);
        })
        .catch(function(err) {
          console.log('Error: ' + directory + filename);
        });

      return data;
    }
  },
  created: async function() {
    let data = [];

    data = await this.getDictionary('bob_dictionary_1.txt');
    this.words = this.words.concat(data);

    data = await this.getDictionary('bob_dictionary_2.txt');
    this.words = this.words.concat(data);

    data = await this.getDictionary('my_dictionary.txt');
    this.words = this.words.concat(data);

    this.cardTotalNum = this.words.length;
    this.cardNum = this.cardTotalNum;
  }
});

var app = new Vue({
  el: "#app",
  data: {
    word: "お題 CARD",
    words: [],
    wordsList: [],
    type: '',
    typeName: '',
    cardTotalNum: 0,
    cardNum: 0,
    isEmpty: false,
    sounds: {},
    mask: false,
    show: true,
    scores: [],
    playerName: '',
    showPlayerModal: false,
    showAddScoreModal: false,
  },
  methods: {
    pickup: function(event) {
      if (this.cardNum < 1) {
        this.cardColor = '';
        this.type = '';
        this.isEmpty = true;
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

      if (this.type) {
        this.mask = true;
      } else {
        this.mask = false;
      }

      this.cardEnter();

      gtag('event', 'click', { 'event_category': 'button', 'event_label': 'お題' })
    },
    cardEnter: function() {
      this.show = true;
    },
    cardLeave: function() {
      this.playSound('odai');
      this.show = false;
    },
    correct: function(event) {
      this.playSound('correct');
      if (this.scores.length > 0) {
        this.showAddScoreModal = true;
      }
      gtag('event', 'click', { 'event_category': 'button', 'event_label': '正解' });
    },
    incorrect: function(event) {
      this.playSound('incorrect');
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
    },
    playSound: function(name) {
      const audio = this.sounds[name];
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    },
    addPlayer: function() {
      let name = this.playerName;
      let score = {
        'name': name,
        'point': 0,
      }
      if (name != '') {
        this.scores.push(score);
        this.playerName = '';
      }
    },
    addScore: function(name) {
      const index = this.scores.findIndex((v) => {
        return (v.name === name);
      });
      this.scores[index].point++;
      this.showAddScoreModal = false;
    },
    getWordsList: async function(file) {
      const directory = 'data/';
      let data = [];
      await axios.get(directory + file)
        .then(function(res) {
          data = res.data.split(/\r\n|\r|\n/).filter(v => v);
        })
        .catch(function(err) {
          console.log('Error: ' + directory + file);
        });
      return data;
    },
    addNewWord: async function() {
      this.wordsList.push('');
      const lastIndex = this.wordsList.length - 1;
      let refs = this.$refs;
      let focusTarget;

      const targetRefs = 'word' + lastIndex;
      // console.log('targetRefs: ' + targetRefs);

      await Vue.nextTick()
        .then(function() {
          focusTarget = refs[targetRefs];
        })

      focusTarget[0].focus();
    },
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

    this.wordsList = await this.getWordsList('my_dictionary.txt');

    this.sounds['odai'] = new Audio('sound/odai.mp3');
    this.sounds['correct'] = new Audio('sound/correct.mp3');
    this.sounds['incorrect'] = new Audio('sound/incorrect.mp3');
  }
});

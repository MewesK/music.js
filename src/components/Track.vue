<template>
  <v-row>
    <v-col>
      <v-card
        class="mx-auto"
      >
        <v-card-text>
          <v-row
            align="center"
            justify="center"
          >
            <v-col md="3">
              <v-slider 
                v-model="frequency" 
                min="0" 
                max="5000" 
                label="Frequency" 
                thumb-label
              />
              <v-slider 
                v-model="detune" 
                min="0" 
                max="500" 
                label="Detune"
                thumb-label 
              />
              <v-slider 
                v-model="gain" 
                min="0" 
                max="1" 
                step="0.01" 
                label="Gain"
                thumb-label 
              />
              <v-select
                v-model="type"
                :items="types"
                label="Type"
              />
              <v-select
                v-model="noteValue"
                :items="noteValues"
                label="Note Value"
              />
              <v-select
                v-model="bar"
                :items="bars"
                label="Bars"
              />
            </v-col>

            <v-col>
              <v-btn-toggle
                v-model="notesToggled"
                multiple
              >
                <v-btn
                  v-for="n in (1000 / noteValue * bar)"
                  :key="n"
                  :style="n % bar == 0 ? 'margin-right: 3px;' : ''"
                >
                  <v-icon v-text="noteIcon" />
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { audioContext } from '../audio';

export default {
    name: 'Track',

    data: () => ({
        oscillatorNode: audioContext.createOscillator(),
        gainNode: audioContext.createGain(),

        counter: 0,
        notesToggled: [],
        playing: false,

        bar: 2,
        bars: [
            1,
            2,
            3,
            4
        ],
        detune: 0,
        frequency: 440,
        gain: 0,
        noteValue: 250.0,
        noteValues: [
            1000.0,
            500.0,
            250.0,
            125.0,
            62.5
        ],
        type: "square",
        types: [
            "sine",
            "square",
            "sawtooth",
            "triangle",
        ],
    }),

    computed: {
        noteIcon: function() {
            const noteIcons = [
                'mdi-music-note-whole',
                'mdi-music-note-half',
                'mdi-music-note-quarter',
                'mdi-music-note-eighth',
                'mdi-music-note-sixteenth',
            ];
            return noteIcons[this.noteValues.indexOf(this.noteValue)];
        }
    },

    created () {
        setTimeout(this.render, this.noteValue);
    },

    methods: {
        render() {
            if (this.playing && !this.notesToggled.includes(this.counter)) {
                this.oscillatorNode.stop();
                this.playing = false;
            } else if (!this.playing && this.notesToggled.includes(this.counter)) {
                this.oscillatorNode = audioContext.createOscillator();
                this.oscillatorNode.connect(this.gainNode);

                this.oscillatorNode.frequency.setValueAtTime(this.frequency, audioContext.currentTime);
                this.oscillatorNode.type = this.type;
                this.oscillatorNode.detune.setValueAtTime(this.detune, audioContext.currentTime);
                this.gainNode.gain.setValueAtTime(this.gain, audioContext.currentTime);

                this.gainNode.connect(audioContext.destination);
                this.oscillatorNode.start();

                this.playing = true;
            }
            this.counter += 1;
            if (this.counter >= ((1000 / this.noteValue)*this.bar)) {
                this.counter = 0;
            }
            setTimeout(this.render, this.noteValue);
        },
    }
};
</script>
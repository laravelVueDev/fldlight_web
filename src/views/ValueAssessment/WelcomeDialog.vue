<template lang="html">
  <v-dialog v-model="dialog" width="800px" persistent>
    <v-card>
      <div class="cross-icon" @click="dialog = false">
        <v-icon color="black" large>mdi-close</v-icon>
      </div>
      <v-card-title class="headline"
        >Welcome to the Floodlight Values-Assessment Tool
      </v-card-title>
      <v-card-text
        >The following series of questions are designed to help you evaluate
        investments based on the unique values of your client.
      </v-card-text>
      <v-card-actions>
        <v-btn color="green darken-1" text @click="confirm"
          >Start to Answer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="js">
export default {
  name: 'WelcomeDialog',
  data() {
    return {
      dialog: true
    }
  },
  mounted() {
    this.dialog = localStorage.getItem("welcomeDialogConfirmed") !== "true";
  },
  methods: {
    confirm() {
      localStorage.setItem("welcomeDialogConfirmed", "true");
      this.dialog = false;
    }
  }
}
</script>

<style scoped lang="scss">
.cross-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
<style lang="scss">
.v-dialog {
  text-align: center;

  & > .v-card > .v-card__title {
    justify-content: center;
  }

  .v-sheet.v-card {
    padding: 60px 0;
  }

  .v-card__actions {
    text-align: center;
    justify-content: center;
    display: block;

    & > .v-btn.v-btn {
      padding: 0 80px;
      margin: 0 auto;
      display: block;
      background: #b53648;
      color: #fff !important;
      border: none;
      font-size: 12px;
      height: 40px;
    }
  }

  .v-application .headline {
    font-size: 1.2rem !important;
    color: #333333;
  }

  .v-card__text {
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 1.2rem;
    width: 100%;
    color: #333333;
    padding: 0 50px 20px;
  }
}
</style>

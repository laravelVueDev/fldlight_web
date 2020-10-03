<template>
  <div class="committee-meta">
    <transition name="fade">
      <div class="meta-item-group" v-if="timeframeItem && !updating">
        <!-- <div class="meta-item">
            <div class="meta-item-label">
              Committee ID
            </div>
            <div class="meta-item-value">
              {{ committee_id }}
            </div>
          </div> -->
        <div
          v-if="
            meta.connected_organization_name &&
              meta.connected_organization_name != 'NONE'
          "
          class="meta-item"
        >
          <div class="meta-item-label">
            Connected Organization
          </div>
          <div class="meta-item-value">
            <router-link v-if="org.ticker" v-bind:to="org.url">
              {{ org.ticker }}
            </router-link>
            <router-link v-if="org.ticker" v-bind:to="org.url" class="org-name">
              / {{ org.name }}
            </router-link>
            <span v-else>
              {{ org.name }}
            </span>
            <span v-if="orgType" class="detail">
              Organization Type: {{ orgType }}
            </span>
          </div>
        </div>

        <div class="meta-item">
          <div class="meta-item-label">Party Affiliation</div>
          <div class="meta-item-value">
            <PartyAffiliation :affiliation="meta.committee_party_affiliation" />
          </div>
        </div>
        <div v-if="downstream" class="meta-item">
          <div class="meta-item-label">Downstream Contributions</div>
          <div class="meta-item-value">
            <PartiesBar v-bind:width="350" v-bind:parties="parties" />
            <span class="detail">
              This committee contributed {{ downstream.total }} to other
              political committees and candidates {{ timeframeItem.desc }}, with
              {{ downstream.maxPct }} ({{ downstream.maxVal }}) going to the
              <PartyAffiliation :affiliation="downstream.party_affiliation" />
              party.
            </span>
          </div>
        </div>

        <div v-if="meta.candidate_name" class="meta-item">
          <div class="meta-item-label">
            Authorizing Candidate(s)
          </div>
          <div class="meta-item-value">
            <span v-html="displayCandName" />
            <span class="detail">
              {{ officeDescription }}
            </span>
          </div>
        </div>

        <div
          v-if="
            meta.principal_campaign_committee &&
              committee_id !== meta.principal_campaign_committee
          "
          class="meta-item"
        >
          <div class="meta-item-label">
            Principal Campaign Committee
          </div>
          <div class="meta-item-value">
            <router-link v-bind:to="pccUrl">{{
              meta.principal_campaign_committee_name
            }}</router-link>
          </div>
        </div>

        <div class="meta-item">
          <div class="meta-item-label">Committee Designation</div>
          <div class="meta-item-value">
            {{ committeeType.type }}
            <span class="detail">
              {{ committeeType.desc }}
            </span>
            <span
              v-if="committee_id === meta.principal_campaign_committee"
              class="detail"
            >
              * Principal campaign committee
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// TODO: replace maps and normalize number format methods
import * as maps from "@/utils/maps.js";
import format from "@/utils/number-format.js";

import PartyAffiliation from "@/components/PartyAffiliation.vue";
import PartiesBar from "@/components/PartiesBar.vue";

export default {
  name: "CommitteeMeta",
  components: {
    PartyAffiliation,
    PartiesBar
  },
  props: {
    committee_id: String,
    timeframeItem: Object
  },
  data() {
    return {
      meta: {},
      parties: {},
      dataLoaded: false,
      updating: true
    };
  },
  watch: {
    timeframeItem() {
      this.getData();
    },
    $route() {
      this.getData();
    }
  },
  methods: {
    async getData() {
      this.updating = true;
      const url = `/committee/meta/${this.committee_id}/${this.timeframeItem.start}/${this.timeframeItem.end}/`;

      try {
        const response = await this.$http.get(url);
        this.meta = response.data.meta;
        this.parties = response.data.parties;
        this.dataLoaded = true;
        this.updating = false;
      } catch (e) {
        // do nuthin?
        console.warn(e);
      }
    }
  },
  computed: {
    committeeType() {
      if (!this.dataLoaded) {
        return { type: "--", desc: "--" };
      }

      return maps.cmteTypeCodes[this.meta.type];
    },
    officeDescription() {
      const officeCode = this.meta.candidate_office;
      // const office = maps.candOffice[officeCode];
      const state = maps.states[this.meta.candidate_office_street];
      const district = this.meta.candidate_office_district;
      // const incumbent = maps.candICStatus[this.meta.cand_ici];

      let label = "";

      switch (officeCode) {
        case "P":
          label = "Candidate for U.S. President";
          break;
        case "H":
          label = `Congressional candidate for the ${format(
            district,
            "ordinalNumber"
          )} district in ${state}`;
          break;
        case "S":
          label = `Candidate for Senate in the state of ${state}`;
          break;
        default:
          label = "";
      }

      return `${label} (${this.meta.candidate_election_year})`;
    },
    displayCandName() {
      const candidateName = this.meta.candidate_name;

      if (!candidateName) {
        return "";
      }

      return candidateName
        .replace(/-/g, " ")
        .replace(/([\\/-])/g, "$1<br/>")
        .replace(/\(/g, "<br/>(");
    },
    downstream() {
      if (!this.parties) {
        return null;
      }

      let total = 0;
      let maxVal = 0;
      let maxPct = 0;
      let maxParty = "";

      Object.keys(this.parties).forEach(key => {
        const amount = this.parties[key].amount;

        total += amount;

        if (key === "DEM" || key === "REP") {
          maxVal = Math.max(amount, maxVal);

          if (amount > 0 && maxVal === amount) {
            maxParty = key;
            maxPct = this.parties[key].percent;
          }
        }
      });

      if (total === 0) {
        return null;
      }

      return {
        total: format(total, "currency2", "short"),
        maxVal: format(maxVal, "currency2", "short"),
        maxPct: format(maxPct, "percent"),
        party_affiliation: maxParty
      };
    },
    orgType() {
      return maps.cmteOrgTypes[this.meta.org_tp] || "";
    },
    org() {
      let name = this.meta.connected_organization_name;
      let ticker = "";
      let url = "";

      if (!name) {
        return null;
      }

      return {
        name,
        ticker,
        url
      };
    },
    pccUrl() {
      const committeeName = this.meta.pcc_cmte_nm;
      const uriSafeName = committeeName
        ? committeeName.replace(/\s/g, "-")
        : "";

      return `/committee/${
        this.meta.principal_campaign_committee
      }/${encodeURIComponent(uriSafeName)}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.committee-meta {
  width: 32%;
  background: var(--color-nord-6);
  // background: #f0f0f0;
  padding: 20px 30px;
  border-radius: 6px;
}

.meta-item:first-child {
  margin-top: 20px;
}

.meta-item {
  margin-bottom: 40px;
}

.meta-item-label {
  font-weight: 500;
  font-size: 1.4em;
  margin-bottom: 10px;
  font-family: $secondary-font;
  position: relative;
  padding-top: 1rem;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0rem;
    width: 5rem;
    height: 1px;
    background-color: $gray0;
  }
}
.meta-item-value {
  font-size: 1em;
  line-height: 1.2em;
}
.meta-item-value a {
  font-weight: 500;
}
a.org-name {
  color: var(--color-nord-2);
  font-weight: 200;
}
.party {
  font-weight: 500;
}
.detail {
  margin-top: 4px;
  display: block;
  font-size: 0.8em;
}
</style>

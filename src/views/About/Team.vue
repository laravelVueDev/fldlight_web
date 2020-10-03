<template lang="html">
  <section class="team">
    <div class="container container-fluid">
      <h1>The Floodlight team</h1>
      <p class="statement">
        We saw investors struggling for access to transparent, un-biased data to
        make informed values-aligned investing decisions. That's why we started
        Floodlight.
      </p>
      <div class="line"></div>
      <div class="row">
        <div class="col-lg-4 person">
          <div class="person-details">
            <div class="head"></div>
            <div class="name-and-role">
              <h3>Erin Angerer</h3>
              <div class="role">Co Founder &amp; COO</div>
              <a
                class="linkedin"
                title="View Erin Angerer's LinkedIn profile"
                href="https://www.linkedin.com/in/erinangerer/"
                target="_blank"
              ></a>
            </div>
          </div>
          <p>
            Erin Co-founded Floodlight to provide the financial services
            industry access to new technologies that enable values-aligned
            investing. Her dedication to unlocking access to transparent and
            actionable data is made clear through her mission to make
            values-based investing essential in determining the intrinsic value
            of an investment through fundamental analysis. In her role as
            Co-founder and COO, Erin brings her passion for impact investing and
            experience in the innovation economy to solve problems in financial
            services.
          </p>
        </div>

        <div class="col-lg-4 person">
          <div class="person-details">
            <div class="head"></div>
            <div class="name-and-role">
              <h3><strong>Nate</strong> Wyne</h3>
              <div class="role">Co Founder &amp; CEO</div>
              <a
                class="linkedin"
                title="View Nate Wyne's LinkedIn profile"
                href="https://www.linkedin.com/in/nate-wyne-1434a31/"
                target="_blank"
              ></a>
            </div>
          </div>
          <p>
            Nate’s nearly 20 years in banking provided a lot of motivation to
            make fair data more available to people who should have it.
            Harnessing a natural tendency to challenge lame traditions, Nate
            advised hundreds of tech companies as they grew at home and
            overseas. Building on his capital markets experience, Floodlight
            came together as a way to enable everyone to use their money to
            reward the company’s they believe in and use. Nate thrives in
            leading teams, innovating along with current trends, and leveling
            all playing fields.
          </p>
        </div>

        <div class="col-lg-4 person">
          <div class="person-details">
            <div class="head"></div>
            <div class="name-and-role">
              <h3><strong>Ben</strong> Taber</h3>
              <div class="role">Technical Advisor</div>
              <a
                class="linkedin"
                title="View Ben Taber's LinkedIn profile"
                href="https://www.linkedin.com/in/bentaber/"
                target="_blank"
              ></a>
            </div>
          </div>
          <p>
            Pushing bits around since elementary school, Ben is fueled by
            solving problems with technology. The last 15+ years have been spent
            in the fintech space, leveraging data and technology to empower
            investors to make informed decisions. That experience has
            highlighted an all too common misalignment between financial
            services firms and their customers' goals. Ben hopes to provide
            clarity and accountability to firms' commercial structures and
            incentives through Floodlight's datasets and visualization
            platforms.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'Team',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.team {
  padding: 70px 0 100px;
  background-color: $gray9;
}

.line {
  height: $decorative-line-size;
  background-color: $decorative-line-color;
  width: 100%;
  margin-left: -50%;
  margin-bottom: 2rem;
}

.statement {
  max-width: 60rem;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.person {
  @include breakpoint($desktop-down) {
    margin: 2rem auto;
  }

  .head {
    background-image: url("~@/assets/images/team.jpg");
    background-size: 300px 100px;
    background-repeat: repeat;
    background-position-x: -5px;
    height: 100px;
    width: 100px;
    border: 4px solid $gray0;
    border-radius: 100px;
    min-width: 100px;
  }
  &:nth-child(2) .head {
    background-position-x: 195px;
  }
  &:nth-child(3) .head {
    background-position-x: 395px;
  }
}

.person-details {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  .name-and-role {
    margin-left: 20px;
  }

  .role {
    font-weight: 200;
    line-height: 1.4em;
    margin-bottom: 5px;
  }
}

.linkedin {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMzYgMzFhNSA1IDAgMCAxLTUgNUg1YTUgNSAwIDAgMS01LTVWNWE1IDUgMCAwIDEgNS01aDI2YTUgNSAwIDAgMSA1IDV2MjZ6IiBmaWxsPSIjNDM0QzVFIi8+PHBhdGggZD0iTTYgMTNoNXYxN0g2VjEzem0yLjQ4NC0yaC0uMDI3QzYuOTY1IDExIDYgOS44ODcgNiA4LjUgNiA3LjA3OCA2Ljk5NiA2IDguNTE2IDZTMTAuOTczIDcuMDc4IDExIDguNWMwIDEuMzg3LS45NjUgMi41LTIuNTE2IDIuNXpNMzAgMzBoLTV2LTkuMDk4YzAtMi4xOTktMS4yMjctMy42OTktMy4xOTEtMy42OTktMS41IDAtMi4zMTMgMS4wMTItMi43MDcgMS45ODgtLjE0NS4zNTItLjEwMiAxLjMyLS4xMDIgMS44MDl2OWgtNVYxM2g1djIuNjE3QzE5LjcyMyAxNC41IDIwLjg1MiAxMyAyMy43MzggMTMgMjcuMzE2IDEzIDMwIDE1LjI1IDMwIDIwLjI3M1YzMHoiIGZpbGw9IiNGRkYiLz48L2c+PC9zdmc+");
  height: 25px;
  width: 25px;
  background-size: 100%;
  display: block;
}
</style>

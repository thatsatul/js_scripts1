class ApplicationInsights {
  constructor(val) {
    this.val = val;
  }

  trackPageView = (val) => {
    this.val = val;
  }

  getInsights = () => {
    console.log(this.val);
  }
}

class Wrapper {
  constructor(val) {
    if(!Wrapper.instance) {
      this.appInsights = new ApplicationInsights(val);
      Wrapper.instance = this;
      return Wrapper.instance;
    } else {
      return Wrapper.instance;
    }
  }

  trackPageView = (val) => {
    this.appInsights.trackPageView(val);
  }

  getInsights = () => {
    this.appInsights.getInsights();
  }
}

const appInsights1 = new Wrapper({ pageName: 1 });
appInsights1.getInsights(); // { pageName: 1 }
appInsights1.trackPageView({ pageName: 2 });
appInsights1.getInsights(); // { pageName: 2 }

const appInsights2 = new Wrapper({ pageName: 99 });
appInsights2.getInsights(); // { pageName: 2 }
appInsights2.trackPageView({ pageName: 100 });
appInsights2.getInsights(); // { pageName: 100 }
appInsights1.getInsights(); // { pageName: 100 }

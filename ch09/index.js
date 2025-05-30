Number.prototype.times = function (f, context) {
  let n = this.valueOf();
  for (let i = 0; i < n; i++) f.call(context, i);
};

let n = 3;
n.times(i => { console.log(`hello ${i}`); });


const { vpc } = new NetworkStack(
  app,
  `InspectionNetworkStack${suffix}`,
  { suffix, stage, },
  { env: { account: process.env.ACCOUNT, region: process.env.REGION, }, }
);
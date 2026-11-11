import { expect, test } from "bun:test";
import { estimateRepairs, type RepairItem } from "./customer-services";
import { pricedRepair, qualityFor } from "./repair-quality";
const screen: RepairItem = {id:"screen",name:"Screen replacement",pricePence:9999,durationMinutes:null,availability:"unconfirmed"};
test("quality without its own price stays quote-only, ignoring the base price", () => {
  expect(pricedRepair(screen,"OLED").pricePence).toBeNull();
});
test("changing quality uses that quality's approved price", () => {
  const priced = {...screen,qualityPrices:{LCD:5000,OLED:8500,Original:null}};
  expect(pricedRepair(priced,"LCD").pricePence).toBe(5000);
  expect(pricedRepair(priced,"OLED").pricePence).toBe(8500);
  expect(pricedRepair(priced,"Original").pricePence).toBeNull();
});
test("diagnosis is explicitly free; other unknown zero prices remain quote-only", () => {
  const free=pricedRepair({...screen,id:"diagnostic"},"");
  expect(estimateRepairs([free])).toEqual({knownPence:0,requiresQuote:false});
  expect(estimateRepairs([free,pricedRepair(screen,"Original")]).requiresQuote).toBe(true);
  expect(estimateRepairs([{pricePence:0}]).requiresQuote).toBe(true);
});
test("invalid quality URLs fall back to a valid choice", () => {
  expect(qualityFor("screen","Invalid")).toBe("LCD");
  expect(qualityFor("battery","OEM")).toBe("OEM");
  expect(qualityFor("port",null)).toBe("Copy");
});

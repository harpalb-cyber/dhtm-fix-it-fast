import { describe, expect, test } from "bun:test";
import { trainingCourse, trainingErrors, trainingMessage, type TrainingForm } from "./training-course";

const base: TrainingForm = { name: "Sam", email: "sam@example.com", phone: "07700 900123", experience: "", ownDevice: "", questions: "", };

describe("training course rules", () => {
  test("one-to-one training", () => expect(trainingCourse.maxCapacity).toBe(1));
  test("enquiry does not require an age or fixed day", () => { expect(Object.values(trainingErrors(base)).every(value => value === "")).toBe(true); expect(trainingMessage(base)).not.toMatch(/Sunday|age/i); });
  test("phone number is required for the callback", () => expect(trainingErrors({ ...base, phone: "" }).phone).not.toBe(""));
  test("no price or deposit is published until approved", () => {
    expect(trainingCourse.totalPricePence).toBeNull();
    expect(trainingCourse.depositPence).toBeNull();
    expect(trainingCourse.publishedSessions).toHaveLength(0);
  });
});

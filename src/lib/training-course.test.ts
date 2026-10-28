import { describe, expect, test } from "bun:test";
import { trainingCourse, trainingErrors, trainingMessage, type TrainingForm } from "./training-course";

const base: TrainingForm = { name: "Sam", email: "sam@example.com", phone: "07700 900123", experience: "", sunday: "", ownDevice: "", questions: "", adult: true };

describe("training course rules", () => {
  test("maximum two students", () => expect(trainingCourse.maxCapacity).toBe(2));
  test("minimum age 18 is required to submit", () => {
    expect(trainingCourse.minimumAge).toBe(18);
    expect(trainingErrors({ ...base, adult: false }).adult).not.toBe("");
  });
  test("phone number is required for the callback", () => expect(trainingErrors({ ...base, phone: "" }).phone).not.toBe(""));
  test("no price or deposit is published until approved", () => {
    expect(trainingCourse.totalPricePence).toBeNull();
    expect(trainingCourse.depositPence).toBeNull();
    expect(trainingCourse.publishedSessions).toHaveLength(0);
  });
  test("message defaults to any available Sunday", () => expect(trainingMessage(base)).toContain("Preferred Sunday: Any available Sunday"));
});

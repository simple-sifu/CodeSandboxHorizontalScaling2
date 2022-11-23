import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import StatsPresenter from "./StatsPresenter";
describe("stats", () => {
  it("should show last added book", async () => {
    let lastAddedModelView;
    await new BookAdderTestHarness().addBook();
    await new StatsPresenter().load((copyLastAddedViewModel) => {
      lastAddedModelView = copyLastAddedViewModel;
    });
    expect(lastAddedModelView).toBe("UFT");
  });
});
